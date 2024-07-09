# 0498：对角线遍历（★）


> <u>**[力扣第 498 题](https://leetcode.cn/problems/diagonal-traverse/)**</u>

## 题目

<p>给你一个大小为 <code>m x n</code> 的矩阵 <code>mat</code> ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/10/diag1-grid.jpg" style="width: 334px; height: 334px;" />
<pre>
<strong>输入：</strong>mat = [[1,2,3],[4,5,6],[7,8,9]]
<strong>输出：</strong>[1,2,4,7,5,3,6,8,9]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>mat = [[1,2],[3,4]]
<strong>输出：</strong>[1,2,3,4]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == mat.length</code></li>
<li><code>n == mat[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= m * n &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>5</sup> &lt;= mat[i][j] &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

- 可以按对角线遍历，注意边界即可
- 更简单的是直接遍历矩阵，将元素添加到对应对角线的列表中，最后再合并


## 解答

```python
class Solution:
    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:
        m, n = len(mat), len(mat[0]) 
        A = [[] for _ in range(m+n-1)]
        for i,j in product(range(m), range(n)):
            A[i+j].append(mat[i][j])
        res = []
        for i, sub in enumerate(A):
            res.extend(sub if i%2 else sub[::-1])
        return res
```

49 ms




