# 0782：变为棋盘（2429 分）


> <u>**[力扣第 782 题](https://leetcode.cn/problems/transform-to-chessboard/)**</u>

## 题目

<p>一个 <code>n x n</code> 的二维网络 <code>board</code> 仅由 <code>0</code> 和 <code>1</code> 组成 。每次移动，你能任意交换两列或是两行的位置。</p>

<p>返回 <em>将这个矩阵变为<strong>  “棋盘”  </strong>所需的最小移动次数 </em>。如果不存在可行的变换，输出 <code>-1</code>。</p>

<p><strong>“棋盘”</strong> 是指任意一格的上下左右四个方向的值均与本身不同的矩阵。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/29/chessboard1-grid.jpg" style="height: 145px; width: 500px;" /></p>

<pre>
<strong>输入:</strong> board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]
<strong>输出:</strong> 2
<strong>解释:</strong>一种可行的变换方式如下，从左到右：
第一次移动交换了第一列和第二列。
第二次移动交换了第二行和第三行。
</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/29/chessboard2-grid.jpg" /></p>

<pre>
<strong>输入:</strong> board = [[0, 1], [1, 0]]
<strong>输出:</strong> 0
<strong>解释: </strong>注意左上角的格值为0时也是合法的棋盘，也是合法的棋盘.
</pre>

<p><strong>示例 3:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/29/chessboard3-grid.jpg" /></p>

<pre>
<strong>输入:</strong> board = [[1, 0], [1, 0]]
<strong>输出:</strong> -1
<strong>解释: </strong>任意的变换都不能使这个输入变为合法的棋盘。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == board.length</code></li>
<li><code>n == board[i].length</code></li>
<li><code>2 &lt;= n &lt;= 30</code></li>
<li><code>board[i][j]</code> 将只包含 <code>0</code>或 <code>1</code></li>
</ul>


**相似问题：**
- [3189：得到一个和平棋盘的最少步骤](/leetcode/3189)


## 分析

- 首先看第一行，0 和 1 的个数之差不能超过 1
- 然后看第二行，和第一行相比，要么完全相等，要么完全相反
- 后面的行同理，列也同理
- 然后计算行交换的次数
	- 最后只可能得到两种结果：1 开始的交替序列，或 0 开始的交替序列
	- 对每个序列，计算不同的位置个数 diff，如果 diff 是偶数，交换次数即是 diff//2
- 列交换次数同理，最后相加即可

## 解答


```python
class Solution:
    def movesToChessboard(self, board: List[List[int]]) -> int:
        A = board[0]
        if abs(2*A.count(1)-len(A))>1:
            return -1
        A2 = [a^1 for a in A]
        if any(row not in [A,A2] for row in board):
            return -1
        B = [row[0] for row in board]
        if abs(2*B.count(1)-len(board))>1:
            return -1
        def cal(row,st):
            diff = sum(i&1^st^x for i,x in enumerate(row))
            return diff//2 if diff%2==0 else inf
        return min(cal(A,0),cal(A,1))+min(cal(B,0),cal(B,1))
```
3 ms
