# 0119：杨辉三角 II


## 题目

给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。

在杨辉三角中，每个数是它左上方和右上方的数的和。

进阶： 你可以优化你的算法到 O(k) 空间复杂度吗？

<!--more--> 

示例:

	输入: 3
	输出: [1,3,3,1]

## 分析

### #1

迭代时覆盖上一层即可节省空间。

```python
def getRow(self, rowIndex: int) -> List[int]:
	tmp = [1]
	for _ in range(rowIndex):
		tmp = [a+b for a, b in zip([0]+tmp, tmp+[0])]
	return tmp
```

32 ms

### #2

也可以利用数学知识，杨辉三角的第 k 行其实就是：

$$[ C_k^0, C_k^1, ..., C_k^k ]$$

## 解答

```python
def getRow(self, rowIndex: int) -> List[int]:
	return [comb(rowIndex, i) for i in range(rowIndex+1)]
```

40 ms

