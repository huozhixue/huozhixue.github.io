# 0802：找到最终的安全状态（★★）



## 题目

在有向图中，从某个节点和每个转向处开始出发，沿着图的有向边走。
如果到达的节点是终点（即它没有连出的有向边），则停止。

如果从起始节点出发，最后必然能走到终点，就认为起始节点是 最终安全 的。
更具体地说，对于最终安全的起始节点而言，存在一个自然数 k ，无论选择沿哪条有向边行走 ，
走了不到 k 步后必能停止在一个终点上。

返回一个由图中所有最终安全的起始节点组成的数组作为答案。答案数组中的元素应当按 升序 排列。

该有向图有 n 个节点，按 0 到 n - 1 编号，其中 n 是 graph 的节点数。
图以下述形式给出：graph[i] 是编号 j 节点的一个列表，满足 (i, j) 是图的一条有向边。

提示：

- n == graph.length
- 1 <= n <= 10^4
- 0 <= graph[i].legnth <= n
- graph[i] 按严格递增顺序排列。
- 图中可能包含自环。
- 图中边的数目在范围 [1, 4 * 10^4] 内。


 <!--more--> 
 
示例 1：

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/03/17/picture1.png)

    输入：graph = [[1,2],[2,3],[5],[0],[5],[],[]]
    输出：[2,4,5,6]
    解释：示意图如上。

示例 2：

    输入：graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
    输出：[4]
     
## 分析

### #1

可以用 dfs，参考算法导论的 dfs，用三种颜色表示顶点状态。
遇到灰色顶点时说明有环，提前退出递归，那么最后是黑色的顶点就是安全的。


```python
def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
    def dfs(u):
        color[u] = 'grey'
        for v in graph[u]:
            if color[v] == 'white':
                dfs(v)
            elif color[v] == 'grey':
                self.valid = False
            if not self.valid:
                return
        color[u] = 'black'
        res.append(u)

    res, n = [], len(graph)
    nxt, color = defaultdict(list), ['white'] * n
    for u in range(n):
        if color[u] == 'white':
            self.valid = True
            dfs(u)
    return sorted(res)
```

160 ms

### #2

还有个巧妙的想法。显然出度为 0 的顶点可以作为终点，从终点往前遍历，不在环中的都是安全的。
问题就等价于反向做一次拓扑排序。

## 解答

```python
def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
    n = len(graph)
    nxt, indeg = defaultdict(list), [0] * n
    for v in range(n):
        for u in graph[v]:
            nxt[u].append(v)
            indeg[v] += 1
    res, queue = [], deque(u for u in range(n) if indeg[u]==0)
    while queue:
        u = queue.popleft()
        res.append(u)
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return sorted(res)
```
212 ms

