# 0073：矩阵置零（★）


> <u>**[力扣第 73 题](https://leetcode.cn/problems/set-matrix-zeroes/)**</u>

## 题目

<p>给定一个 <code><em>m</em> x <em>n</em></code> 的矩阵，如果一个元素为 <strong>0 </strong>，则将其所在行和列的所有元素都设为 <strong>0</strong> 。请使用 <strong><a href="http://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95" target="_blank">原地</a></strong> 算法<strong>。</strong></p>

<ul>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg" style="width: 450px; height: 169px;" />
<pre>
<strong>输入：</strong>matrix = [[1,1,1],[1,0,1],[1,1,1]]
<strong>输出：</strong>[[1,0,1],[0,0,0],[1,0,1]]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg" style="width: 450px; height: 137px;" />
<pre>
<strong>输入：</strong>matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
<strong>输出：</strong>[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[0].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>-2<sup>31</sup> &lt;= matrix[i][j] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>一个直观的解决方案是使用  <code>O(<em>m</em><em>n</em>)</code> 的额外空间，但这并不是一个好的解决方案。</li>
<li>一个简单的改进方案是使用 <code>O(<em>m</em> + <em>n</em>)</code> 的额外空间，但这仍然不是最好的解决方案。</li>
<li>你能想出一个仅使用常量空间的解决方案吗？</li>
</ul>


## 分析

### #1

可以先遍历一趟记录有 0 的行和列，再遍历一趟将符合的元素置 0 即可。

```python
def setZeroes(self, matrix: List[List[int]]) -> None:
    row, col, m, n = set(), set(), len(matrix), len(matrix[0])
    for i, j in product(range(m), range(n)):
        if matrix[i][j] == 0:
            row.add(i)
            col.add(j)
    for i, j in product(range(m), range(n)):
        if i in row or j in col:
            matrix[i][j] = 0
```
32 ms

### #2

要求只用常数空间，所以考虑用矩阵内的元素来标记：
- 为了方便，直接把行首和列首变为 0 来作为标记
- 第二趟遍历时先根据首行和首列的信息改变其它位置的元素，最后再改变首行和首列。
- 注意首行和首列的标记位都是 matrix[0][0]，冲突了，所以添加一个额外参数来标记首行

## 解答

```python
def setZeroes(self, matrix: List[List[int]]) -> None:
    m, n, first_row = len(matrix), len(matrix[0]), False
    for i, j in product(range(m), range(n)):
        if matrix[i][j] == 0:
            if i == 0:
                first_row = True
            else:
                matrix[i][0] = matrix[0][j] = 0
    for i, j in product(range(1, m), range(1, n)):
        if matrix[i][0] == 0 or matrix[0][j] == 0:
            matrix[i][j] = 0
    if matrix[0][0] == 0:
        for i in range(1, m):
            matrix[i][0] = 0
    if first_row:
        matrix[0] = [0] * n
```
44 ms
