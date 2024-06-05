# 0980：不同路径 III（1830 分）


> <u>**[力扣第 120 场周赛第 4 题](https://leetcode.cn/problems/unique-paths-iii/)**</u>

## 题目

<p>在二维网格 <code>grid</code> 上，有 4 种类型的方格：</p>

<ul>
<li><code>1</code> 表示起始方格。且只有一个起始方格。</li>
<li><code>2</code> 表示结束方格，且只有一个结束方格。</li>
<li><code>0</code> 表示我们可以走过的空方格。</li>
<li><code>-1</code> 表示我们无法跨越的障碍。</li>
</ul>

<p>返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目<strong>。</strong></p>

<p><strong>每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格</strong>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
<strong>输出：</strong>2
<strong>解释：</strong>我们有以下两条路径：
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>[[1,0,0,0],[0,0,0,0],[0,0,0,2]]
<strong>输出：</strong>4
<strong>解释：</strong>我们有以下四条路径：
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>[[0,1],[2,0]]
<strong>输出：</strong>0
<strong>解释：</strong>
没有一条路能完全穿过每一个空的方格一次。
请注意，起始和结束方格可以位于网格中的任意位置。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= grid.length * grid[0].length &lt;= 20</code></li>
</ul>


## 分析

显然应该用 dfs。先记录下空方格加结束方格的个数 cnt，然后从起始方格开始深度遍历。
遍历时标记走过的方格以免重复，当到达结束方格且经过方格个数为 cnt 时即为所求。

## 解答

```python
def uniquePathsIII(self, grid: List[List[int]]) -> int:
	def dfs(i, j, cnt):
		if grid[i][j] == 5 and cnt==0:
			self.res += 1
		for x, y in [(i-1,j),(i+1,j),(i,j-1),(i,j+1)]:
			if 0<=x<m and 0<=y<n and grid[x][y] in [0, 2]:
				grid[x][y] += 3
				dfs(x,y,cnt-1)
				grid[x][y] -= 3

	m, n = len(grid), len(grid[0])
	i0, j0, cnt = 0, 0, 0
	for i in range(m):
		for j in range(n):
			if grid[i][j] == 1:
				i0, j0 = i, j
			elif grid[i][j] in [0, 2]:
				cnt += 1
	self.res = 0
	dfs(i0, j0, cnt)
	return self.res
```

72 ms
