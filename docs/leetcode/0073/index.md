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


**相似问题：**
- [0289：生命游戏](/leetcode/0289)
- [2125：银行中的激光束数量（1280 分）](/leetcode/2125)
- [2123：使矩阵中的 1 互不相邻的最小操作数](/leetcode/2123)
- [2174：通过翻转行或列来去除所有的 1 II](/leetcode/2174)


## 分析

- 要求只用常数空间，所以考虑用矩阵内的元素来标记
- 为了方便，直接把行首和列首变为 0 来作为标记
- 注意首行和首列的标记位都是 matrix[0][0]，冲突了，所以添加额外参数 flag 来标记首行
- 第二趟遍历时先根据首行和首列的信息改变其它位置的元素，最后再改变首行和首列

## 解答

```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        flag = 0
        m,n = len(matrix),len(matrix[0])
        for i in range(m):
            for j in range(n):
                if matrix[i][j]==0:
                    if i==0:
                        flag = 1
                    else:
                        matrix[0][j]=matrix[i][0]=0
        for i in range(1,m):
            for j in range(1,n):
                if matrix[0][j]==0 or matrix[i][0]==0:
                    matrix[i][j] = 0
        if matrix[0][0]==0:
            for i in range(m):
                matrix[i][0] = 0
        if flag:
            matrix[0] = [0]*n
```
51 ms
