# 1091：二进制矩阵中的最短路径（1658 分）


> <u>**[力扣第 141 场周赛第 3 题](https://leetcode.cn/problems/shortest-path-in-binary-matrix/)**</u>

## 题目

<p>给你一个 <code>n x n</code> 的二进制矩阵 <code>grid</code> 中，返回矩阵中最短 <strong>畅通路径</strong> 的长度。如果不存在这样的路径，返回 <code>-1</code> 。</p>

<p>二进制矩阵中的 畅通路径 是一条从 <strong>左上角</strong> 单元格（即，<code>(0, 0)</code>）到 右下角 单元格（即，<code>(n - 1, n - 1)</code>）的路径，该路径同时满足下述要求：</p>

<ul>
<li>路径途经的所有单元格的值都是 <code>0</code> 。</li>
<li>路径中所有相邻的单元格应当在 <strong>8 个方向之一</strong> 上连通（即，相邻两单元之间彼此不同且共享一条边或者一个角）。</li>
</ul>

<p><strong>畅通路径的长度</strong> 是该路径途经的单元格总数。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/18/example1_1.png" style="width: 500px; height: 234px;" />
<pre>
<strong>输入：</strong>grid = [[0,1],[1,0]]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/18/example2_1.png" style="height: 216px; width: 500px;" />
<pre>
<strong>输入：</strong>grid = [[0,0,0],[1,1,0],[1,1,0]]
<strong>输出：</strong>4
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,0,0],[1,1,0],[1,1,0]]
<strong>输出：</strong>-1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= n &lt;= 100</code></li>
<li><code>grid[i][j]</code> 为 <code>0</code> 或 <code>1</code></li>
</ul>


## 分析

典型的 bfs。

## 解答


```python
def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
	if grid[0][0]:
		return -1
	n = len(grid)
	Q, vis = deque([(0, 0, 1)]), {(0, 0)}
	while Q:
		r,c,k = Q.popleft()
		if r==c==n-1:
			return k
		for x,y in product(range(r-1, r+2), range(c-1, c+2)):
			if 0<=x<n and 0<=y<n and grid[x][y]==0 and (x,y) not in vis:
				Q.append((x, y, k+1))
				vis.add((x, y))
	return -1
```

368 ms
