# 0289：生命游戏（★★）


## 题目

根据 百度百科 ，生命游戏，简称为生命，是英国数学家约翰·何顿·康威在 1970 年发明的细胞自动机。

给定一个包含 m × n 个格子的面板，每一个格子都可以看成是一个细胞。每个细胞都具有一个初始状态：
1 即为活细胞（live），或 0 即为死细胞（dead）。每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：

- 如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
- 如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
- 如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
- 如果死细胞周围正好有三个活细胞，则该位置死细胞复活；

下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是同时发生的。
给你 m x n 网格面板 board 的当前状态，返回下一个状态。

你可以使用原地算法解决本题吗？请注意，面板上所有格子需要同时被更新：你不能先更新某些格子，然后使用它们的更新后的值再更新其他格子。

 

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/12/26/grid1.jpg)

	输入：board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
	输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]

示例 2：

![img](https://assets.leetcode.com/uploads/2020/12/26/grid2.jpg)

	输入：board = [[1,1],[1,0]]
	输出：[[1,1],[1,1]]




## 分析

### #1

先写出额外数组的方法。每个格子计算周围活细胞的个数，根据规则，下一个状态是存活只有两种情况：

- 周围加自身共有三个活细胞
- 周围加自身共有四个活细胞，且当前状态是存活

```python
def gameOfLife(self, board: List[List[int]]) -> None:
	"""
	Do not return anything, modify board in-place instead.
	"""
	m, n = len(board), len(board[0])
	flag = [[False]*n for _ in range(m)]
	for i in range(m):
		for j in range(n):
			cnt = sum(0<=x<m and 0<=y<n and board[x][y]%2 for x,y in product([i-1,i,i+1], [j-1,j,j+1]))
			flag[i][j] = cnt == 3 or (cnt == 4 and board[i][j])    
	for i in range(m):
		for j in range(n):
			board[i][j] = int(flag[i][j])
```

40 ms

### #2

要求原地算法，考虑用 board 自身来保存信息。

最简单的就是增加一位 bit 来表示下一轮状态，于是遍历中可能遇到的标志有：

	0					当前状态为死，下一轮状态未知
	1					当前状态为活，下一轮状态未知
	10					当前状态为死，下一轮状态为活
	11					当前状态为活，下一轮状态为活
	
遍历中 board[i][j] % 2 一直保存当前状态，遍历结束时 board[i][j] // 2 保存了下一轮状态。
因此再遍历一遍全部转为 board[i][j] // 2 即可。

## 解答

```python
def gameOfLife(self, board: List[List[int]]) -> None:
	"""
	Do not return anything, modify board in-place instead.
	"""
	m, n = len(board), len(board[0])
	for i in range(m):
		for j in range(n):
			cnt = sum(0<=x<m and 0<=y<n and board[x][y]%2 for x,y in product([i-1,i,i+1], [j-1,j,j+1]))
			board[i][j] += int(cnt == 3 or (cnt == 4 and board[i][j])) << 1    
	for i in range(m):
		for j in range(n):
			board[i][j] //= 2
```

36 ms

