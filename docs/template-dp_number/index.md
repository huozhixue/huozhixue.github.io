# dp模板：数位 dp


## 数位 dp

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

