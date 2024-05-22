# 0221：最大正方形（★）


> <u>**[力扣第 221 题](https://leetcode.cn/problems/maximal-square/)**</u>

## 题目

<p>在一个由 <code>'0'</code> 和 <code>'1'</code> 组成的二维矩阵内，找到只包含 <code>'1'</code> 的最大正方形，并返回其面积。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/26/max1grid.jpg" style="width: 400px; height: 319px;" />
<pre>
<strong>输入：</strong>matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
<strong>输出：</strong>4
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/26/max2grid.jpg" style="width: 165px; height: 165px;" />
<pre>
<strong>输入：</strong>matrix = [["0","1"],["1","0"]]
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>matrix = [["0"]]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 <= m, n <= 300</code></li>
<li><code>matrix[i][j]</code> 为 <code>'0'</code> 或 <code>'1'</code></li>
</ul>


## 分析

### #1

本题是 {{< lc "0085">}} 的子问题，修改一下即可。

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        def cal(H):
            res,sk = 0,[]
            for j,h in enumerate(H+[0]):
                while sk and sk[-1][1]>=h:
                    _,x = sk.pop()
                    i = sk[-1][0] if sk else -1
                    res = max(res,min(j-i-1,x)**2)
                sk.append((j,h))
            return res
        res, H = 0, [0]*len(matrix[0])
        for row in matrix:
            H = [a+1 if b=='1' else 0 for a,b in zip(H,row)]
            res = max(res,cal(H))
        return res
```

194 ms

### #2

还可以直接用 dp：
- 令 dp[i][j] 代表以 (i,j) 为右下顶点的最大正方形的边长，当 matrix[i][j] == '1' 时：
	
$$dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])$$
- 用反证法可以证明
- 可以用滚动数组优化空间

## 解答

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        res, dp = 0, [0]*n  
        for row in matrix:
            new = [0]*n
            for j,x in enumerate(row):
                if x=='1':
                    new[j] = 1 if j==0 else 1+min(dp[j-1],dp[j],new[j-1])
            dp = new
            res = max(res,max(dp))
        return res*res
```
113 ms
