# 2203：得到要求路径的最小带权子图（★★★）


> **第  场周赛第 4 题**

## 题目

给你一个整数 n ，它表示一个 带权有向 图的节点数，节点编号为 0 到 n - 1 。

同时给你一个二维整数数组 edges ，其中 edges[i] = [fromi, toi, weighti] ，表示从 fromi 到 toi 有一条边权为
 weighti 的 有向 边。

最后，给你三个 互不相同 的整数 src1 ，src2 和 dest ，表示图中三个不同的点。

请你从图中选出一个 边权和最小 的子图，使得从 src1 和 src2 出发，在这个子图中，都 可以 到达 dest 。
如果这样的子图不存在，请返回 -1 。

子图 中的点和边都应该属于原图的一部分。子图的边权和定义为它所包含的所有边的权值之和。

 

示例 1：

    ![img](https://assets.leetcode.com/uploads/2022/02/17/example1drawio.png)
    
    输入：n = 6, edges = [[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], 
    src1 = 0, src2 = 1, dest = 5
    输出：9
    解释：
    上图为输入的图。
    蓝色边为最优子图之一。
    注意，子图 [[1,0,3],[0,5,6]] 也能得到最优解，但无法在满足所有限制的前提下，得到更优解。
示例 2：

![img](https://assets.leetcode.com/uploads/2022/02/17/example2-1drawio.png)
    
    输入：n = 3, edges = [[0,1,1],[2,1,1]], src1 = 0, src2 = 1, dest = 2
    输出：-1
    解释：
    上图为输入的图。
    可以看到，不存在从节点 1 到节点 2 的路径，所以不存在任何子图满足所有限制。
 

提示：
- 3 <= n <= 10^5
- 0 <= edges.length <= 10^5
- edges[i].length == 3
- 0 <= fromi, toi, src1, src2, dest <= n - 1
- fromi != toi
- src1 ，src2 和 dest 两两不同。
- 1 <= weight[i] <= 10^5

 
## 分析

最终的子图一定是三岔路的形式（可以反证），而且由三条最短路组成。

因此遍历每个节点 x，使三条最短路之和最小即可。

> 注意是求所有节点 x 到 dest 的最短路，而不是求 dest 到所有节点的最短路。
>一个巧妙的方法是将边全部反向，将问题转为求 dest 到所有节点的最短路。


## 解答

```python
def minimumWeight(self, n: int, edges: List[List[int]], src1: int, src2: int, dest: int) -> int:
    def dij(root, nxt):
        d, pq = defaultdict(lambda: float('inf')), [(0, root)]
        while pq:
            w, u = heappop(pq)
            if u in d:
                continue
            d[u] = w
            for v, w2 in nxt[u]:
                if v not in d:
                    heappush(pq, (w+w2, v))
        return d
    
    nxt1, nxt2 = defaultdict(list), defaultdict(list)
    for u, v, w in edges:
        nxt1[u].append((v, w))
        nxt2[v].append((u, w))
    d1 = dij(src1, nxt1)
    d2 = dij(src2, nxt1)
    d3 = dij(dest, nxt2)
    res = min(d1[i]+d2[i]+d3[i] for i in range(n))
    return res if res<float('inf') else -1
```
860 ms
