# 0079：单词搜索（★★）


## 题目

给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。
如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
同一个单元格内的字母不允许被重复使用。

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/04/word2.jpg)

    输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
    输出：true
示例 2：

![img](https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg)

    输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
    输出：true
示例 3：

![img](https://assets.leetcode.com/uploads/2020/10/15/word3.jpg)
    
    输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
    输出：false
	
提示：
- m == board.length
- n = board[i].length
- 1 <= m, n <= 6
- 1 <= word.length <= 15
- board 和 word 仅由大小写英文字母组成
 
## 分析

典型的回溯法，依次找单词的每个字符即可。

## 解答

```python
def exist(self, board: List[List[str]], word: str) -> bool:
    def dfs(k, i, j):
        if k==len(word):
            return True
        A = product(range(m),range(n)) if k==0 else [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]
        for x, y in A:
            if 0 <=x<m and 0<=y<n and board[x][y]==word[k]:
                c = board[x][y]
                board[x][y] = '0'
                if dfs(k+1, x, y):
                    return True
                board[x][y] = c
        return False

    m, n = len(board), len(board[0])
    return dfs(0, -1, -1)
```
3764 ms

## *附加

针对本题有个优化：
- 当 word 某个字符数大于 board，显然不可能，可以直接返回 False
- 这种优化只适用于特定的测试用例，属于 trick，一般不需要

```python
def exist(self, board: List[List[str]], word: str) -> bool:
    def dfs(k, i, j):
        if k==len(word):
            return True
        A = product(range(m),range(n)) if k==0 else [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]
        for x, y in A:
            if 0 <=x<m and 0<=y<n and board[x][y]==word[k]:
                c = board[x][y]
                board[x][y] = '0'
                if dfs(k+1, x, y):
                    return True
                board[x][y] = c
        return False
    
    if Counter(word)-Counter(c for row in board for c in row):
        return False
    m, n = len(board), len(board[0])
    return dfs(0, -1, -1)
```
872 ms
