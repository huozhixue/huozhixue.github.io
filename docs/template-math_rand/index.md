# 数学模板：随机化


##  爬山法
```python
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

