# 0750：角矩形的数量（★）


> <u>**[力扣第 750 题](https://leetcode.cn/problems/number-of-corner-rectangles/)**</u>

## 题目

<p>给定一个只包含 <code>0</code> 和 <code>1</code> 的 <code>m x n</code> 整数矩阵 <code>grid</code> ，返回 <em>其中 「<strong>角矩形 」</strong>的数量</em> 。</p>

<p>一个<strong>「角矩形」</strong>是由四个不同的在矩阵上的 <code>1</code> 形成的 <strong>轴对齐 </strong>的矩形。注意只有角的位置才需要为 <code>1</code>。</p>

<p><strong>注意：</strong>4 个 <code>1</code> 的位置需要是不同的。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/12/cornerrec1-grid.jpg" /></p>

<pre>
<strong>输入：</strong>grid = [[1,0,0,1,0],[0,0,1,0,1],[0,0,0,1,0],[1,0,1,0,1]]
<strong>输出：</strong>1
<strong>解释：</strong>只有一个角矩形，角的位置为 grid[1][2], grid[1][4], grid[3][2], grid[3][4]。
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/12/cornerrec2-grid.jpg" /></p>

<pre>
<strong>输入：</strong>grid = [[1,1,1],[1,1,1],[1,1,1]]
<strong>输出：</strong>9
<strong>解释：</strong>这里有 4 个 2x2 的矩形，4 个 2x3 和 3x2 的矩形和 1 个 3x3 的矩形。
</pre>

<p><strong>示例 3：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/12/cornerrec3-grid.jpg" /></p>

<pre>
<strong>输入：</strong>grid = [[1,1,1,1]]
<strong>输出：</strong>0
<strong>解释：</strong>矩形必须有 4 个不同的角。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>grid[i][j]</code> 不是 <code>0</code> 就是 <code>1</code></li>
<li>网格中 <code>1</code> 的个数在 <code>[1, 6000]</code> 范围内</li>
</ul>


## 分析

### #1

先选定上下界 i 和 j，假如这两行中有 w 个位置同时为 1，则能组成 w*(w-1)//2 个矩形。

```python
def countCornerRectangles(self, grid: List[List[int]]) -> int:
	m, n = len(grid), len(grid[0])
	res = 0
	for i in range(m):
		for j in range(i+1,m):
			w = sum(a==b==1 for a,b in zip(grid[i],grid[j]))
			res += w*(w-1)//2
	return res
```
2876 ms

### #2

由于只存在 0 和 1，可以将每一行转为二进制数，然后用位运算快速得到 w。


## 解答

```python
def countCornerRectangles(self, grid: List[List[int]]) -> int:
	A = [int(''.join(map(str,row)),2) for row in grid]
	res, m = 0, len(A)
	for i in range(m):
		for j in range(i+1,m):
			w = bin(A[i]&A[j]).count('1')
			res += w*(w-1)//2
	return res
```
148 ms
