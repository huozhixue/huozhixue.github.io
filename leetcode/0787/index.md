# 0787：K 站中转内最便宜的航班（★★）


## 题目

有 n 个城市通过 m 个航班连接。每个航班都从城市 u 开始，以价格 w 抵达 v。

现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到从 src 到 dst 最多经过 k 站中转的最便宜的价格。 
如果没有这样的路线，则输出 -1。

- n 范围是 [1, 100]，城市标签从 0 到 n - 1
- 航班数量范围是 [0, n * (n - 1) / 2]
- 每个航班的格式 (src, dst, price)
- 每个航班的价格范围是 [1, 10000]
- k 范围是 [0, n - 1]
- 航班没有重复，且不存在自环

 <!--more--> 
 
示例 1：

	输入: 
	n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
	src = 0, dst = 2, k = 1
	输出: 200
	解释: 
	城市航班图如下

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/02/16/995.png)

	从城市 0 到城市 2 在 1 站中转以内的最便宜价格是 200，如图中红色所示。

示例 2：

	输入: 
	n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
	src = 0, dst = 2, k = 0
	输出: 500
	解释: 
	城市航班图如下

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/02/16/995.png)

	从城市 0 到城市 2 在 0 站中转以内的最便宜价格是 500，如图中蓝色所示。
	 

## 分析

### #1

这种限定了路径长度的问题可以考虑递归。令辅助函数 help(u, k) 代表从 u 到达 dst 最多经过 k 站中转的最低价，那么：

	help(u, k) = min(w+help(v, k-1) for v, w in nxt[u])
	nxt 记录的是 u 的所有相邻城市及航班价格
	
再考虑下边界条件即可。

```python
def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, K: int) -> int:
	@lru_cache(None)
	def help(u, k):
		if u == dst:
			return 0
		if k == -1 or u not in nxt:
			return float('inf')
		return min(w+help(v, k-1) for v,w in nxt[u])

	nxt = defaultdict(list)
	for u, v, w in flights:
		nxt[u].append((v, w))
	res = help(src, K)
	return res if res < float('inf') else -1
```

116 ms

### #2

还有个巧妙的方法，采用基于堆的 dijkstra 算法。

如果迭代生成所有从 u 出发最多 k 站中转的路径，那么根据每条路径的终点和价格就得到结果。
而采用基于堆的 dijkstra 算法来生成最多 k 站中转的路径，当弹出的路径终点是 src 时即为所求。

## 解答

```python
def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, K: int) -> int:
	nxt = defaultdict(list)
	for u, v, w in flights:
		nxt[u].append((v, w))
	pq = [(0, src, 0)]
	while pq:
		w, u, k = heappop(pq)
		if u == dst:
			return w
		if k < K+1:
			for v, w2 in nxt[u]:
				heappush(pq, (w+w2, v, k+1))
	return -1
```

84 ms


