# 0207：课程表（★★）


## 题目

你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，
其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

提示：

- 1 <= numCourses <= 10^5
- 0 <= prerequisites.length <= 5000
- prerequisites[i].length == 2
- 0 <= ai, bi < numCourses
- prerequisites[i] 中的所有课程对 互不相同


<!--more--> 

示例 1：

	输入：numCourses = 2, prerequisites = [[1,0]]
	输出：true
	解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。

示例 2：

	输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
	输出：false
	解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。


## 分析

### #1

典型的拓扑排序，等价于判断有向图中是否有环。

可以用 dfs，参考算法导论的 dfs，用三种颜色表示顶点状态。

```python
def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
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

    nxt, color = defaultdict(list), ['white'] * numCourses
    for v, u in prerequisites:
        nxt[u].append(v)
    self.valid = True
    for u in range(numCourses):
        if self.valid and color[u] == 'white':
            dfs(u)
    return self.valid
```

48 ms

### #2

也可以用 bfs。先将所有入度为 0 的顶点入队。然后每轮弹出队首顶点，将所有后继顶点的入度减一，并将其中所有
入度为 0 的顶点入队。循环直到队空，判断弹出的顶点个数是否等于 numCourses 即可。


## 解答

```python
def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
    nxt, indeg = defaultdict(list), [0] * numCourses
    for v, u in prerequisites:
        nxt[u].append(v)
        indeg[v] += 1
    cnt, queue = 0, deque([u for u in range(numCourses) if indeg[u]==0])
    while queue:
        u = queue.popleft()
        cnt += 1
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return cnt == numCourses
```

48 ms


