# 算法（六）：代数


## 代数

高精度运算
```python []
# 四舍五入
from decimal import Decimal, ROUND_HALF_UP
def myround(x):
    return Decimal(x).quantize(Decimal('.00'), rounding=ROUND_HALF_UP)
```

回文数
- {{< lc "0479" >}} 最大回文数乘积
- {{< lc "0564" >}} 寻找最近的回文数

进制
- {{< lc "0483" >}} 最小好进制
- {{< lc "0660" >}} 移除 9
- {{< lc "0793" >}} 阶乘函数后 K 个零

绝对值
- {{< lc "1130" >}} 翻转子数组得到最大的数组值
## 统计

分段计数法
- {{< lc "0248" >}} 中心对称数 III

试填法
- {{< lc "0440" >}} 字典序的第K小数字

贡献法
- {{< lc "0828" >}} 统计子串中的唯一字符

## 数论

因数
- {{< lc "1390" >}} 四因数
## 组合


- {{< lc "1830" >}} 使字符串有序的最少操作次数
- {{< lc "3405" >}} 统计恰好有 K 个相等相邻元素的数组数目

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


## 多项式与生成函数

- 快速变换：fft、ntt、fwt


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

- {{< lc "0810" >}} 黑板异或游戏

