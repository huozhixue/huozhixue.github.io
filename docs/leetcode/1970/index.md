# 1970：你能穿过矩阵的最后一天（2123 分）


> <u>**[力扣第 254 场周赛第 4 题](https://leetcode.cn/problems/last-day-where-you-can-still-cross/)**</u>

## 题目

<p>给你一个下标从 <strong>1</strong> 开始的二进制矩阵，其中 <code>0</code> 表示陆地，<code>1</code> 表示水域。同时给你 <code>row</code> 和 <code>col</code> 分别表示矩阵中行和列的数目。</p>

<p>一开始在第 <code>0</code> 天，<strong>整个</strong> 矩阵都是 <strong>陆地</strong> 。但每一天都会有一块新陆地被 <strong>水</strong> 淹没变成水域。给你一个下标从 <strong>1</strong> 开始的二维数组 <code>cells</code> ，其中 <code>cells[i] = [r<sub>i</sub>, c<sub>i</sub>]</code> 表示在第 <code>i</code> 天，第 <code>r<sub>i</sub></code> 行 <code>c<sub>i</sub></code> 列（下标都是从 <strong>1</strong> 开始）的陆地会变成 <strong>水域</strong> （也就是 <code>0</code> 变成 <code>1</code> ）。</p>

<p>你想知道从矩阵最 <strong>上面</strong> 一行走到最 <strong>下面</strong> 一行，且只经过陆地格子的 <strong>最后一天</strong> 是哪一天。你可以从最上面一行的 <strong>任意</strong> 格子出发，到达最下面一行的 <strong>任意</strong> 格子。你只能沿着 <strong>四个</strong> 基本方向移动（也就是上下左右）。</p>

<p>请返回只经过陆地格子能从最 <strong>上面</strong> 一行走到最 <strong>下面</strong> 一行的 <strong>最后一天</strong> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/27/1.png" style="width: 624px; height: 162px;">
<pre><b>输入：</b>row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
<b>输出：</b>2
<b>解释：</b>上图描述了矩阵从第 0 天开始是如何变化的。
可以从最上面一行到最下面一行的最后一天是第 2 天。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/27/2.png" style="width: 504px; height: 178px;">
<pre><b>输入：</b>row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
<b>输出：</b>1
<b>解释：</b>上图描述了矩阵从第 0 天开始是如何变化的。
可以从最上面一行到最下面一行的最后一天是第 1 天。
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/27/3.png" style="width: 666px; height: 167px;">
<pre><b>输入：</b>row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
<b>输出：</b>3
<b>解释：</b>上图描述了矩阵从第 0 天开始是如何变化的。
可以从最上面一行到最下面一行的最后一天是第 3 天。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= row, col &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>4 &lt;= row * col &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>cells.length == row * col</code></li>
<li><code>1 &lt;= r<sub>i</sub> &lt;= row</code></li>
<li><code>1 &lt;= c<sub>i</sub> &lt;= col</code></li>
<li><code>cells</code> 中的所有格子坐标都是 <strong>唯一</strong> 的。</li>
</ul>


**相似问题：**
- [0803：打砖块（2765 分）](/leetcode/0803)
- [2258：逃离火灾（2346 分）](/leetcode/2258)


## 分析

- 典型的并查集问题
- 设置两个哑节点 L/R 分别代表左/右侧水域
- 遍历格子，将相邻（八个方向）的水域连通，判断 L/R 是否连通即可

## 解答


```python []
class Solution:
    def latestDayToCross(self, row: int, col: int, cells: List[List[int]]) -> int:
        def find(x):
            if f[x]!=x:
                f[x]=find(f[x])
            return f[x]
        
        def union(x,y):
            f[find(x)] = find(y)

        f = list(range(row*col+2))
        L,R = row*col,row*col+1
        vis = [[0]*col for _ in range(row)]
        for i,(r,c) in enumerate(cells):
            r,c = r-1,c-1
            for dx in range(-1,2):
                for dy in range(-1,2):
                    x,y = r+dx,c+dy
                    if 0<=x<row and 0<=y<col and vis[x][y]:
                        union(r*col+c,x*col+y)
            if c==0:
                union(L,r*col+c)
            if c==col-1:
                union(R,r*col+c)
            if find(L)==find(R):
                return i
            vis[r][c] = 1
```
191 ms
