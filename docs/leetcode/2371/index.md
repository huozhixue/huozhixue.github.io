# 2371：最小化网格中的最大值（★★）


> <u>**[力扣第 2371 题](https://leetcode.cn/problems/minimize-maximum-value-in-a-grid/)**</u>

## 题目

<p>给定一个包含 <strong>不同 </strong>正整数的 <code>m × n</code> 整数矩阵 <code>grid</code>。</p>

<p>必须将矩阵中的每一个整数替换为正整数，且满足以下条件:</p>

<ul>
<li>在替换之后，同行或同列中的每两个元素的 <strong>相对 </strong>顺序应该保持 <strong>不变</strong>。</li>
<li>替换后矩阵中的 <strong>最大</strong> 数目应尽可能 <strong>小</strong>。</li>
</ul>

<p>如果对于原始矩阵中的所有元素对，使 <code>grid[r<sub>1</sub>][c<sub>1</sub>] &gt; grid[r<sub>2</sub>][c<sub>2</sub>]</code>，其中要么 <code>r<sub>1</sub> == r<sub>2</sub></code> ，要么 <code>c<sub>1</sub> == c<sub>2</sub></code>，则相对顺序保持不变。那么在替换之后一定满足 <code>grid[r<sub>1</sub>][c<sub>1</sub>] &gt; grid[r<sub>2</sub>][c<sub>2</sub>]</code>。</p>

<p>例如，如果 <code>grid = [[2, 4, 5], [7, 3, 9]]</code>，那么一个好的替换可以是 <code>grid = [[1, 2, 3], [2, 1, 4]]</code> 或 <code>grid = [[1, 2, 3], [3, 1, 4]]</code>。</p>

<p>返回 <em><strong>结果 </strong>矩阵</em>。如果有多个答案，则返回其中 <strong>任何 </strong>一个。</p>



<p><strong>示例 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/08/09/grid2drawio.png" />
<pre>
<strong>输入:</strong> grid = [[3,1],[2,5]]
<strong>输出:</strong> [[2,1],[1,2]]
<strong>解释:</strong> 上面的图显示了一个有效的替换。
矩阵中的最大值是 2。可以证明，不能得到更小的值。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> grid = [[10]]
<strong>输出:</strong> [[1]]
<strong>解释:</strong> 我们将矩阵中唯一的数字替换为 1。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 1000</code></li>
<li><code>1 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>9</sup></code></li>
<li><code>grid</code> 由不同的整数组成。</li>
</ul>


**相似问题：**
- [0135：分发糖果](/leetcode/0135)


## 分析

- 从小到大遍历格子，并维护每行/列的最大值
- 格子的值只要比该行/列的最大值大即可

## 解答

```python
class Solution:
    def minScore(self, grid: List[List[int]]) -> List[List[int]]:
        m,n = len(grid),len(grid[0])
        R = [0]*m
        C = [0]*n
        res = [[0]*n for _ in range(m)]
        for x,i,j in sorted([grid[i][j],i,j] for i in range(m) for j in range(n)):
            R[i] = C[j] = res[i][j] = max(R[i],C[j])+1
        return res
```
413 ms

