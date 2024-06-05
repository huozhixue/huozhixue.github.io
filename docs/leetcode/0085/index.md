# 0085：最大矩形（★★）


> <u>**[力扣第 85 题](https://leetcode.cn/problems/maximal-rectangle/)**</u>

## 题目

<p>给定一个仅包含 <code>0</code> 和 <code>1</code> 、大小为 <code>rows x cols</code> 的二维二进制矩阵，找出只包含 <code>1</code> 的最大矩形，并返回其面积。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/14/maximal.jpg" style="width: 402px; height: 322px;" />
<pre>
<strong>输入：</strong>matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
<strong>输出：</strong>6
<strong>解释：</strong>最大矩形如上图所示。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>matrix = [["0"]]
<strong>输出：</strong>0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>matrix = [["1"]]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>rows == matrix.length</code></li>
<li><code>cols == matrix[0].length</code></li>
<li><code>1 &lt;= row, cols &lt;= 200</code></li>
<li><code>matrix[i][j]</code> 为 <code>'0'</code> 或 <code>'1'</code></li>
</ul>


## 分析

- 固定矩形的底在第 i 行，求出每列的高度 H[i][j]，即转为问题 {{< lc "0084" >}}
- 注意 H[i][j] 可以由 H[i-1][j] 递推得到，故总的时间复杂度 $O(M*N)$

## 解答

```python
class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        def cal(H):
            res,sk = 0,[]
            for j,h in enumerate(H+[0]):
                while sk and sk[-1][1]>=h:
                    _,x = sk.pop()
                    i = sk[-1][0] if sk else -1
                    res = max(res,(j-i-1)*x)
                sk.append((j,h))
            return res
        res, H = 0, [0]*len(matrix[0])
        for row in matrix:
            H = [a+1 if b=='1' else 0 for a,b in zip(H,row)]
            res = max(res,cal(H))
        return res
```
71 ms
