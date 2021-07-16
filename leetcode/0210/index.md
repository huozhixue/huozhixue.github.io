# 0210：课程表 II（★★）


## 题目

现在你总共有 n 门课需要选，记为 0 到 n-1。

在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，
我们用一个匹配来表示他们: [0,1]

给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。

可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。

说明: 你可以假定输入的先决条件中没有重复的边。

<!--more--> 

示例 1:

	输入: 2, [[1,0]] 
	输出: [0,1]
	解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。

示例 2:

	输入: 4, [[1,0],[2,0],[3,1],[3,2]]
	输出: [0,1,2,3] or [0,2,1,3]
	解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
	     因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。

## 分析

### #1

类似 {{< lc "0207" >}}，参考算法导论的拓扑排序，用三种颜色表示顶点状态，顶点为黑色时添加到结果中。
最后再将结果倒序即可。

```python
def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    def dfs(u):
        color[u] = 'grey'
        for v in nxt[u]:
            if color[v] == 'white':
                dfs(v)
            elif color[v] == 'grey':
                self.valid = False
            if not self.valid:
                return
        color[u] = 'black'
        res.append(u)

    nxt, color = defaultdict(list), ['white'] * numCourses
    for v, u in prerequisites:
        nxt[u].append(v)
    res, self.valid = [], True
    for u in range(numCourses):
        if self.valid and color[u] == 'white':
            dfs(u)
    return res[::-1] if self.valid else []
```

60 ms

### #2

也可以用 bfs，将弹出的顶点保存即可。

## 解答

```python
def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    nxt, indeg = defaultdict(list), [0] * numCourses
    for v, u in prerequisites:
        nxt[u].append(v)
        indeg[v] += 1
    res, queue = [], deque([u for u in range(numCourses) if indeg[u] == 0])
    while queue:
        u = queue.popleft()
        res.append(u)
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return res if len(res) == numCourses else []
```

56 ms

