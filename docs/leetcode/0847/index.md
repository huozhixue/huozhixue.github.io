# 0847：访问所有节点的最短路径（★★）


> **第  场周赛第  题**

## 题目

存在一个由 n 个节点组成的无向连通图，图中的节点按从 0 到 n - 1 编号。

给你一个数组 graph 表示这个图。其中，graph[i] 是一个列表，由所有与节点 i 直接相连的节点组成。

返回能够访问所有节点的最短路径的长度。你可以在任一节点开始和停止，也可以多次重访节点，并且可以重用边。

提示：
- n == graph.length
- 1 <= n <= 12
- 0 <= graph[i].length < n
- graph[i] 不包含 i
- 如果 graph[a] 包含 b ，那么 graph[b] 也包含 a
- 输入的图总是连通图
 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/05/12/shortest1-graph.jpg)
    
    输入：graph = [[1,2,3],[0],[0],[0]]
    输出：4
    解释：一种可能的路径为 [1,0,2,0,3]

示例 2：

![img](https://assets.leetcode.com/uploads/2021/05/12/shortest2-graph.jpg)

    输入：graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
    输出：4
    解释：一种可能的路径为 [0,1,4,2,3]
 
 
## 分析

遍历时关心的状态其实是 (节点 u, 访问过的节点集合 s) 二元组。那么类似 {{< lc "0787" >}}，可以构造新图。

对于原边 <u, v>，从 (u, s) 到 (u, s|{v}) 连有向边，权重 1。
问题转为在新图中求任意 (u, {u}) 到任意 (v, 所有节点集合) 的最短路。

因为边的权重相等，所以可以用 bfs 解决。具体实现时不需要真的构造出新图。

> 注意 set 类型不能作为哈希的键，因此考虑用状态压缩来表示节点集合。

## 解答

```python
def shortestPathLength(self, graph: List[List[int]]) -> int:
    n = len(graph)
    queue = deque([(0, u, 1<<u) for u in range(n)])
    vis = {(u, 1<<u) for u in range(n)}
    while queue:
        w, u, s = queue.popleft()
        if s == (1<<n)-1:
            return w
        for v in graph[u]:
            s2 = s|(1<<v)
            if (v, s2) not in vis:
                vis.add((v, s2))
                queue.append((w+1, v, s2))
```
180 ms

