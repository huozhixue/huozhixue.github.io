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


**相似问题：**
- [0062：不同路径](/leetcode/0062)
- [0174：地下城游戏](/leetcode/0174)
- [0741：摘樱桃](/leetcode/0741)
- [2304：网格中的最小路径代价（1658 分）](/leetcode/2304)
- [1937：扣分后的最大得分（2105 分）](/leetcode/1937)
- [2087：网格图中机器人回家的最小代价（1743 分）](/leetcode/2087)
- [2435：矩阵中和能被 K 整除的路径（1951 分）](/leetcode/2435)
- [2510：检查是否有路径经过相同数量的 0 和 1](/leetcode/2510)
- [2662：前往目标的最小代价（2153 分）](/leetcode/2662)


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
