# 数学模板：线性代数


##  矩阵快速幂

```python
mod = 10**9+7
def mul(A,B):
    return [[sum(a*b for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]
def mpow(mat, n):
    res = mat
    for i in range(n.bit_length()-2,-1,-1):
        res = mul(res,res)
        if n>>i&1:
            res = mul(res,mat)
    return res
    
f = [[],[]]
A = [[],[]]
f = mul(mpow(A,n),f)
```


## 快速变换

### fft

```python []
I = complex(0,1)

def fft(A,N,sgn):
    L = N.bit_length()-1
    rev = [0]*N
    for i in range(N):
        rev[i] = (rev[i >> 1] >> 1) | ((i&1)<<(L-1))
        j = rev[i]
        if i<j:
            A[i],A[j] = A[j],A[i]
    for i in range(L):
        a = 1<<i
        step = math.e**(math.pi/a*sgn*I)    
        for j in range(0,N,a*2):
            w = 1
            for k in range(j,j+a):
                x,y = A[k],A[k+a]*w
                A[k],A[k+a] = x+y,x-y
                w *= step

def convolve(A,B,N):
    fft(A,N,1)
    fft(B,N,1)
    C = [a*b for a,b in zip(A,B)]
    fft(C,N,-1)
    return [int(x.real/N+0.1) for x in C]
```
