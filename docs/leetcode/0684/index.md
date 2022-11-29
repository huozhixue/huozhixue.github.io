# 0684：冗余连接（★★）


> **第  场周赛第  题**

## 题目

在本问题中, 树指的是一个连通且无环的无向图。

输入一个图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。
附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。

结果图是一个以边组成的二维数组。每一个边的元素是一对[u, v] ，满足 u < v，
表示连接顶点u 和v的无向图的边。

返回一条可以删去的边，使得结果图是一个有着N个节点的树。如果有多个答案，
则返回二维数组中最后出现的边。答案边 [u, v] 应满足相同的格式 u < v。

 
示例 1：

	输入: [[1,2], [1,3], [2,3]]
	输出: [2,3]
	解释: 给定的无向图为:
	  1
	 / \
	2 - 3
	
示例 2：

	输入: [[1,2], [2,3], [3,4], [1,4], [1,5]]
	输出: [1,4]
	解释: 给定的无向图为:
	5 - 1 - 2
		|   |
		4 - 3

 
## 分析

### #1

典型的并查集应用。遍历边，如果两个顶点已经连通则返回，否则就连通。

```python
def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    f = list(range(len(edges) + 1))
    for u, v in edges:
        if find(u) == find(v):
            return [u, v]
        union(u, v)
```
40 ms

### #2

也可以用拓扑排序。先将所有入度为 1 的顶点入队。然后每轮弹出队首顶点，将所有后继顶点的入度减一，
并将其中所有入度为 1 的顶点入队。循环直到队空，剩下的环中的顶点的入度都大于 1，
返回最后一条剩下的边即可。

## 解答

```python
def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
    n = len(edges)
    nxt, indeg = defaultdict(list), [0] * (n+1)
    for u, v in edges:
        nxt[u].append(v)
        nxt[v].append(u)
        indeg[u] += 1
        indeg[v] += 1
    queue = deque(u for u in range(1, n+1) if indeg[u]==1)
    while queue:
        u = queue.popleft()
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 1:
                queue.append(v)
    for u, v in edges[::-1]:
        if indeg[u] > 1 and indeg[v] > 1:
            return [u, v]
```
44 ms

