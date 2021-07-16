# 0037：解数独（★★）


## 题目

编写一个程序，通过填充空格来解决数独问题。

一个数独的解法需遵循如下规则：

- 数字 1-9 在每一行只能出现一次。
- 数字 1-9 在每一列只能出现一次。
- 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

空白格用 '.' 表示。


<!--more--> 

示例 1:

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

一个数独。

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png)

答案被标成红色。

	
## 分析

很自然的想法就是依次放数字，如果无解了就倒退回上一步，这个过程就是回溯法，用 dfs 解决。

可以直接遍历空格位置，节省时间。


## 解答

```python
def solveSudoku(self, board: List[List[str]]) -> None:
	def dfs(cnt):
		if cnt == len(spaces):
			self.flag = True
			return
		
		i, j = spaces[cnt]
		k = i//3*3+j//3
		for val in '123456789':
			if not (row[i].get(val) or col[j].get(val) or box[k].get(val)):
				board[i][j] = val
				row[i][val] = col[j][val] = box[k][val] = True
				dfs(cnt+1)
				if self.flag:
					return
				row[i][val] = col[j][val] = box[k][val] = False
		
	spaces, row, col, box = [], [{} for _ in range(9)], [{} for _ in range(9)], [{} for _ in range(9)]
	for i in range(9):
		for j in range(9):
			val = board[i][j]
			if val == '.':
				spaces.append((i, j))
			else:
				row[i][val] = col[j][val] = box[i//3*3+j//3][val] = True
	self.flag = False
	dfs(0)
```

104 ms
