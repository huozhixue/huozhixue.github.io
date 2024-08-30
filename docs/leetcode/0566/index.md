# 0566：重塑矩阵


> <u>**[力扣第 566 题](https://leetcode.cn/problems/reshape-the-matrix/)**</u>

## 题目

<p>在 MATLAB 中，有一个非常有用的函数 <code>reshape</code> ，它可以将一个 <code>m x n</code> 矩阵重塑为另一个大小不同（<code>r x c</code>）的新矩阵，但保留其原始数据。</p>

<p>给你一个由二维数组 <code>mat</code> 表示的 <code>m x n</code> 矩阵，以及两个正整数 <code>r</code> 和 <code>c</code> ，分别表示想要的重构的矩阵的行数和列数。</p>

<p>重构后的矩阵需要将原始矩阵的所有元素以相同的<strong> 行遍历顺序 </strong>填充。</p>

<p>如果具有给定参数的 <code>reshape</code> 操作是可行且合理的，则输出新的重塑矩阵；否则，输出原始矩阵。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/reshape1-grid.jpg" style="width: 613px; height: 173px;" />
<pre>
<strong>输入：</strong>mat = [[1,2],[3,4]], r = 1, c = 4
<strong>输出：</strong>[[1,2,3,4]]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/24/reshape2-grid.jpg" style="width: 453px; height: 173px;" />
<pre>
<strong>输入：</strong>mat = [[1,2],[3,4]], r = 2, c = 4
<strong>输出：</strong>[[1,2],[3,4]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == mat.length</code></li>
<li><code>n == mat[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 100</code></li>
<li><code>-1000 &lt;= mat[i][j] &lt;= 1000</code></li>
<li><code>1 &lt;= r, c &lt;= 300</code></li>
</ul>


**相似问题：**
- [2022：将一维数组转变成二维数组（1307 分）](/leetcode/2022)


## 分析

展开再分割即可。

## 解答

```python
class Solution:
    def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:
        m,n = len(mat),len(mat[0])
        if m*n!=r*c:
            return mat
        A = [x for row in mat for x in row]
        return [A[i*c:i*c+c] for i in range(r)]
```
39 ms

