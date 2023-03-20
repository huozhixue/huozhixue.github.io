# 0323：无向图中连通分量的数目（★）


## 题目

你有一个包含 n 个节点的图。给定一个整数 n 和一个数组 edges ，其中 edges[i] = [ai, bi] 
表示图中 ai 和 bi 之间有一条边。

返回 图中已连接分量的数目 。

 
示例 1:

![img](https://assets.leetcode.com/uploads/2021/03/14/conn1-graph.jpg)

	输入: n = 5, edges = [[0, 1], [1, 2], [3, 4]]
	输出: 2

示例 2:

![img](https://assets.leetcode.com/uploads/2021/03/14/conn2-graph.jpg)

	输入: n = 5, edges = [[0,1], [1,2], [2,3], [3,4]]
	输出:  1
 

提示：
- 1 <= n <= 2000
- 1 <= edges.length <= 5000
- edges[i].length == 2
- 0 <= ai <= bi < n
- ai != bi
- edges 中不会出现重复的边


## 分析

典型的并查集，最后计算块的个数即可。

## 解答

```python
def countComponents(self, n: int, edges: List[List[int]]) -> int:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    f = list(range(n))
    for u, v in edges:
        union(u, v)
    return len({find(x) for x in range(n)})
```
56 ms



