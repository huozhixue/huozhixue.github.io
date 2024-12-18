# 数学模板



## 1 质因数分解

```python
ma = 

def get_primes(M):
    f = [1]*M
    for i in range(2,isqrt(M)+1):
        if f[i]:
            f[i*i:M:i] = [0] * ((M-1-i*i)//i+1)
    return [i for i in range(2,M) if f[i]]

primes = get_primes(isqrt(ma)+1)

@cache
def factor(x):
    ct = defaultdict(int)
    for p in primes:
        while x%p==0:
            x//=p
            ct[p] += 1
    if x>1:
        ct[x] += 1
    return ct
```

## 2 乘法逆元

```python
ma = 
mod = 10**9+7
fac, inv = [1]*(ma+1), [1]*(ma+1)
for i in range(1,ma+1):
    fac[i] = fac[i-1]*i%mod
    inv[i] = pow(fac[i],-1,mod)
```
## 3 矩阵幂

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

## 4 爬山法
```python
def climb(p,cal):
	eps, step = 1e-7, 1
	while step > eps:
		for i,w in product(range(len(p)),[step,-step]):
			p2 = [a+w*(j==i) for j,a in enumerate(p)]
			if cal(p2)<cal(p):
				p = p2
				break
		else:
			step *= 0.5
	return p
```

