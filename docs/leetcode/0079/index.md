# 0079：单词搜索（★）


> <u>**[力扣第 79 题](https://leetcode.cn/problems/word-search/)**</u>

## 题目

<p>给定一个 <code>m x n</code> 二维字符网格 <code>board</code> 和一个字符串单词 <code>word</code> 。如果 <code>word</code> 存在于网格中，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p>单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/word2.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
<strong>输出：</strong>true
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/15/word3.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == board.length</code></li>
<li><code>n = board[i].length</code></li>
<li><code>1 <= m, n <= 6</code></li>
<li><code>1 <= word.length <= 15</code></li>
<li><code>board</code> 和 <code>word</code> 仅由大小写英文字母组成</li>
</ul>



<p><strong>进阶：</strong>你可以使用搜索剪枝的技术来优化解决方案，使其在 <code>board</code> 更大的情况下可以更快解决问题？</p>


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
