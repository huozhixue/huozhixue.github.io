# 树模板：树状数组


## 1 区间和 

```python []
def add(i,x):             # 更新 t[i] 加上 x
	while i<ma:
		t[i] += x
		i += i&-i

def get(i):               # t[:i+1] 的和
	res = 0
	while i:
		res += t[i]
		i &= i-1
	return res

ma = len(nums)+1
t = defaultdict(int)
```
## 2 区间最大值（只变大）


```python []
def update(i,x):             # 更新 t[i] 为 x
	while i<ma:
		t[i] = max(t[i],x)
		i += i&-i

def get(i):               # t[:i+1] 的最大值
	res = 0
	while i:
		res = max(res,t[i])
		i &= i-1
	return res

ma = len(nums)+1
t = defaultdict(int)
```


