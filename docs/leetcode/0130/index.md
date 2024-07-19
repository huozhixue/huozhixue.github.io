# 0130：被围绕的区域（★）


> <u>**[力扣第 130 题](https://leetcode.cn/problems/surrounded-regions/)**</u>

## 题目

<p>给你一个 <code>m x n</code> 的矩阵 <code>board</code> ，由若干字符 <code>'X'</code> 和 <code>'O'</code> 组成，<strong>捕获</strong> 所有 <strong>被围绕的区域</strong>：</p>

<ul>
<li><strong>连接：</strong>一个单元格与水平或垂直方向上相邻的单元格连接。</li>
<li><strong>区域：连接所有 </strong><code>'O'</code> 的单元格来形成一个区域。</li>
<li><strong>围绕：</strong>如果您可以用 <code>'X'</code> 单元格 <strong>连接这个区域</strong>，并且区域中没有任何单元格位于 <code>board</code> 边缘，则该区域被 <code>'X'</code> 单元格围绕。</li>
</ul>

<p>通过将输入矩阵 <code>board</code> 中的所有 <code>'O'</code> 替换为 <code>'X'</code> 来 <strong>捕获被围绕的区域</strong>。</p>

<div class="original__bRMd">
<div>


<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]</span></p>

<p><b>输出：</b><span class="example-io">[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]</span></p>

<p><strong>解释：</strong></p>
<img alt="" src="https://pic.leetcode.cn/1718167191-XNjUTG-image.png" style="width: 367px; height: 158px;" />
<p>在上图中，底部的区域没有被捕获，因为它在 board 的边缘并且不能被围绕。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">board = [["X"]]</span></p>

<p><strong>输出：</strong><span class="example-io">[["X"]]</span></p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == board.length</code></li>
<li><code>n == board[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>board[i][j]</code> 为 <code>'X'</code> 或 <code>'O'</code></li>
</ul>
</div>
</div>


**相似问题：**
- [0200：岛屿数量](/leetcode/0200)
- [0286：墙与门](/leetcode/0286)


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



