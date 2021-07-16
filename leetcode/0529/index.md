# 0529：扫雷游戏（★★）


## 题目

让我们一起来玩扫雷游戏！

给定一个代表游戏板的二维字符矩阵。 'M' 代表一个未挖出的地雷，'E' 代表一个未挖出的空方块，'B' 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的已挖出的空白方块，数字（'1' 到 '8'）表示有多少地雷与这块已挖出的方块相邻，'X' 则表示一个已挖出的地雷。

现在给出在所有未挖出的方块中（'M'或者'E'）的下一个点击位置（行和列索引），根据以下规则，返回相应位置被点击后对应的面板：

- 如果一个地雷（'M'）被挖出，游戏就结束了- 把它改为 'X'。
- 如果一个没有相邻地雷的空方块（'E'）被挖出，修改它为（'B'），并且所有和其相邻的未挖出方块都应该被递归地揭露。
- 如果一个至少与一个地雷相邻的空方块（'E'）被挖出，修改它为数字（'1'到'8'），表示相邻地雷的数量。
- 如果在此次点击中，若无更多方块可被揭露，则返回面板。
 
点击的位置只能是未被挖出的方块 ('M' 或者 'E')，这也意味着面板至少包含一个可点击的方块。

 <!--more--> 
 
示例 1：

	输入: 

	[['E', 'E', 'E', 'E', 'E'],
	 ['E', 'E', 'M', 'E', 'E'],
	 ['E', 'E', 'E', 'E', 'E'],
	 ['E', 'E', 'E', 'E', 'E']]

	Click : [3,0]

	输出: 

	[['B', '1', 'E', '1', 'B'],
	 ['B', '1', 'M', '1', 'B'],
	 ['B', '1', '1', '1', 'B'],
	 ['B', 'B', 'B', 'B', 'B']]

	解释:
	
![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/minesweeper_example_1.png)

示例 2：

	输入: 

	[['B', '1', 'E', '1', 'B'],
	 ['B', '1', 'M', '1', 'B'],
	 ['B', '1', '1', '1', 'B'],
	 ['B', 'B', 'B', 'B', 'B']]

	Click : [1,2]

	输出: 

	[['B', '1', 'E', '1', 'B'],
	 ['B', '1', 'X', '1', 'B'],
	 ['B', '1', '1', '1', 'B'],
	 ['B', 'B', 'B', 'B', 'B']]

	解释:

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/minesweeper_example_2.png)
	
## 分析

### #1

如果点到地雷了，直接改为 'X' 返回。否则，每一步应该计算相邻地雷的个数，为零就改为 'B' 递归遍历所有相邻的空方块，
不为零就改为数字。

可以用 dfs 解决。注意递归时判断相邻方块是否是空方块，避免重复计算。

```python
def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:
	def dfs(i, j):
		cnt = sum(0<=x<m and 0<=y<n and board[x][y]=='M' for x, y in product([i-1, i, i+1], [j-1, j, j+1]))
		if cnt:
			board[i][j] = str(cnt)
		else:
			board[i][j] = 'B'
			for x, y in product([i-1, i, i+1], [j-1, j, j+1]):
				if 0<=x<m and 0<=y<n and board[x][y] == 'E':
					dfs(x, y)

	m, n, (i, j) = len(board), len(board[0]), click
	if board[i][j] == 'M':
		board[i][j] = 'X'
	else:
		dfs(i, j)
	return board
```

196 ms

### #2

也可以用 bfs。注意每次将空方块加入队列时就应该标记一下，避免重复添加。

## 解答

```python
def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:
	m, n, (i, j) = len(board), len(board[0]), click
	if board[i][j] == 'M':
		board[i][j] = 'X'
	else:
		queue = deque([(i, j)])
		while queue:
			i, j = queue.popleft()
			cnt = sum(0<=x<m and 0<=y<n and board[x][y]=='M' for x, y in product([i-1, i, i+1], [j-1, j, j+1]))
			if cnt:
				board[i][j] = str(cnt)
			else:
				board[i][j] = 'B'
				for x, y in product([i-1, i, i+1], [j-1, j, j+1]):
					if 0<=x<m and 0<=y<n and board[x][y] == 'E':
						queue.append((x,y))
						board[x][y] = '0'
	return board
```

184 ms
