# dp模板：dp 优化


## wqs 二分
## 斜率优化
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
