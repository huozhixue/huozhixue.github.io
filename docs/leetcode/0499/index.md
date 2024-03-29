# 0499：迷宫 III（★★）


> <u>**[力扣第 499 题](https://leetcode.cn/problems/the-maze-iii/)**</u>

## 题目

<p>由空地和墙组成的迷宫中有一个<strong>球</strong>。球可以向<strong>上（u）下（d）左（l）右（r）</strong>四个方向滚动，但在遇到墙壁前不会停止滚动。当球停下时，可以选择下一个方向。迷宫中还有一个<strong>洞</strong>，当球运动经过洞时，就会掉进洞里。</p>

<p>给定球的<strong>起始位置，目的地</strong>和<strong>迷宫</strong>，找出让球以最短距离掉进洞里的路径。 距离的定义是球从起始位置（不包括）到目的地（包括）经过的<strong>空地</strong>个数。通过&#39;u&#39;, &#39;d&#39;, &#39;l&#39; 和 &#39;r&#39;输出球的移动<strong>方向</strong>。 由于可能有多条最短路径， 请输出<strong>字典序最小</strong>的路径<strong>。</strong>如果球无法进入洞，输出&quot;impossible&quot;。</p>

<p>迷宫由一个0和1的二维数组表示。 1表示墙壁，0表示空地。你可以假定迷宫的边缘都是墙壁。起始位置和目的地的坐标通过行号和列号给出。</p>



<p><strong>示例1:</strong></p>

<pre><strong>输入 1:</strong> 迷宫由以下二维数组表示

0 0 0 0 0
1 1 0 0 1
0 0 0 0 0
0 1 0 0 1
0 1 0 0 0

<strong>输入 2:</strong> 球的初始位置 (rowBall, colBall) = (4, 3)
<strong>输入 3:</strong> 洞的位置 (rowHole, colHole) = (0, 1)

<strong>输出:</strong> &quot;lul&quot;

<strong>解析:</strong> 有两条让球进洞的最短路径。
第一条路径是 左 -&gt; 上 -&gt; 左, 记为 &quot;lul&quot;.
第二条路径是 上 -&gt; 左, 记为 &#39;ul&#39;.
两条路径都具有最短距离6, 但&#39;l&#39; &lt; &#39;u&#39;，故第一条路径字典序更小。因此输出&quot;lul&quot;。
<img src="https://assets.leetcode.com/uploads/2018/10/13/maze_2_example_1.png" style="width: 100%;">
</pre>

<p><strong>示例 2:</strong></p>

<pre><strong>输入 1:</strong> 迷宫由以下二维数组表示

0 0 0 0 0
1 1 0 0 1
0 0 0 0 0
0 1 0 0 1
0 1 0 0 0

<strong>输入 2:</strong> 球的初始位置 (rowBall, colBall) = (4, 3)
<strong>输入 3:</strong> 洞的位置 (rowHole, colHole) = (3, 0)

<strong>输出:</strong> &quot;impossible&quot;

<strong>示例:</strong> 球无法到达洞。
<img src="https://assets.leetcode.com/uploads/2018/10/13/maze_2_example_2.png" style="width: 100%;">
</pre>



<p><strong>注意:</strong></p>

<ol>
<li>迷宫中只有一个球和一个目的地。</li>
<li>球和洞都在空地上，且初始时它们不在同一位置。</li>
<li>给定的迷宫不包括边界 (如图中的红色矩形), 但你可以假设迷宫的边缘都是墙壁。</li>
<li>迷宫至少包括2块空地，行数和列数均不超过30。</li>
</ol>


## 分析

{{< lc "0505" >}} 进阶版:
- 遇到洞时中止滚动即可
- 除了距离，还要考虑路径的字典序，调整顺序一起入堆即可

## 解答

```python
def findShortestWay(self, maze: List[List[int]], ball: List[int], hole: List[int]) -> str:
	m, n = len(maze), len(maze[0])
	pq, d = [(0, '', *ball)], {}
	while pq:
		w, path, i, j = heappop(pq)
		if [i, j] == hole:
			return path
		if (i, j) in d:
			continue
		d[(i, j)] = w
		for dx, dy, p in [(-1, 0, 'u'), (1, 0, 'd'), (0, -1, 'l'), (0, 1, 'r')]:
			x, y, w2 = i, j, w
			while 0<=x+dx<m and 0<=y+dy<n and maze[x+dx][y+dy]==0:
				x, y, w2 = x+dx, y+dy, w2+1
				if [x, y] == hole:
					break
			if (x, y) not in d:
				heappush(pq, (w2, path+p, x, y))
	return 'impossible'
```
36 ms
