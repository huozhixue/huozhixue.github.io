# 0261：以图判树（★★）


## 题目

给定编号从 0 到 n - 1 的 n 个结点。给定一个整数 n 和一个 edges 列表，
其中 edges[i] = [ai, bi] 表示图中节点 ai 和 bi 之间存在一条无向边。

如果这些边能够形成一个合法有效的树结构，则返回 true ，否则返回 false 。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/12/tree1-graph.jpg)

	输入: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
	输出: true

示例 2:

![img](https://assets.leetcode.com/uploads/2021/03/12/tree2-graph.jpg)

	输入: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
	输出: false
 

提示：
- 1 <= n <= 2000
- 0 <= edges.length <= 5000
- edges[i].length == 2
- 0 <= ai, bi < n
- ai != bi
- 不存在自循环或重复的边


## 分析

只要所有点连通且没有环，即是一棵树。用并查集判断即可。

## 解答

```python
def validTree(self, n: int, edges: List[List[int]]) -> bool:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]
    
    def union(x, y):
        f[find(x)] = find(y)
    
    if len(edges) != n-1:
        return False
    f = list(range(n))
    for u, v in edges:
        if find(u)==find(v):
            return False
        union(u, v)
    return True
```
40 ms
