# 0787：K 站中转内最便宜的航班（★★）


> **第  场周赛第  题**

## 题目

有 n 个城市通过 m 个航班连接。每个航班都从城市 u 开始，以价格 w 抵达 v。

现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到从 src 到 dst 最多经过 k 站中转的最便宜的价格。 
如果没有这样的路线，则输出 -1。

 
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

提示：
- n 范围是 [1, 100]，城市标签从 0 到 n - 1
- 航班数量范围是 [0, n * (n - 1) / 2]
- 每个航班的格式 (src, dst, price)
- 每个航班的价格范围是 [1, 10000]
- k 范围是 [0, n - 1]
- 航班没有重复，且不存在自环

## 分析

### #1

限制了路径长度的可以先考虑动态规划。

用 dp[i][j] 代表从 src 到 i 最多飞 j 次的最低价格，即可递推。
	

```python
def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    dp = [[float('inf')]*(k+2) for _ in range(n)]
    dp[src] = [0] * (k+2)
    for j in range(k+1):
        for u, v, w in flights:
            dp[v][j+1] = min(dp[v][j+1], dp[u][j]+w)
    res = dp[dst][-1]
    return res if res < float('inf') else -1
```
228 ms

### #2

可以优化为一维数组。观察发现，这本质上就是 Bellman-Ford 算法。

> 区别在于必须保存上一轮的距离数组，保证每轮只多松弛一次

## 解答

```python
def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    dp = [float('inf')] * n
    dp[src] = 0
    for _ in range(k + 1):
        prev, flag = dp[:], True
        for u, v, w in flights:
            if prev[u]+w < dp[v]:
                dp[v] = prev[u]+w
                flag = False
        if flag:
            break
    res = dp[dst]
    return res if res < float('inf') else -1
```
52 ms

### *附加

还有个巧妙的解法。

将状态 (城市 u，飞行次数 c) 看作顶点，如果 c <k+1，那么对于航班 <u,v,w>，从 (u, c) 到 (v, c+1) 连有向边，权重 w。

问题即转为在新图中求 (src, 0) 到 (dst, 0<=c<=k+1) 的最短路，可以用 dijkstra 算法。
   
> 具体实现时不需要真的构造出新图。

## 解答

```python
def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    nxt = defaultdict(list)
    for u, v, w in flights:
        nxt[u].append((v, w))
    d, pq = {}, [(0, src, 0)]
    while pq:
        w, u, c = heappop(pq)
        if (u, c) in d:
            continue
        if u == dst:
            return w
        d[(u, c)] = w
        if c < k + 1:
            for v, w2 in nxt[u]:
                if (v, c+1) not in d:
                    heappush(pq, (w+w2, v, c+1))
    return -1
```
160 ms


