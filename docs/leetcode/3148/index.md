# 3148：矩阵中的最大得分（1819 分）


> <u>**[力扣第 397 场周赛第 3 题](https://leetcode.cn/problems/maximum-difference-score-in-a-grid/)**</u>

## 题目

<p>给你一个由 <strong>正整数</strong> 组成、大小为 <code>m x n</code> 的矩阵 <code>grid</code>。你可以从矩阵中的任一单元格移动到另一个位于正下方或正右侧的任意单元格（不必相邻）。从值为 <code>c1</code> 的单元格移动到值为 <code>c2</code> 的单元格的得分为 <code>c2 - c1</code> 。</p>

<p>你可以从<strong> 任一</strong> 单元格开始，并且必须至少移动一次。</p>

<p>返回你能得到的 <strong>最大 </strong>总得分。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/03/14/grid1.png" style="width: 240px; height: 240px;" />
<div class="example-block">
<p><strong>输入：</strong><span class="example-io">grid = [[9,5,7,3],[8,9,6,1],[6,7,14,3],[2,5,3,1]]</span></p>

<p><strong>输出：</strong><span class="example-io">9</span></p>

<p><strong>解释：</strong>从单元格 <code>(0, 1)</code> 开始，并执行以下移动：<br />
- 从单元格 <code>(0, 1)</code> 移动到 <code>(2, 1)</code>，得分为 <code>7 - 5 = 2</code> 。<br />
- 从单元格 <code>(2, 1)</code> 移动到 <code>(2, 2)</code>，得分为 <code>14 - 7 = 7</code> 。<br />
总得分为 <code>2 + 7 = 9</code> 。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/04/08/moregridsdrawio-1.png" style="width: 180px; height: 116px;" /></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">grid = [[4,3,2],[3,2,1]]</span></p>

<p><strong>输出：</strong><span class="example-io">-1</span></p>

<p><strong>解释：</strong>从单元格 <code>(0, 0)</code> 开始，执行一次移动：从 <code>(0, 0)</code> 到 <code>(0, 1)</code> 。得分为 <code>3 - 4 = -1</code> 。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>2 &lt;= m, n &lt;= 1000</code></li>
<li><code>4 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [3225：网格图操作后的最大分数](/leetcode/3225)


## 分析

等价于求最大的两数之差，遍历每个位置，维护其左上的最小值，作差即可。

## 解答


```python
class Solution:
    def maxScore(self, grid: List[List[int]]) -> int:
        m,n = len(grid),len(grid[0])
        res = -inf
        for i,j in product(range(m),range(n)):
            a = grid[i-1][j] if i else inf
            b = grid[i][j-1] if j else inf
            res = max(res,grid[i][j]-min(a,b))
            grid[i][j] = min(grid[i][j],a,b)
        return res
```
356 ms
