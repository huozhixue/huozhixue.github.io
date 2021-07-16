# 0130：被围绕的区域（★）


## 题目

给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，
并将这些区域里所有的 'O' 用 'X' 填充。

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg)

	输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
	输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
	解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 
	任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。
	如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。

示例 2：

	输入：board = [["X"]]
	输出：[["X"]]



## 分析

### #1

最后还剩下的 'O' 只有边界上的 'O' 或与边界上的 'O' 相连的 'O'。
因此可以从边界上的 'O' 出发，dfs 找到所有相连的 'O' 并标记为 'M'。
最后再遍历一次，将未标记的 'O' 转为 'X'，将标记过的 'M' 恢复为 'O'。

```python
def solve(self, board: List[List[str]]) -> None:
	"""
	Do not return anything, modify board in-place instead.
	"""
	def dfs(i, j):
		board[i][j] = 'M'
		for x, y in [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]:
			if 0<=x<m and 0<=y<n and board[x][y] == 'O':
				dfs(x, y)

	m, n = len(board), len(board[0])
	for i, j in product(range(m), range(n)):
		if (i in [0,m-1] or j in [0,n-1]) and board[i][j] == 'O':
			dfs(i, j)
	for i in range(m):
		for j in range(n):
			board[i][j] = 'O' if board[i][j] == 'M' else 'X'
```

60 ms


### #2

也可以用 bfs。

## 解答

```python
def solve(self, board: List[List[str]]) -> None:
	"""
	Do not return anything, modify board in-place instead.
	"""
	m, n = len(board), len(board[0])
	queue = deque()
	for i, j in product(range(m), range(n)):
		if (i in [0,m-1] or j in [0,n-1]) and board[i][j] == 'O':
			queue.append((i, j))
			board[i][j] = 'M'
	while queue:
		i, j = queue.popleft()
		for x, y in [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]:
			if 0<=x<m and 0<=y<n and board[x][y] == 'O':
				queue.append((x, y))
				board[x][y] = 'M'
	for i in range(m):
		for j in range(n):
			board[i][j] = 'O' if board[i][j] == 'M' else 'X'
```

56 ms



