# 0529：扫雷游戏（★）


> <u>**[力扣第 529 题](https://leetcode.cn/problems/minesweeper/)**</u>

## 题目

<p>让我们一起来玩扫雷游戏！</p>

<p>给你一个大小为 <code>m x n</code> 二维字符矩阵 <code>board</code> ，表示扫雷游戏的盘面，其中：</p>

<ul>
<li><code>'M'</code> 代表一个 <strong>未挖出的</strong> 地雷，</li>
<li><code>'E'</code> 代表一个<strong> 未挖出的 </strong>空方块，</li>
<li><code>'B'</code><strong> </strong>代表没有相邻（上，下，左，右，和所有4个对角线）地雷的<strong> 已挖出的 </strong>空白方块，</li>
<li><strong>数字</strong>（<code>'1'</code> 到 <code>'8'</code>）表示有多少地雷与这块<strong> 已挖出的</strong> 方块相邻，</li>
<li><code>'X'</code> 则表示一个<strong> 已挖出的</strong> 地雷。</li>
</ul>

<p>给你一个整数数组 <code>click</code> ，其中 <code>click = [click<sub>r</sub>, click<sub>c</sub>]</code> 表示在所有<strong> 未挖出的 </strong>方块（<code>'M'</code> 或者 <code>'E'</code>）中的下一个点击位置（<code>click<sub>r</sub></code> 是行下标，<code>click<sub>c</sub></code> 是列下标）。</p>

<p>根据以下规则，返回相应位置被点击后对应的盘面：</p>

<ol>
<li>如果一个地雷（<code>'M'</code>）被挖出，游戏就结束了- 把它改为 <code>'X'</code> 。</li>
<li>如果一个<strong> 没有相邻地雷 </strong>的空方块（<code>'E'</code>）被挖出，修改它为（<code>'B'</code>），并且所有和其相邻的<strong> 未挖出 </strong>方块都应该被递归地揭露。</li>
<li>如果一个<strong> 至少与一个地雷相邻</strong> 的空方块（<code>'E'</code>）被挖出，修改它为数字（<code>'1'</code> 到 <code>'8'</code> ），表示相邻地雷的数量。</li>
<li>如果在此次点击中，若无更多方块可被揭露，则返回盘面。</li>
</ol>



<p><strong>示例 1：</strong></p>
<img src="https://assets.leetcode.com/uploads/2023/08/09/untitled.jpeg" style="width: 500px; max-width: 400px; height: 269px;" />
<pre>
<strong>输入：</strong>board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]
<strong>输出：</strong>[["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
</pre>

<p><strong>示例 2：</strong></p>
<img src="https://assets.leetcode.com/uploads/2023/08/09/untitled-2.jpeg" style="width: 500px; max-width: 400px; height: 275px;" />
<pre>
<strong>输入：</strong>board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]
<strong>输出：</strong>[["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == board.length</code></li>
<li><code>n == board[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 50</code></li>
<li><code>board[i][j]</code> 为 <code>'M'</code>、<code>'E'</code>、<code>'B'</code> 或数字 <code>'1'</code> 到 <code>'8'</code> 中的一个</li>
<li><code>click.length == 2</code></li>
<li><code>0 &lt;= click<sub>r</sub> &lt; m</code></li>
<li><code>0 &lt;= click<sub>c</sub> &lt; n</code></li>
<li><code>board[click<sub>r</sub>][click<sub>c</sub>]</code> 为 <code>'M'</code> 或 <code>'E'</code></li>
</ul>


**相似问题：**
- [2101：引爆最多的炸弹（1880 分）](/leetcode/2101)


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
