# 0079：单词搜索（★★）


## 题目

给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

board 和 word 中只包含大写和小写英文字母。

<!--more--> 

示例:

	board =
	[
	  ['A','B','C','E'],
	  ['S','F','C','S'],
	  ['A','D','E','E']
	]

	给定 word = "ABCCED", 返回 true
	给定 word = "SEE", 返回 true
	给定 word = "ABCB", 返回 false


## 分析

### #1

先找第一个字符，找到后往四周找第二个字符，失败后返回继续找第一个字符，依此类推。
这就是回溯法，可以用 dfs。

```python
def exist(self, board: List[List[str]], word: str) -> bool:
	def dfs(cur, x, y):
		if cur == len(word):
			return True
		points = product(range(m), range(n)) if cur==0 else [(x,y+1), (x,y-1), (x+1,y), (x-1,y)]
		for x, y in points:
			if 0 <= x < m and 0 <= y < n and flag[x][y] and board[x][y]==word[cur]:
				flag[x][y] = False
				if dfs(cur+1, x, y):
					return True
				flag[x][y] = True
		return False

	m, n = len(board), len(board[0])
	flag = [[True]*n for _ in range(m)]
	return dfs(0, 0, 0)
```

172 ms

### #2

假如单词某个字符的数量比网格中还多，那显然不可能存在，可以先计数排除特殊情况。

## 解答

```python
def exist(self, board: List[List[str]], word: str) -> bool:
	def dfs(cur, x, y):
		if cur == len(word):
			return True
		points = product(range(m), range(n)) if cur==0 else [(x,y+1), (x,y-1), (x+1,y), (x-1,y)]
		for x, y in points:
			if 0 <= x < m and 0 <= y < n and flag[x][y] and board[x][y]==word[cur]:
				flag[x][y] = False
				if dfs(cur+1, x, y):
					return True
				flag[x][y] = True
		return False

	ct1, ct2 = Counter(char for row in board for char in row), Counter(word)
	if ct2-ct1:
		return False
	m, n = len(board), len(board[0])
	flag = [[True]*n for _ in range(m)]
	return dfs(0, 0, 0)
```

72 ms
