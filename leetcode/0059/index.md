# 0059：螺旋矩阵 II（★★）


## 题目

给你一个正整数 n ，生成一个包含 1 到 $n^2$ 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
 
<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/13/spiraln.jpg)

	输入：n = 3
	输出：[[1,2,3],[8,9,4],[7,6,5]]
	
示例 2：

	输入：n = 1
	输出：[[1]]
	 

## 分析 

与 0054 类似，模拟遍历过程，将对应位置赋值即可。这里可以初始化 res 全为 0，然后 res[(i+di)%n][(j+dj)%n] != 0 即代表下一步会越界。

## 解答

```python
def generateMatrix(self, n: int) -> List[List[int]]:
	res = [[0]*n for _ in range(n)]
	i, j, di, dj = 0, 0, 0, 1
	for num in range(1, n*n+1):
		res[i][j] = num
		if res[(i+di)%n][(j+dj)%n] != 0:
			di, dj = dj, -di
		i, j = i+di, j+dj
	return res
```

40 ms

