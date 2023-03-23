# 0562：矩阵中最长的连续1线段（★）


> <u>**[力扣第 562 题](https://leetcode.cn/problems/longest-line-of-consecutive-one-in-matrix/)**</u>

## 题目

<p>给定一个 <code>m x n</code> 的二进制矩阵 <code>mat</code><b> </b>，返回矩阵中最长的连续1线段。</p>

<p>这条线段可以是水平的、垂直的、对角线的或者反对角线的。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/24/long1-grid.jpg" /></p>

<pre>
<strong>输入:</strong> mat = [[0,1,1,0],[0,1,1,0],[0,0,0,1]]
<strong>输出:</strong> 3
</pre>

<p><strong>示例 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/long2-grid.jpg" /></p>

<pre>
<strong>输入:</strong> mat = [[1,1,1,1],[0,1,1,0],[0,0,0,1]]
<strong>输出:</strong> 4
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>m == mat.length</code></li>
<li><code>n == mat[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= m * n &lt;= 10<sup>4</sup></code></li>
<li><code>mat[i][j]</code> 不是 <code>0</code> 就是 <code>1</code>.</li>
</ul>


## 分析

## 解答

```python
    def longestLine(self, mat: List[List[int]]) -> int:
        def cal(A):
            res, cnt = 0, 0
            for val in A:
                cnt = 0 if val == 0 else cnt + 1
                res = max(res, cnt)
            return res
        d, m, n = defaultdict(list), len(mat), len(mat[0])
        for i, j in product(range(m), range(n)):
            d[i+j].append(mat[i][j])
            d[i-j-m].append(mat[i][j])
        return max(cal(A) for A in chain(mat, zip(*mat), d.values()))
```

204 ms
