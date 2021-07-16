# 0221：最大正方形（★★）


## 题目

在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/26/max1grid.jpg)

	输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
	输出：4
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/11/26/max2grid.jpg)

	输入：matrix = [["0","1"],["1","0"]]
	输出：1
	
示例 3：

	输入：matrix = [["0"]]
	输出：0


## 分析

### #1

本题是 0085 的子问题，所以可以直接调用代码，加个判断条件即可。

```python
def maximalSquare(self, matrix: List[List[str]]) -> int:
	def help(heights):
		res, stack = 0, []
		for i, h in enumerate(heights+[0]):
			while stack and heights[stack[-1]] >= h:
				j = stack.pop()
				left = stack[-1] if stack else -1
				side = min(heights[j], i-left-1)
				res = max(res, side*side)
			stack.append(i)
		return res

	if not matrix or not matrix[0]:
		return 0
	m, n = len(matrix), len(matrix[0])
	res, H = 0, [[0]*n for _ in range(m)]
	for x in range(n):
		for i in range(m):
			H[i][x] = H[i-1][x]+1 if matrix[i][x] == '1' else 0
	return max(help(H[i]) for i in range(m))
```

时间复杂度 $O(N^2)$，96 ms

### #2

与找最大矩形不同，可以发现找最大正方形是可以递推的。

令 dp[i][j] 代表以 (i,j) 为右下顶点的最大正方形的边长，状态转移方程为：

	if matrix[i][j]=='0':		dp[i][j] = 0
	elif i==0 or j==0:			dp[i][j] = 1
	else:						dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
	
证明分为两步。为了方便，设 dp[i-1][j-1]=a, dp[i-1][j]=b, dp[i][j-1]=c，d=min(a, b, c)。

先证明 dp[i][j] <= 1+d：

	可以用反证法
	
	若 dp[i][j] >= a+2，那么左上角 (i-a-1,j-a-1) 到右下角 (i,j) 都为 '1'，dp[i-1][j-1] >= a+1，矛盾。
	
	同理可知 dp[i][j] <= b+1, dp[i][j] <= c+1
	
	所以 dp[i][j] <= 1+d

再证明边长 1+d 是符合要求的：

	a>=d，故左上角 (i-d, j-d) 到右下角 (i-1, j-1) 都为 '1'

	b>=d，故左上角 (i-d, j-d+1) 到右下角 (i-1, j) 都为 '1'

	c>=d，故左上角 (i-d+1, j-d) 到右下角 (i, j-1) 都为 '1'

	所以左上角 (i-d,j-d) 到右下角 (i,j) 都为 '1'，得证。


## 解答

```python
def maximalSquare(self, matrix: List[List[str]]) -> int:
	if not matrix or not matrix[0]:
		return 0
	m, n = len(matrix), len(matrix[0])
	side, dp = 0, [[0]*n for _ in range(m)]
	for i in range(m):
		for j in range(n):
			if matrix[i][j] == '1':
				dp[i][j] = 1 if not i or not j else 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
				side = max(side, dp[i][j])
	return side*side
```

时间复杂度 $O(N^2)$，80 ms
