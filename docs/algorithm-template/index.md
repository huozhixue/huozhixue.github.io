# 力扣总结 算法模板


## 字符串匹配

### kmp

```python
def kmp(s):
	nxt, j = [-1], -1
	for i in range(len(s)):
		while j >= 0 and s[i] != s[j]:
			j = nxt[j]
		j += 1
		nxt.append(j)
	return nxt[1:]
```

### manacher

```python
def manacher(s):
	s = '#' + '#'.join(s) + '#'
	A, n = [], len(s)
	mid, r = 0, 0
	for i in range(n):
		a = min(A[2*mid-i], r-i) if r>i else 0
		while i-a and i+a<n-1 and s[i-a-1]==s[i+a+1]:
			a += 1
		A.append(a)
		if i+a>r:
			mid, r = i, i+a
	return A
```

### z 函数

```python
def zfunc(s):
	n = len(s)
	z, l, r = [0]*n, 0, 0
	for i in range(1,n):
		z[i] = max(min(z[i-l],r-i+1), 0)
		while i+z[i]<n and s[z[i]]==s[i+z[i]]:
			l, r = i, i+z[i]
			z[i] += 1
	return z
```


## 贪心

### 下一个排列

```python
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


## 树状数组

### 前缀和

```python
class Fwk:
    def __init__(self, N):
        self.tree = [0] * (N + 1)

    def update(self, i, x):
        while i < len(self.tree):
            self.tree[i] += x
            i += i & (-i)

    def get(self, i):
        res = 0
        while i > 0:
            res += self.tree[i]
            i &= i-1
        return res
```

### 前缀最大值

```python
class Fwk:
    def __init__(self, N):
        self.tree = [0] * (N + 1)

    def update(self, i, x):
        while i < len(self.tree):
            self.tree[i] = max(self.tree[i], x)
            i += i & (-i)

    def get(self, i):
        res = 0
        while i > 0:
            res = max(res, self.tree[i])
            i &= i-1
        return res
```

