# 0212：单词搜索 II（★★★）


## 题目

给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words，
找出所有同时在二维网格和字典中出现的单词。

单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，
其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
同一个单元格内的字母在一个单词中不允许被重复使用。

提示：

- m == board.length
- n == board[i].length
- 1 <= m, n <= 12
- board[i][j] 是一个小写英文字母
- 1 <= words.length <= 3 * 10^4
- 1 <= words[i].length <= 10
- words[i] 由小写英文字母组成
- words 中的所有字符串互不相同


示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/07/search1.jpg)

	输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
	输出：["eat","oath"]

示例 2：

![img](https://assets.leetcode.com/uploads/2020/11/07/search2.jpg)

	输入：board = [["a","b"],["c","d"]], words = ["abcb"]
	输出：[]



## 分析

### #1

与 0079 的区别在于同时搜索多个单词。最简单的就是遍历调用 0079 的代码。

```python
class Solution:

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

    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        return [word for word in words if self.exist(board, word)]
```

512 ms

### #2

也可以考虑同时搜索，采用字典树。先用 words 初始字典树 trie 并设置结尾标志，然后在 board 上 dfs，只要字符在 trie 中就可以继续搜索。
遇到结尾标志时，就说明搜到了一个单词，然后应该把结尾标志弹出，避免之后的重复搜索结果。

另外，有个很重要的优化，即字典树中搜索过的路径就无需再搜索了，因此每次回溯时去掉叶节点，可以极大地节省时间。
 
## 解答

```python
def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
	def dfs(cur, x, y):
		if '#' in cur:
			res.append(cur.pop('#'))
		points = product(range(m), range(n)) if cur==trie else [(x,y+1), (x,y-1), (x+1,y), (x-1,y)]
		for x, y in points:
			if 0 <= x < m and 0 <= y < n and flag[x][y] and board[x][y] in cur:
				flag[x][y] = False
				dfs(cur[board[x][y]], x, y)
				flag[x][y] = True
				if not cur[board[x][y]]:
					cur.pop(board[x][y])

	m, n = len(board), len(board[0])
	flag = [[True]*n for _ in range(m)]
	T = lambda: defaultdict(T)
	res, trie = [], T()
	for word in words:
		reduce(dict.__getitem__, word, trie)['#'] = word
	dfs(trie, 0, 0)
	return res
```

296 ms



