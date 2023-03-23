# 0361：轰炸敌人（★）


> <u>**[力扣第 361 题](https://leetcode.cn/problems/bomb-enemy/)**</u>

## 题目

<p>给你一个大小为 <code>m x n</code> 的矩阵 <code>grid</code> ，其中每个单元格都放置有一个字符：</p>

<ul>
<li><code>'W'</code> 表示一堵墙</li>
<li><code>'E'</code> 表示一个敌人</li>
<li><code>'0'</code>（数字 0）表示一个空位</li>
</ul>

<p>返回你使用 <strong>一颗炸弹</strong> 可以击杀的最大敌人数目。你只能把炸弹放在一个空位里。</p>

<p>由于炸弹的威力不足以穿透墙体，炸弹只能击杀同一行和同一列没被墙体挡住的敌人。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/bomb1-grid.jpg" style="width: 600px; height: 187px;" />
<pre>
<strong>输入：</strong>grid = [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/bomb2-grid.jpg" style="width: 500px; height: 194px;" />
<pre>
<strong>输入：</strong>grid = [["W","W","W"],["0","0","0"],["E","E","E"]]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 500</code></li>
<li><code>grid[i][j]</code> 可以是 <code>'W'</code>、<code>'E'</code> 或 <code>'0'</code></li>
</ul>


## 分析

可以一趟递推求出每个格子的左边有多少个不隔墙的敌人。

同理，可以递推求出右/上/下边有多少个不隔墙的敌人。

统计哪个空位的四个方向的总数最大即可。


## 解答

```python
def maxKilledEnemies(self, grid: List[List[str]]) -> int:
    _key = lambda x,y: 0 if y=='W' else x+(y=='E')
    cal = lambda row: list(accumulate(row, _key, initial=0))[1:]
    L = [cal(row) for row in grid]
    R = [cal(row[::-1])[::-1] for row in grid] 
    U = list(zip(*[cal(col) for col in zip(*grid)]))
    D = list(zip(*[cal(col[::-1])[::-1] for col in zip(*grid)]))
    m, n = len(grid), len(grid[0])
    return max(L[i][j]+R[i][j]+U[i][j]+D[i][j] if grid[i][j]=='0' else 0 for i in range(m) for j in range(n))
```
300 ms

