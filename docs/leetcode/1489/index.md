# 1489：找到最小生成树里的关键边和伪关键边（★★★）


> **第 194 场周赛第 4 题**

## 题目

给你一个 n 个点的带权无向连通图，节点编号为 0 到 n-1 ，同时还有一个数组 edges 
，其中 edges[i] = [fromi, toi, weighti] 表示在 fromi 和 toi 节点之间有一条带权无向边。
最小生成树 (MST) 是给定图中边的一个子集，它连接了所有节点且没有环，而且这些边的权值和最小。

请你找到给定图中最小生成树的所有关键边和伪关键边。如果从图中删去某条边，会导致最小生成树的权值和增加，
那么我们就说它是一条关键边。伪关键边则是可能会出现在某些最小生成树中但不会出现在所有最小生成树中的边。

请注意，你可以分别以任意顺序返回关键边的下标和伪关键边的下标。


示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/06/21/ex1.png)

    输入：n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
    输出：[[0,1],[2,3,4,5]]
    解释：上图描述了给定图。
    下图是所有的最小生成树。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/06/21/msts.png)

    注意到第 0 条边和第 1 条边出现在了所有最小生成树中，所以它们是关键边，我们将这两个下标作为输出的第一个列表。
    边 2，3，4 和 5 是所有 MST 的剩余边，所以它们是伪关键边。我们将它们作为输出的第二个列表。

示例 2 ：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/06/21/ex2.png)

    输入：n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]
    输出：[[],[0,1,2,3]]
    解释：可以观察到 4 条边都有相同的权值，任选它们中的 3 条可以形成一棵 MST 。所以 4 条边都是伪关键边。
 

提示：
- 2 <= n <= 100
- 1 <= edges.length <= min(200, n * (n - 1) / 2)
- edges[i].length == 3
- 0 <= fromi < toi < n
- 1 <= weighti <= 1000
- 所有 (fromi, toi) 数对都是互不相同的。


## 分析

先求出 MST 的代价 s。如果去掉某条边，不存在 MST 或者 s 变大，即说明是关键边。

如果先连某条边，s 不变，说明该边出现在 MST 中，那么它要么是关键边，要么是伪关键边。

## 解答

```python
def findCriticalAndPseudoCriticalEdges(self, n: int, edges: List[List[int]]) -> List[List[int]]:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)
    
    def cal(A):
        f[:], s, cnt = list(range(n)), 0, 0
        for w, u, v, idx in A:
            if find(u) != find(v):
                union(u, v)
                s += w
                cnt += 1
        return s if cnt==n-1 else float('inf')
    
    f, A = [], sorted((w,u,v,idx) for idx,(u,v,w) in enumerate(edges))
    s = cal(A)
    res1 = {A[i][-1] for i in range(len(A)) if cal(A[:i]+A[i+1:])>s}
    res2 = [e[-1] for e in A if e[-1] not in res1 and cal([e]+A)==s]
    return [list(res1), res2]
```
时间复杂度 O(M^2)，1132 ms

## *附加

本题还有更优的算法。

假设边的权重各不相同，那么显然生成 MST 的每一步都是确定的，MST 唯一。因此该唯一的 MST 中的都是关键边，不存在伪关键边。

存在相同权重的边时，情况复杂很多。假设生成 MST 的过程遍历到权重 w，权重等于 w 的边的集合是 A。
并设此时的并查集状态是 U0，将 A 的边都相连后的并查集状态是 U1。

那么 A 中的边有三种情况：

    假如边的两个顶点在 U0 状态下已连通，该边多余
    假如去掉该边后，U1 状态变化，该边是关键边
    否则该边是伪关键边
    
然后有个巧妙的想法，将 U0 状态下的连通块看作是点，将 A 的边都相连后得到一个图 G，那么 A 中的边的三种情况分别对应为：

    自环边，改边多余
    桥边，去掉改边后图 G 的连通性变化
    非桥边
  
求桥边可以用 tarjan 算法。

> 注意图 G 可能有重复边，所以用 tarjan 算法遍历时记录上一条边的 idx 而不是上一个节点。

```python
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        def union(x, y):
            f[find(x)] = find(y)

        def tarjan(p, fidx):
            dfn[p] = low[p] = self.t = self.t + 1
            for q, idx in nxt[p]:
                if q not in dfn:
                    tarjan(q, idx)
                    low[p] = min(low[p], low[q])
                    if low[q] > dfn[p]:
                        res2.remove(idx)
                        res1.add(idx)
                elif idx!=fidx:
                    low[p] = min(low[p], dfn[q])

        res1, res2 = set(), set()
        d = defaultdict(list)
        for idx, (u, v, w) in enumerate(edges):
            d[w].append((idx, u, v))
        f = list(range(n))
        for w in sorted(d):
            nxt = defaultdict(list)
            for idx, u, v in d[w]:
                fu, fv = find(u), find(v)
                if fu != fv:
                    res2.add(idx)
                    nxt[fu].append((fv, idx))
                    nxt[fv].append((fu, idx))
            dfn, low, self.t = {}, {}, 0
            for u in nxt:
                if u not in dfn:
                    tarjan(u, None)
            for u in nxt:
                for v, idx in nxt[u]:
                    union(u, v)
        return [list(res1), list(res2)]
```
时间复杂度 O(M*logM)，36 ms
    

