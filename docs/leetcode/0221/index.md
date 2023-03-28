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
def maximalSquare(self, matrix: List[List[str]]) -> int:
    def cal(H):
        res, stack = 0, []
        for j, y in enumerate(H+[0]):
            while stack and stack[-1][1] >= y:
                i, x = stack.pop()
                left = stack[-1][0] if stack else -1
                h = min(j-left-1, x)
                res = max(res, h*h)
            stack.append((j, y))
        return res

    m, n = len(matrix), len(matrix[0])
    res, H = 0, [0] * n
    for i in range(m):
        for j in range(n):
            H[j] = H[j] + 1 if matrix[i][j] == '1' else 0
        res = max(res, cal(H))
    return res
```

时间复杂度 O(N^2)，204 ms

### #2

还有个巧妙的 dp 方法：

令 dp[i][j] 代表以 (i,j) 为右下顶点的最大正方形的边长，当 matrix[i][j] == '1' 时：
	
$$dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])$$

证明：
- 该值显然是成立的
- 假设 dp[i][j]=x，则必然有 dp[i][j-1] >=x-1，即 x <= 1+dp[i][j-1]
- 同理可得 x <= 1 + dp[i-1][j-1]; x<=1+dp[i-1][j]
- 故 dp[i][j] 等于该值

可以用滚动数组优化空间。

## 解答

```python
def maximalSquare(self, matrix: List[List[str]]) -> int:
    m, n = len(matrix), len(matrix[0])
    side, dp = 0, [0]*n  
    for i in range(m):
        new = [0]*n
        for j in range(n):
            if matrix[i][j] == '1':
                new[j] = 1 if i==0 or j==0 else 1 + min(dp[j-1], dp[j], new[j-1])
                side = max(side, new[j])
        dp = new
    return side * side
```
时间复杂度 O(N^2)，148 ms
