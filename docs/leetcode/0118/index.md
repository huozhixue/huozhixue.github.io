# 0118：杨辉三角


## 题目

给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

![img](https://pic.leetcode-cn.com/1626927345-DZmfxB-PascalTriangleAnimated2.gif)

示例 1:

	输入: numRows = 5
	输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

示例 2:

	输入: numRows = 1
	输出: [[1]]
	 

提示:
- 1 <= numRows <= 30



## 分析

每层迭代即可。

## 解答

```python
def generate(self, numRows: int) -> List[List[int]]:
    res = [[1]]
    for _ in range(numRows-1):
        res.append([1]+[a+b for a,b in pairwise(res[-1])]+[1])
    return res
```
32 ms

