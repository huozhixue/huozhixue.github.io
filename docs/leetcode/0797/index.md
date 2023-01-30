# 0797：所有可能的路径（★★）


> **第 75 场双周赛第 2 题**

## 题目

给一个有 n 个结点的有向无环图，找到所有从 0 到 n-1 的路径并输出（不要求按顺序）

二维数组的第 i 个数组中的单元都表示有向图中 i 号结点所能到达的下一些结点
（译者注：有向图是有方向的，即规定了 a→b 你就不能从 b→a ）空就是没有下一个结点了。
 
示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/28/all_1.jpg)

	输入：graph = [[1,2],[3],[3],[]]
	输出：[[0,1,3],[0,2,3]]
	解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/09/28/all_2.jpg)

	输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
	输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

示例 3：

	输入：graph = [[1],[]]
	输出：[[0,1]]

示例 4：

	输入：graph = [[1,2,3],[2],[3],[]]
	输出：[[0,1,2,3],[0,2,3],[0,3]]
	
示例 5：

	输入：graph = [[1,3],[2],[3],[]]
	输出：[[0,1,2,3],[0,3]]


## 分析

因为无环，所以可以直接递归。

## 解答

```python
def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
	def dfs(i):
		if i==n-1:
			return [[n-1]]
		return [[i]+path for j in graph[i] for path in dfs(j)]

	n = len(graph)
	return dfs(0)
```
72 ms

