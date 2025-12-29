# 算法（四）：动态规划

## 经典类型

匹配
- {{< lc "0010" >}} 正则表达式匹配
- {{< lc "0044" >}} 通配符匹配
括号：
- {{< lc "0032" >}} 最长有效括号
接雨水
- {{< lc "0042" >}} 接雨水
- {{< lc "0042" >}} 接雨水 II
排列
- {{< lc "0060" >}} 排列序列
- {{< lc "0903" >}} DI 序列的有效排列
股票
- {{< lc "0123" >}} 买卖股票的最佳时机 III
- {{< lc "0188" >}} 买卖股票的最佳时机 IV
颜色
- {{< lc "0265" >}} 粉刷房子 II
## 子序列
- {{< lc "0115" >}} 不同的子序列
- {{< lc "0354" >}} 俄罗斯套娃信封问题
## 区间
- {{< lc "0087" >}} 扰乱字符串
- {{< lc "0312" >}} 戳气球
##  数位 dp

```python
def get(s):
    @cache
    def dfs(i,st,bd):
        if i==len(s):
            return st
        res = 0
        up = int(s[i]) if bd else 9
        for x in range(up+1):
            res += dfs(i+1,st+(x==1),bd and x==up)
        return res
    return dfs(0,0,1)
```

- {{< lc "0233" >}} 数字 1 的个数
- {{< lc "0600" >}} 不含连续1的非负整数
- {{< lc "0788" >}} 旋转数字
- {{< lc "1397" >}} 找到所有好字符串（2666分）
分段计数法
- {{< lc "0248" >}} 0248：中心对称数 III

## 概率 dp

- {{< lc "1227" >}} 飞机座位分配概率]

## 插头 dp

- [插头 dp](https://leetcode.cn/problems/unique-paths-iii/solutions/3084233/cha-tou-dp-by-kamio_misuzu-48t0/)


## dp 优化

- 对称性
- 矩阵快速幂
- wqs 二分
- 斜率优化
- 四边形不等式优化


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


wqs 二分
- {{< lc "0188" >}} 买卖股票的最佳时机 IV
