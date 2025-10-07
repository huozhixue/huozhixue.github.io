# 算法（四）：动态规划

## 排列 dp

- {{< lc "0903" >}} [DI 序列的有效排列](https://leetcode.cn/problems/valid-permutations-for-di-sequence/)
##  数位 dp

```python
@cache
def dfs(i,st,bd):
	if i==len(s):
		return st
	res = 0
	cur = int(s[i])
	up = cur if bd else 9
	for x in range(up+1):
		res += dfs(i+1,st+(x==1),bd and x==cur)
	return res
s = str(n)
```

- {{< lc "0233" >}} 数字 1 的个数
- {{< lc "0600" >}} 不含连续1的非负整数
- {{< lc "0788" >}} 旋转数字
- {{< lc "1397" >}} [找到所有好字符串](https://leetcode.cn/contest/weekly-contest-182/problems/find-all-good-strings/) （2666分）

## 概率 dp

- {{< lc "1227" >}} [飞机座位分配概率](https://leetcode.cn/problems/airplane-seat-assignment-probability/)

## 插头 dp

- [插头 dp](https://leetcode.cn/problems/unique-paths-iii/solutions/3084233/cha-tou-dp-by-kamio_misuzu-48t0/)
##  dp 优化

- 对称性
- 矩阵快速幂
- wqs 二分
- 斜率优化
- 四边形不等式优化


```python
# 矩阵快速幂
mod = 10**9+7
def mul(A,B):
    res = [[0]*len(B[0]) for _ in range(len(A))]
    for i, row in enumerate(res):
        for k,a in enumerate(A[i]):
            for j,b in enumerate(B[k]):
                row[j] += a*b
                row[j] %= mod
    return res
def mpow(g,n,f):
    res = f
    while n:
        res = mul(g,res) if n&1 else res
        g = mul(g,g)
        n >>= 1
    return res
```

```python
# 矩阵快速幂 可复用
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

def mpow(g,n,f):
    while n:
        i = n.bit_length()-1
        f = mul(g[i],f)
        n ^= 1<<i
    return sum(a[0] for a in f)%mod
```

```python []
# 斜率优化
def dot(u,v):    # u·v，点乘（内积）
    return u[0]*v[0]+u[1]*v[1]

def cross(u,v):  # u X v，叉乘（外积），逆正顺负
    return u[0]*v[1]-u[1]*v[0]

def convex(A,sgn=1):           # 离线生成上凸包，sgn=-1 下凸包（注意保证 A[i][1]>=0）
    def check(a,b,c):
        u = [b[0]-a[0],b[1]-a[1]]
        v = [c[0]-b[0],c[1]-b[1]]
        return cross(u,v)>=0 if sgn==1 else cross(u,v)<=0 
    A.sort()
    sk = []
    for u in A:
        while len(sk)>1 and check(sk[-2],sk[-1],u):
            sk.pop()
        sk.append(u)
    return sk

sk = convex([])   # 上凸包：u[1]正求最大、u[1]负求最小，下凸包：u[1]负求最大，u[1]正求最小
u = (0,0)            
i = bisect_left(range(len(sk)-1),True,key=lambda i: dot(u,sk[i])>dot(u,sk[i+1]))
```

```python
# 四边形不等式优化
g = [0]+[inf]*n
Q = deque([[0,1,n]])
for j in range(1,n+1):
	while Q and Q[0][2]<j:
		Q.popleft()
	g[j] = w(Q[0][0],j)
	while Q and w(j,Q[-1][1])<w(Q[-1][0],Q[-1][1]):
		Q.pop()
	if not Q:
		Q.append([j,j+1,n])
	else:
		a = bisect_left(range(Q[-1][2]+1),True,j,key=lambda a:w(j,a)<w(Q[-1][0],a))
		Q[-1][2] = a-1
		if a<=n:
			Q.append([j,a,n])
return g
```
