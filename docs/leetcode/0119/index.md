# 0119：杨辉三角 II


## 题目

给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

![img](https://pic.leetcode-cn.com/1626927345-DZmfxB-PascalTriangleAnimated2.gif)

 

示例 1:

	输入: rowIndex = 3
	输出: [1,3,3,1]

示例 2:

	输入: rowIndex = 0
	输出: [1]

示例 3:

	输入: rowIndex = 1
	输出: [1,1]
	 

提示:
- 0 <= rowIndex <= 33

进阶：你可以优化你的算法到 O(rowIndex) 空间复杂度吗？


## 分析

迭代时覆盖上一层即可节省空间。

## 解答

```python
def getRow(self, rowIndex: int) -> List[int]:
    res = [1]
    for _ in range(rowIndex):
        res = [1] + [a+b for a,b in pairwise(res)] + [1]
    return res
```
32 ms

## *附加

也可以利用数学知识，杨辉三角的第 k 行其实就是：

$$[ C_k^0, C_k^1, ..., C_k^k ]$$

```python
def getRow(self, rowIndex: int) -> List[int]:
	return [comb(rowIndex, i) for i in range(rowIndex+1)]
```
40 ms
