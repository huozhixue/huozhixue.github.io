# 3359：查找最大元素不超过 K 的有序子矩阵（★★）


> <u>**[力扣第 3359 题](https://leetcode.cn/problems/find-sorted-submatrices-with-maximum-element-at-most-k/)**</u>

## 题目

<p>给定一个大小为 <code>m x n</code> 的二维矩阵 <code>grid</code>。同时给定一个 <strong>非负整数</strong> <code>k</code>。</p>

<p>返回满足下列条件的 <code>grid</code> 的子矩阵数量：</p>

<ul>
<li>子矩阵中最大的元素 <b>小于等于</b> <code>k</code>。</li>
<li>子矩阵的每一行都以 <strong>非递增</strong> 顺序排序。</li>
</ul>

<p>矩阵的子矩阵 <code>(x1, y1, x2, y2)</code> 是通过选择所有满足 <code>x1 &lt;= x &lt;= x2</code> 且 <code>y1 &lt;= y &lt;= y2</code> 的 <code>grid[x][y]</code> 元素组成的矩阵。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>grid = [[4,3,2,1],[8,7,6,1]], k = 3</span></p>

<p><strong>输出：</strong><span class="example-io">8</span></p>

<p><strong>解释：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2024/11/01/mine.png" style="width: 360px; height: 200px;" /></strong></p>

<p>8 个子矩阵分别是：</p>

<ul>
<li><code>[[1]]</code></li>
<li><code>[[1]]</code></li>
<li><code>[[2,1]]</code></li>
<li><code>[[3,2,1]]</code></li>
<li><code>[[1],[1]]</code></li>
<li><code>[[2]]</code></li>
<li><code>[[3]]</code></li>
<li><code>[[3,2]]</code></li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>grid = [[1,1,1],[1,1,1],[1,1,1]], k = 1</span></p>

<p><span class="example-io"><b>输出：</b>36</span></p>

<p><strong>解释：</strong></p>

<p>矩阵中有 36 个子矩阵。所有子矩阵的最大元素都等于 1。</p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>grid = [[1]], k = 1</span></p>

<p><span class="example-io"><b>输出：</b>1</span></p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= m == grid.length &lt;= 10<sup>3</sup></code></li>
<li><code>1 &lt;= n == grid[i].length &lt;= 10<sup>3</sup></code></li>
<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>


​​​​​​

**相似问题：**
- [0085：最大矩形](/leetcode/0085)


## 分析

- 类似 {{< lc "1504" >}}，枚举每一列作为右边界，转为柱形图，单调栈+dp 解决

## 解答


```python
class Solution:
    def countSubmatrices(self, grid: List[List[int]], k: int) -> int:
        def cal(A):
            res = 0
            f = [0]*len(A)
            sk = []
            for j,a in enumerate(A):
                while sk and A[sk[-1]]>=a:
                    sk.pop()
                i = sk[-1] if sk else -1
                f[j] = f[i]+(j-i)*a
                res += f[j]
                sk.append(j)
            return res

        m,n = len(grid),len(grid[0])
        f = [0]*m
        res = 0
        for j in range(n):
            for i in range(m):
                if grid[i][j]>k:
                    f[i] = 0
                else:
                    f[i] = 1+(f[i] if j==0 or grid[i][j]<=grid[i][j-1] else 0)
            res += cal(f)
        return res
```
854 ms
