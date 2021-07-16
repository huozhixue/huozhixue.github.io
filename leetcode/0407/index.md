# 0407：接雨水 II（★★★）



第 6 场周赛第 4 题

## 题目

给你一个 m x n 的矩阵，其中的值均为非负整数，代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。

<!--more--> 

示例：

	给出如下 3x6 的高度图:
	[
	  [1,4,3,1,3,2],
	  [3,2,1,3,2,4],
	  [2,3,3,2,3,1]
	]

	返回 4 。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/rainwater_empty.png)

	如上图所示，这是下雨前的高度图[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]] 的状态。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/rainwater_fill.png)

	下雨后，雨水将会被存储在这些方块中。总的接雨水量是4。


## 分析

### #1

对于每个位置，如果有一外圈的柱子都更高，那么该位置就能接到雨水，并且至少接到（该外圈的最矮柱子高度 H - 当前高度 h）的雨水。
找到使 H 最大的外圈，就得到该位置总共能接到的雨水 maxH - h。

显然遍历所有外圈太耗时了，有个巧妙的想法是从最外圈开始，假设最矮柱子 A 高度 H，那么相邻内侧位置 B 能接到的雨水就是 max(0, H-h)。
然后可以将位置 A 替换成位置 B，并更新 B 的高度为 max(H, h)，得到一个缩小一格的新外圈，显然不影响里面位置的结果。

这样遍历逐步缩小的外圈即可得到所有位置能接到的雨水。

具体实现可以用小顶堆维护外圈的高度集合，每轮弹出堆顶即为最矮柱子的高度。另外，为了方便遍历，可以把经过的柱子高度都置 -1。

```python
def trapRainWater(self, heightMap: List[List[int]]) -> int:
	pq, m, n = [], len(heightMap), len(heightMap[0])
	for i, j in product(range(m), range(n)):
		if i in [0, m - 1] or j in [0, n - 1]:
			heappush(pq, (heightMap[i][j], i, j))
			heightMap[i][j] = -1
	res = 0
	while pq:
		H, i, j = heappop(pq)
		for x, y in [(i, j + 1), (i + 1, j), (i, j - 1), (i - 1, j)]:
			if 0 <= x < m and 0 <= y < n and heightMap[x][y] > -1:
				res += max(0, H - heightMap[x][y])
				heappush(pq, (max(H, heightMap[x][y]), x, y))
				heightMap[x][y] = -1
	return res
```

268 ms

### #2

还有个巧妙的并查集做法。

## 解答

```python

```


