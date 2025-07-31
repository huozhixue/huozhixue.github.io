# 数学模板：数论


## 1 质因数分解

```python
M = 
f = [0]*2+[1]*(M-2)
for i in range(2,isqrt(M)+1):
	if f[i]:
		f[i*i:M:i] = [0]*((M-1-i*i)//i+1)
primes = [i for i in range(M) if f[i]]

@cache
def factor(x):
    ct = defaultdict(int)
    for p in primes:
	    if p*p>x:
		    break
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
fac, inv = [1]*ma, [1]*ma
for i in range(1,ma):
    fac[i] = fac[i-1]*i%mod
    inv[i] = pow(fac[i],-1,mod)
```

