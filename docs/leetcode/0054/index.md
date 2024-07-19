# 0054：螺旋矩阵（★）


> <u>**[力扣第 54 题](https://leetcode.cn/problems/spiral-matrix/)**</u>

## 题目

<p>给你一个 <code>m</code> 行 <code>n</code> 列的矩阵 <code>matrix</code> ，请按照 <strong>顺时针螺旋顺序</strong> ，返回矩阵中的所有元素。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg" style="width: 242px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[1,2,3],[4,5,6],[7,8,9]]
<strong>输出：</strong>[1,2,3,6,9,8,7,4,5]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
<strong>输出：</strong>[1,2,3,4,8,12,11,10,9,5,6,7]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 <= m, n <= 10</code></li>
<li><code>-100 <= matrix[i][j] <= 100</code></li>
</ul>


**相似问题：**
- [0059：螺旋矩阵 II](/leetcode/0059)
- [0885：螺旋矩阵 III（1678 分）](/leetcode/0885)
- [2326：螺旋矩阵 IV（1421 分）](/leetcode/2326)


## 分析 

考虑模拟过程:
- 初始位置 <i,j>=(0,0)，初始方向 <di,dj>=(0,1) 
- 到达边界位置则改变方向为 <dj,-di>
- 为了方便，可以将走过的地方置 inf ，当 matrix[(i+di)%m][(j+dj)%n]==inf 即代表到达边界

## 解答

```python
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        m,n = len(matrix),len(matrix[0])
        i,j,di,dj = 0,0,0,1
        res = []
        for _ in range(m*n):
            res.append(matrix[i][j])
            matrix[i][j] = inf
            if matrix[(i+di)%m][(j+dj)%n]==inf:
                di,dj = dj,-di
            i,j = i+di,j+dj
        return res
```
32 ms

