# 0064：最小路径和（★）


> <u>**[力扣第 64 题](https://leetcode.cn/problems/minimum-path-sum/)**</u>

## 题目

<p>给定一个包含非负整数的 <code><em>m</em> x <em>n</em></code> 网格 <code>grid</code> ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。</p>

<p><strong>说明：</strong>每次只能向下或者向右移动一步。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg" style="width: 242px; height: 242px;" />
<pre>
<strong>输入：</strong>grid = [[1,3,1],[1,5,1],[4,2,1]]
<strong>输出：</strong>7
<strong>解释：</strong>因为路径 1→3→1→1→1 的总和最小。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,2,3],[4,5,6]]
<strong>输出：</strong>12
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>0 &lt;= grid[i][j] &lt;= 200</code></li>
</ul>


## 分析

类似 {{< lc "0062">}}，只是递推关系变成了：

$$dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i-1][j-1]$$

## 解答

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m,n = len(grid),len(grid[0])
        dp = [[inf]*(n+1) for _ in range(m+1)]
        dp[0][1] = 0
        for i in range(1,m+1):
            for j in range(1,n+1):
                dp[i][j] = grid[i-1][j-1]+min(dp[i-1][j],dp[i][j-1])
        return dp[-1][-1]
```
45 ms
