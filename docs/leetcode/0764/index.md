# 0764：最大加号标志（★）


> <u>**[力扣第 764 题](https://leetcode.cn/problems/largest-plus-sign/)**</u>

## 题目

<p>在一个 <code>n x n</code> 的矩阵 <code>grid</code> 中，除了在数组 <code>mines</code> 中给出的元素为 <code>0</code>，其他每个元素都为 <code>1</code>。<code>mines[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>表示 <code>grid[x<sub>i</sub>][y<sub>i</sub>] == 0</code></p>

<p>返回 <em> </em><code>grid</code><em> 中包含 <code>1</code> 的最大的 <strong>轴对齐</strong> 加号标志的阶数</em> 。如果未找到加号标志，则返回 <code>0</code> 。</p>

<p>一个 <code>k</code> 阶由 <em><code>1</code></em> 组成的 <strong>“轴对称”加号标志</strong> 具有中心网格 <code>grid[r][c] == 1</code> ，以及4个从中心向上、向下、向左、向右延伸，长度为 <code>k-1</code>，由 <code>1</code> 组成的臂。注意，只有加号标志的所有网格要求为 <code>1</code> ，别的网格可能为 <code>0</code> 也可能为 <code>1</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/13/plus1-grid.jpg" /></p>

<pre>
<strong>输入:</strong> n = 5, mines = [[4, 2]]
<strong>输出:</strong> 2
<strong>解释: </strong>在上面的网格中，最大加号标志的阶只能是2。一个标志已在图中标出。
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/13/plus2-grid.jpg" /></p>

<pre>
<strong>输入:</strong> n = 1, mines = [[0, 0]]
<strong>输出:</strong> 0
<strong>解释: </strong>没有加号标志，返回 0 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 500</code></li>
<li><code>1 &lt;= mines.length &lt;= 5000</code></li>
<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt; n</code></li>
<li>每一对 <code>(x<sub>i</sub>, y<sub>i</sub>)</code> 都 <strong>不重复</strong>​​​​​​​</li>
</ul>


## 分析

分别递推找到 (i,j) 往四个方向的臂长即可。


## 解答

```python
def orderOfLargestPlusSign(self, n: int, mines: List[List[int]]) -> int:
    mines = {(x, y) for x,y in mines}
    A = [[int((x,y) not in mines) for y in range(n)] for x in range(n)]
    cal = lambda row: list(accumulate(row, lambda x,y:(x+y)*y))
    L = [cal(row) for row in A]
    R = [cal(row[::-1])[::-1] for row in A]
    U = list(zip(*[cal(col) for col in zip(*A)]))
    D = list(zip(*[cal(col[::-1])[::-1] for col in zip(*A)]))
    return max(min(L[i][j],R[i][j],U[i][j],D[i][j]) for i in range(n) for j in range(n))
```
2608 ms


