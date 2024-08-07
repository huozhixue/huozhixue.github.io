# 0329：矩阵中的最长递增路径（★★）


> <u>**[力扣第 329 题](https://leetcode.cn/problems/longest-increasing-path-in-a-matrix/)**</u>

## 题目

<p>给定一个 <code>m x n</code> 整数矩阵 <code>matrix</code> ，找出其中 <strong>最长递增路径</strong> 的长度。</p>

<p>对于每个单元格，你可以往上，下，左，右四个方向移动。 你 <strong>不能</strong> 在 <strong>对角线</strong> 方向上移动或移动到 <strong>边界外</strong>（即不允许环绕）。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/05/grid1.jpg" style="width: 242px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[9,9,4],[6,6,8],[2,1,1]]
<strong>输出：</strong>4
<strong>解释：</strong>最长递增路径为 <code>[1, 2, 6, 9]</code>。</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/27/tmp-grid.jpg" style="width: 253px; height: 253px;" />
<pre>
<strong>输入：</strong>matrix = [[3,4,5],[3,2,6],[2,2,1]]
<strong>输出：</strong>4
<strong>解释：</strong>最长递增路径是 <code>[3, 4, 5, 6]</code>。注意不允许在对角线方向上移动。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[1]]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 <= m, n <= 200</code></li>
<li><code>0 <= matrix[i][j] <= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [2328：网格图中递增路径的数目（2001 分）](/leetcode/2328)


## 分析

显然路径中不存在环，所以直接记忆化递归即可。

## 解答

```python
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        @cache
        def dfs(i,j):
            res = 1
            for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                if 0<=x<m and 0<=y<n and matrix[x][y]>matrix[i][j]:
                    res = max(res,1+dfs(x,y))
            return res
        m,n = len(matrix),len(matrix[0])
        return max(dfs(i,j) for i in range(m) for j in range(n))
```
189 ms

