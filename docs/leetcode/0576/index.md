# 0576：出界的路径数（★）


> <u>**[力扣第 576 题](https://leetcode.cn/problems/out-of-boundary-paths/)**</u>

## 题目

<p>给你一个大小为 <code>m x n</code> 的网格和一个球。球的起始坐标为 <code>[startRow, startColumn]</code> 。你可以将球移到在四个方向上相邻的单元格内（可以穿过网格边界到达网格之外）。你 <strong>最多</strong> 可以移动 <code>maxMove</code> 次球。</p>

<p>给你五个整数 <code>m</code>、<code>n</code>、<code>maxMove</code>、<code>startRow</code> 以及 <code>startColumn</code> ，找出并返回可以将球移出边界的路径数量。因为答案可能非常大，返回对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 后的结果。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/out_of_boundary_paths_1.png" style="width: 500px; height: 296px;" />
<pre>
<strong>输入：</strong>m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
<strong>输出：</strong>6
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/out_of_boundary_paths_2.png" style="width: 500px; height: 293px;" />
<pre>
<strong>输入：</strong>m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
<strong>输出：</strong>12
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= m, n &lt;= 50</code></li>
<li><code>0 &lt;= maxMove &lt;= 50</code></li>
<li><code>0 &lt;= startRow &lt; m</code></li>
<li><code>0 &lt;= startColumn &lt; n</code></li>
</ul>


## 分析

按第一步的移动方向即可转为递归子问题。

## 解答

```python
def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
    @lru_cache(None)
    def dfs(i, j, k):
        if not 0<=i<m or not 0<=j<n:
            return 1
        if k==0:
            return 0
        return sum(dfs(x, y, k-1) for x,y in [(i+1, j),(i-1,j),(i,j+1),(i,j-1)])%mod
    
    mod = 10**9+7
    return dfs(startRow, startColumn, maxMove)
```
148 ms

