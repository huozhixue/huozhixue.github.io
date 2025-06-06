# 数学模板：排列组合

## 下一个排列

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


