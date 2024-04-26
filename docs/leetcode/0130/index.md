# 0130：被围绕的区域（★）


> <u>**[力扣第 130 题](https://leetcode.cn/problems/surrounded-regions/)**</u>

## 题目

给你一个 <code>m x n</code> 的矩阵 <code>board</code> ，由若干字符 <code>'X'</code> 和 <code>'O'</code> ，找到所有被 <code>'X'</code> 围绕的区域，并将这些区域里所有的 <code>'O'</code> 用 <code>'X'</code> 填充。
<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg" style="width: 550px; height: 237px;" />
<pre>
<strong>输入：</strong>board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
<strong>输出：</strong>[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
<strong>解释：</strong>被围绕的区间不会存在于边界上，换句话说，任何边界上的 <code>'O'</code> 都不会被填充为 <code>'X'</code>。 任何不在边界上，或不与边界上的 <code>'O'</code> 相连的 <code>'O'</code> 最终都会被填充为 <code>'X'</code>。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>board = [["X"]]
<strong>输出：</strong>[["X"]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == board.length</code></li>
<li><code>n == board[i].length</code></li>
<li><code>1 <= m, n <= 200</code></li>
<li><code>board[i][j]</code> 为 <code>'X'</code> 或 <code>'O'</code></li>
</ul>
</div>
</div>


## 分析

- 只有与边界连通的 'O' 才不会被填充
- 可以用 dfs 或 bfs 遍历找，更一般的是用并查集
	- 将边界上的 'O' 都与哑节点 m*n 连通
	- 再将相邻的 'O' 连通
	- 最后将不与哑节点连通的 'O' 换成 'X' 即可

## 解答

```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        def find(x):
            if f[x]!=x:
                f[x]=find(f[x])
            return f[x]
        
        def union(x,y):
            f[find(x)]=find(y)

        m,n = len(board),len(board[0])
        f = list(range(m*n+1))
        A = [(i,j) for i in range(m) for j in range(n) if board[i][j]=='O']
        for i,j in A:
            if i in [0,m-1] or j in [0,n-1]:
                union(i*n+j,m*n)
            if i and board[i-1][j]=='O':
                union(i*n+j,(i-1)*n+j)
            if j and board[i][j-1]=='O':
                union(i*n+j,i*n+j-1)
        for i,j in A:
            if find(i*n+j)!=find(m*n):
                board[i][j] = 'X'
```
73 ms



