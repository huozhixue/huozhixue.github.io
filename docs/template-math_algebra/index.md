# 数学模板：线性代数


##  矩阵快速幂

```python
mod = 10**9+7
def mul(A,B):
    return [[sum(a*b%mod for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]
def mpow(mat,n):
    res = mat
    for i in range(n.bit_length()-2,-1,-1):
        res = mul(res,res)
        if n>>i&1:
            res = mul(res,mat)
    return res
```

#### 可复用

```python
mod = 10**9+7
def mul(A,B):
    return [[sum(a*b%mod for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]

N,M = 0,0
f = [[0] for _ in range(N)]
for i in range(N):
    f[i][0] = 0
g = []
g0 = [[0]*N for _ in range(N)]
for i in range(N):
    for j in range(N):
        g0[i][j] = 0
for _ in range(M):
    g.append(g0)
    g0 = mul(g0,g0)

def mpow(f,n):
    while n:
        i = n.bit_length()-1
        f = mul(g[i],f)
        n ^= 1<<i
    return sum(a[0] for a in f)%mod
```


## 快速变换

### fft

```python
import math
I = complex(0,1)

def fft(A,N,sgn=1):
    L = N.bit_length()-1
    rev = [0]*N
    for i in range(N):
        j = rev[i] = (rev[i >> 1] >> 1) | (i&1)*(N>>1)
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
    if sgn==-1:
        for i,x in enumerate(A):
            A[i] = round(x.real/N)
```

### ntt

```python []
mod = 998244353
G = 3

def ntt(A,N,sgn=1):
    L = N.bit_length()-1
    rev = [0]*N
    for i in range(N):
        j = rev[i] = (rev[i >> 1] >> 1) | (i&1)*(N>>1)
        if i<j:
            A[i],A[j] = A[j],A[i]
    for i in range(L):
        a = 1<<i
        step = pow(G,(mod-1)//(a*2)*sgn+mod-1,mod)  
        for j in range(0,N,a*2):
            w = 1
            for k in range(j,j+a):
                x,y = A[k],A[k+a]*w%mod
                A[k],A[k+a] = (x+y)%mod,(x-y)%mod
                w = w*step%mod
    if sgn==-1:
        inv = pow(N,-1,mod)
        for i,x in enumerate(A):
            A[i] = x*inv%mod
```

### fwt

##### 或运算

```python []
def fwt(A,N,sgn=1):     # 逆变换 sgn=-1
    L = N.bit_length()-1
    for i in range(L):
        a = 1<<i
        for j in range(0,N,a*2):
            for k in range(j,j+a):
                A[k+a] += A[k]*sgn
```
##### 与运算

```python []
def fwt(A,N,sgn=1):     # 逆变换 sgn=-1
    L = N.bit_length()-1
    for i in range(L):
        a = 1<<i
        for j in range(0,N,a*2):
            for k in range(j,j+a):
                A[k] += A[k+a]*sgn
```

##### 异或运算

```python []
def fwt(A,N,sgn=1):     # 逆变换 sgn=2
    L = N.bit_length()-1
    for i in range(L):
        a = 1<<i
        for j in range(0,N,a*2):
            for k in range(j,j+a):
	            x,y = A[k],A[k+a]
	            A[k],A[k+a] = (x+y)>>sgn,(x-y)>>sgn
```
## 线性基

```python []
class XorBasis:
    def __init__(self, n):
        self.b = [0] * n

    def insert(self, x):
        b = self.b
        while x:
            i = x.bit_length() - 1  # x 的最高位
            if b[i] == 0:  # x 和之前的基是线性无关的
                b[i] = x  # 新增一个基，最高位为 i
                return
            x ^= b[i]  # 保证基的最高位是互不相同的

    def max_xor(self) -> int:
        b = self.b
        res = 0
        for i in range(len(b) - 1, -1, -1):
            if res ^ b[i] > res:
                res ^= b[i]
        return res
```
