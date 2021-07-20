# 0130：被围绕的区域（★）


## 题目

给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，
并将这些区域里所有的 'O' 用 'X' 填充。

提示：

- m == board.length
- n == board[i].length
- 1 <= m, n <= 200
- board[i][j] 为 'X' 或 'O'


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

最后还剩下的 'O' 只有边界上的 'O' 或与边界上的 'O' 相连的 'O'。

因此可以从边界上的 'O' 出发，dfs 或 bfs 找到所有相连的 'O' 并标记为 'M'。
最后再遍历一次，将标记过的 'M' 恢复为 'O'，其它都为 'X'。

## 解答

```python
def solve(self, board: List[List[str]]) -> None:
    def dfs(i, j):
        board[i][j] = 'M'
        for x, y in [(i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)]:
            if 0 <= x < m and 0 <= y < n and board[x][y] == 'O':
                dfs(x, y)

    m, n = len(board), len(board[0])
    for i, j in product(range(m), range(n)):
        if (i in [0, m - 1] or j in [0, n - 1]) and board[i][j] == 'O':
            dfs(i, j)
    for i, j in product(range(m), range(n)):
        board[i][j] = 'O' if board[i][j] == 'M' else 'X'
```

48 ms

## *附加

也可以用并查集，将边界上的 'O' 都与一个哑节点 dummy 连通，再将所有相邻的 'O' 连通。
最终所有与 dummy 连通的即是剩下的 'O'。

```python
def solve(self, board: List[List[str]]) -> None:
    def find(x):
        if f.setdefault(x, x) != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    m, n = len(board), len(board[0])
    f, dummy = {}, (-1, -1)
    for i, j in product(range(m), range(n)):
        if board[i][j] == 'O':
            if i in [0, m - 1] or j in [0, n - 1]:
                union(dummy, (i, j))
            if i and board[i - 1][j] == 'O':
                union((i - 1, j), (i, j))
            if j and board[i][j - 1] == 'O':
                union((i, j - 1), (i, j))
    for i, j in product(range(m), range(n)):
        board[i][j] = 'O' if find((i, j)) == find(dummy) else 'X'
```

168 ms



