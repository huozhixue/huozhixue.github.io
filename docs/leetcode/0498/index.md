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
  
### #1

最简单的就是先保存每一条对角线的列表，然后再拼接，注意第偶数条对角线反转即可。

每条对角线中的元素行列坐标之和相等，因此遍历时将 (i, j) 位置的元素添加到 i+j 对应的对角线即可。

```python
def findDiagonalOrder(self, matrix: List[List[int]]) -> List[int]:
	m, n = len(matrix), len(matrix) and len(matrix[0])
	tmp = [[] for _ in range(m+n-1)]
	for i in range(m):
		for j in range(n):
			tmp[i+j].append(matrix[i][j])
	res = []
	for i, diag in enumerate(tmp):
		res.extend(diag if i%2 else diag[::-1])
	return res
```

196 ms

### #2

也可以直接按对角线遍历。注意边界范围，第偶数条对角线反着遍历。

## 解答

```python
def findDiagonalOrder(self, matrix: List[List[int]]) -> List[int]:
	res, m, n = [], len(matrix), len(matrix) and len(matrix[0])
	for k in range(m+n-1):
		start, end = max(0, k-n+1), min(k, m-1)
		span = range(start, end+1) if k%2 else range(end, start-1, -1)
		res.extend(matrix[i][k-i] for i in span)
	return res
```

220 ms
