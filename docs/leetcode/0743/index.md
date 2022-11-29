# 0743：网络延迟时间（★★）


> **第  场周赛第  题**

## 题目

有 n 个网络节点，标记为 1 到 n。

给你一个列表 times，表示信号经过 有向 边的传递时间。 times[i] = (ui, vi, wi)，其中 ui 是源节点，vi 是目标节点， 
wi 是一个信号从源节点传递到目标节点的时间。

现在，从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1 。

 
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
 
提示：
- 1 <= k <= n <= 100
- 1 <= times.length <= 6000
- times[i].length == 3
- 1 <= ui, vi <= n
- ui != vi
- 0 <= wi <= 100
- 所有 (ui, vi) 对都 互不相同（即，不含重复边）

## 分析

典型的单源最短路径问题，可以用堆优化的 dijkstra 算法。

## 解答

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    nxt = defaultdict(list)
    for u, v, w in times:
        nxt[u-1].append((v-1, w))
    d, pq = {}, [(0, k-1)]
    while pq:
        w, u = heappop(pq)
        if u in d:
            continue
        d[u] = w
        for v, w2 in nxt[u]:
            if v not in d:
                heappush(pq, (w+w2, v))
    return max(d.values()) if len(d) == n else -1
```
时间复杂度 O(E*logE)，88 ms

## *附加

本题可以练习各种最短路算法。

### #1 Floyd

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    d = [[float('inf')]*n for _ in range(n)]
    for i in range(n):
        d[i][i] = 0
    for u, v, w in times:
        d[u-1][v-1] = w
    for x, i, j in product(range(n), range(n), range(n)):
        d[i][j] = min(d[i][j], d[i][x]+d[x][j])
    res = max(d[k-1])
    return res if res < float('inf') else -1
```
时间复杂度 O(V^3)，1188 ms

### #2 Bellman-Ford 

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    d = [float('inf')] * n
    d[k-1] = 0
    for _ in range(n - 1):
        flag = True
        for u, v, w in times:
            if d[u-1] + w < d[v-1]:
                d[v-1] = d[u-1] + w
                flag = False
        if flag:
            break
    res = max(d)
    return res if res < float('inf') else -1
```
时间复杂度 O(E*V)，92 ms

### #3 SPFA

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    nxt = defaultdict(list)
    for u, v, w in times:
        nxt[u-1].append((v-1, w))
    d = [float('inf')] * n
    d[k-1] = 0
    queue, vis = deque([k-1]), {k-1}
    while queue:
        u = queue.popleft()
        vis.remove(u)
        for v, w in nxt[u]:
            if d[u] + w < d[v]:
                d[v] = d[u] + w
                if v not in vis:
                    vis.add(v)
                    queue.append(v)
    res = max(d)
    return res if res != float('inf') else -1
```
时间复杂度 O(E*V)，80 ms

### #4 Dijkstra 朴素

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    nxt = defaultdict(list)
    for u, v, w in times:
        nxt[u-1].append((v-1, w))
    d, Q = [float('inf')] * n, set(range(n))
    d[k-1] = 0
    while Q:
        u = min(Q, key=d.__getitem__)
        Q.remove(u)
        for v, w in nxt[u]:
            if v in Q:
                d[v] = min(d[v], d[u] + w)
    res = max(d)
    return res if res != float('inf') else -1
```
时间复杂度 O(V^2)，84 ms
