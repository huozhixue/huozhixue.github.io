# 1976：到达目的地的方案数（★★）


> **第 59 场双周赛第 3 题**

## 题目

你在一个城市里，城市由 n 个路口组成，路口编号为 0 到 n - 1 ，某些路口之间有 双向 道路。
输入保证你可以从任意路口出发到达其他任意路口，且任意两个路口之间最多有一条路。

给你一个整数 n 和二维整数数组 roads ，其中 roads[i] = [ui, vi, timei] 表示在路口 ui 和 vi 之间
有一条需要花费 timei 时间才能通过的道路。你想知道花费 最少时间 从路口 0 出发到达路口 n - 1 的方案数。

请返回花费 最少时间 到达目的地的 路径数目 。由于答案可能很大，将结果对 10^9 + 7 取余 后返回。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/07/17/graph2.png)

    输入：n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
    输出：4
    解释：从路口 0 出发到路口 6 花费的最少时间是 7 分钟。
    四条花费 7 分钟的路径分别为：
    - 0 ➝ 6
    - 0 ➝ 4 ➝ 6
    - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
    - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
示例 2：

    输入：n = 2, roads = [[1,0,10]]
    输出：1
    解释：只有一条从路口 0 到路口 1 的路，花费 10 分钟。
 

提示：
- 1 <= n <= 200
- n - 1 <= roads.length <= n * (n - 1) / 2
- roads[i].length == 3
- 0 <= ui, vi <= n - 1
- 1 <= timei <= 10^9
- ui != vi
- 任意两个路口之间至多有一条路。
- 从任意路口出发，你能够到达其他任意路口。

 

## 分析

可以先用 dijkstra 求出所有节点到 n-1 的最短时间 dis。

然后假如节点 u 和 v 相邻，权重 w，且 dis[u]-w=dis[v]，连一条有向边 <u, v>，
问题转为求新的有向无环图中 0 到 n-1 的路径。显然可以动态规划递推。

> 注意到 dijkstra 出堆节点的顺序和动态规划中递推的顺序其实是一致的，因此可以同时进行。

## 解答

```python
def countPaths(self, n: int, roads: List[List[int]]) -> int:
    nxt = defaultdict(list)
    for u, v, w in roads:
        nxt[u].append((v, w))
        nxt[v].append((u, w))
    dp, mod = Counter({n-1: 1}), 10**9+7
    d, pq = {}, [(0, n-1)]
    while pq:
        w, u = heappop(pq)
        if u in d:
            continue
        d[u] = w
        for v, w2 in nxt[u]:
            if v not in d:
                heappush(pq, (w+w2, v))
            elif d[u]-w2==d[v]:
                dp[u] += dp[v]
                dp[u] %= mod
    return dp[0]
```
120 ms

