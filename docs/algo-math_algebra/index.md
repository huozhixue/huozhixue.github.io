# 算法（六）：代数


## 代数

高精度运算
```python []
# 四舍五入
from decimal import Decimal, ROUND_HALF_UP
def myround(x):
    return Decimal(x).quantize(Decimal('.00'), rounding=ROUND_HALF_UP)
```

- {{< lc "1130" >}} [翻转子数组得到最大的数组值](https://leetcode.cn/problems/reverse-subarray-to-maximize-array-value/) （2482分）

## 组合

```python
# 下一个排列
def nxt(A):
	n = len(A)
	i = n-2
	while i >= 0 and A[i] >= A[i+1]:
		i -= 1
	if i < 0:
		return []
	j = n-1
	while A[j] <= A[i]:
		j -= 1
	A[i], A[j] = A[j], A[i]
	A[i+1:] = A[i+1:][::-1]
	return A
```

- {{< lc "1830" >}} [使字符串有序的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-string-sorted/) （2620分）

## 数论

```python
# 质因数分解
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

```python
# 乘法逆元
ma = 
mod = 10**9+7
fac, inv = [1]*ma, [1]*ma
for i in range(1,ma):
    fac[i] = fac[i-1]*i%mod
    inv[i] = pow(fac[i],-1,mod)
```

## 随机化

```python
# 爬山法
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

## 线性代数

- 线性基

```python []
# 线性基
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

## 多项式与生成函数

- 快速变换：fft、ntt、fwt


```python
# fft
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

```python []
# ntt
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

```python []
# fwt 或
def fwt(A,N,sgn=1):     # 逆变换 sgn=-1
    L = N.bit_length()-1
    for i in range(L):
        a = 1<<i
        for j in range(0,N,a*2):
            for k in range(j,j+a):
                A[k+a] += A[k]*sgn
```

```python []
# fwt 与
def fwt(A,N,sgn=1):     # 逆变换 sgn=-1
    L = N.bit_length()-1
    for i in range(L):
        a = 1<<i
        for j in range(0,N,a*2):
            for k in range(j,j+a):
                A[k] += A[k+a]*sgn
```

```python []
# fwt 异或
def fwt(A,N,sgn=1):     # 逆变换 sgn=2
    L = N.bit_length()-1
    for i in range(L):
        a = 1<<i
        for j in range(0,N,a*2):
            for k in range(j,j+a):
	            x,y = A[k],A[k+a]
	            A[k],A[k+a] = (x+y)>>sgn,(x-y)>>sgn
```

## 博弈

```python
# 博弈 拓扑反推
Q = deque(res)                  # res[u]：终态 u 的胜负结果
while Q:
	u = Q.popleft()
	if u==start:                # start：初始态
		return res[u]
	for v in g[u]:
		if v in res:
			continue
		if v[-1]==res[u]:
			res[v] = res[u]
			Q.append(v)
		else:
			deg[v]-=1
			if deg[v]==0:
				res[v] = res[u]
				Q.append(v)
```
