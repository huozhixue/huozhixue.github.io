# 0743：网络延迟时间（★★）


## 题目

有 n 个网络节点，标记为 1 到 n。

给你一个列表 times，表示信号经过 有向 边的传递时间。 times[i] = (ui, vi, wi)，其中 ui 是源节点，vi 是目标节点， 
wi 是一个信号从源节点传递到目标节点的时间。

现在，从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1 。

ui != vi。0 <= wi <= 100。所有 (ui, vi) 对都 互不相同（即，不含重复边）。



 <!--more--> 
 
示例 1：

![img](https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png)

	输入：times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
	输出：2

示例 2：

	输入：times = [[1,2,1]], n = 2, k = 1
	输出：1

示例 3：

	输入：times = [[1,2,1]], n = 2, k = 2
	输出：-1
 


## 分析

### #1

典型的单源最短路径问题，可以用 dijkstra 算法。

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
	nxt = defaultdict(list)
	for u, v, w in times:
		nxt[u].append((v, w))
	d = {i: 0 if i==k else float('inf')  for i in range(1, n+1)}
	Q = set(range(1, n+1))
	while Q:
		u = min(Q, key=d.get)
		Q.remove(u)
		for v, w in nxt[u]:
			if v in Q and d[u]+w < d[v]:
				d[v] = d[u] + w
	res = max(d.values())
	return res if res != float('inf') else -1
```

84 ms

### #2

也可以采用 堆实现的 dijkstra 算法，当图稀疏时速度更快。

## 解答

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
	nxt = defaultdict(list)
	for u, v, w in times:
		nxt[u].append((v, w))
	d, pq = {}, [(0, k)]
	while pq:
		w, u = heappop(pq)
		if u in d: 
			continue
		d[u] = w
		if len(d) == n:
			return max(d.values())
		for v, w2 in nxt[u]:
			if v not in d:
				heappush(pq, (w+w2, v))
    return -1
```

72 ms

## *附加

本题还可以练习 Bellman-Ford 算法和优化后的 SPFA 算法。它们适用于有负权边的图。本题没有负权边，所以代码有所简化。

Bellman-Ford 算法

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
	d = {i: 0 if i==k else float('inf') for i in range(1, n+1)}
	for _ in range(n-1):
		flag = False
		for u, v, w in times:
			if d[u] + w < d[v]:
				d[v] = d[u] + w
				flag = True
		if not flag:
			break
	res = max(d.values())
	return res if res<float('inf') else -1
```

92 ms

SPFA 算法

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
	nxt = defaultdict(list)
	for u, v, w in times:
		nxt[u].append((v, w))
	d = {i: 0 if i==k else float('inf')  for i in range(1, n+1)}
	queue, vis = deque([k]), {k}
	while queue:
		u = queue.popleft()
		vis.remove(u)
		for v, w in nxt[u]:
			if d[u]+w < d[v]:
				d[v] = d[u] + w
				if v not in vis:
					vis.add(v)
					queue.append(v)
	res = max(d.values())
	return res if res != float('inf') else -1
```

80 ms
