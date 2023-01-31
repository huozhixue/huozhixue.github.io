# 1786：从第一个节点出发到最后一个节点的受限路径数（★★★）


> **第 231 场周赛第 3 题**

## 题目

现有一个加权无向连通图。给你一个正整数 n ，表示图中有 n 个节点，并按从 1 到 n 给节点编号；另给你一个数组 edges ，
其中每个 edges[i] = [ui, vi, weighti] 表示存在一条位于节点 ui 和 vi 之间的边，这条边的权重为 weighti 。

从节点 start 出发到节点 end 的路径是一个形如 [z0, z1, z2, ..., zk] 的节点序列，满足 z0 = start 、zk = end 
且在所有符合 0 <= i <= k-1 的节点 zi 和 zi+1 之间存在一条边。

路径的距离定义为这条路径上所有边的权重总和。用 distanceToLastNode(x) 表示节点 n 和 x 之间路径的最短距离。
受限路径 为满足 distanceToLastNode(zi) > distanceToLastNode(zi+1) 的一条路径，其中 0 <= i <= k-1 。

返回从节点 1 出发到节点 n 的 受限路径数 。由于数字可能很大，请返回对 109 + 7 取余 的结果。

 

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/03/07/restricted_paths_ex1.png)

    输入：n = 5, edges = [[1,2,3],[1,3,3],[2,3,1],[1,4,2],[5,2,2],[3,5,1],[5,4,10]]
    输出：3
    解释：每个圆包含黑色的节点编号和蓝色的 distanceToLastNode 值。三条受限路径分别是：
    1) 1 --> 2 --> 5
    2) 1 --> 2 --> 3 --> 5
    3) 1 --> 3 --> 5
示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/03/07/restricted_paths_ex22.png)
    
    输入：n = 7, edges = [[1,3,1],[4,1,2],[7,3,4],[2,5,3],[5,6,1],[6,7,2],[7,5,3],[2,6,4]]
    输出：1
    解释：每个圆包含黑色的节点编号和蓝色的 distanceToLastNode 值。唯一一条受限路径是：1 --> 3 --> 7 。
 

提示：
- 1 <= n <= 2 * 10^4
- n - 1 <= edges.length <= 4 * 10^4
- edges[i].length == 3
- 1 <= ui, vi <= n
- ui != vi
- 1 <= weighti <= 105
- 任意两个节点之间至多存在一条边
- 任意两个节点之间至少存在一条路径


## 分析

显然可以用 dijkstra 先得到所有节点到 n 的最短距离 dis。

然后假如节点 u 和 v 相邻且 dis[u]>dis[v]，连一条有向边 <u, v>，问题转为求新的有向无环图中 1 到 n 的路径。
显然可以动态规划递推。

> 注意到 dijkstra 出堆节点的顺序和动态规划中递推的顺序其实是一致的，因此可以同时进行。

## 解答

```python
def countRestrictedPaths(self, n: int, edges: List[List[int]]) -> int:
    nxt = defaultdict(list)
    for u, v, w in edges:
        nxt[u].append((v, w))
        nxt[v].append((u, w))
    dp, mod = Counter({n: 1}), 10**9+7
    d, pq = {}, [(0, n)]
    while pq:
        w, u = heappop(pq)
        if u in d:
            continue
        d[u] = w
        for v, w2 in nxt[u]:
            if v not in d:
                heappush(pq, (w+w2, v))
            elif d[u]>d[v]:
                dp[u] += dp[v]
                dp[u] %= mod
    return dp[1]
```
560 ms


