# dp模板：dp 优化


## wqs 二分
## 斜率优化

```python []
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
## 四边形不等式优化

```python
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
