# 0310：最小高度树（★★★）


## 题目

树是一个无向图，其中任何两个顶点只通过一条路径连接。 换句话说，一个任何没有简单环路的连通图都是一棵树。

给你一棵包含 n 个节点的树，标记为 0 到 n - 1 。给定数字 n 和一个有 n - 1 条无向边的 edges 列表（每一个边都是一对标签），
其中 edges[i] = [ai, bi] 表示树中节点 ai 和 bi 之间存在一条无向边。

可选择树中任何一个节点作为根。当选择节点 x 作为根节点时，设结果树的高度为 h 。
在所有可能的树中，具有最小高度的树（即，min(h)）被称为 最小高度树 。

请你找到所有的 最小高度树 并按 任意顺序 返回它们的根节点标签列表。

树的 高度 是指根节点和叶子节点之间最长向下路径上边的数量。

提示：

- 1 <= n <= 2 * 10^4
- edges.length == n - 1
- 0 <= ai, bi < n
- ai != bi
- 所有 (ai, bi) 互不相同
- 给定的输入 保证 是一棵树，并且 不会有重复的边


<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/01/e1.jpg)

	输入：n = 4, edges = [[1,0],[1,2],[1,3]]
	输出：[1]
	解释：如图所示，当根是标签为 1 的节点时，树的高度是 1 ，这是唯一的最小高度树。

示例 2：

![img](https://assets.leetcode.com/uploads/2020/09/01/e2.jpg)

	输入：n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
	输出：[3,4]

示例 3：

	输入：n = 1, edges = []
	输出：[0]

示例 4：

	输入：n = 2, edges = [[0,1]]
	输出：[0,1]


## 分析

本题是拓扑排序的变种。从最外层的叶子节点向里面广度遍历，最里面的一层即是所求。

具体实现时，先将所有入度为 1 的顶点入队。然后每轮弹出队列所有顶点，将所有后继顶点的入度减 1，
并将其中所有入度为 0 的顶点入队。循环直到队空，最后一轮的队列即为所求。

注意 n=1 的特殊情况。

## 解答

```python
def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
    nxt, indeg = defaultdict(list), [0] * n
    for u, v in edges:
        nxt[u].append(v)
        nxt[v].append(u)
        indeg[u] += 1
        indeg[v] += 1
    res, queue = [], [u for u in range(n) if indeg[u] == 1]
    while queue:
        res, tmp = queue, []
        for u in queue:
            for v in nxt[u]:
                indeg[v] -= 1
                if indeg[v] == 1:
                    tmp.append(v)
        queue = tmp
    return res if n > 1 else [0]
```

80 ms

