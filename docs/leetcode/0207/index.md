# 0207：课程表（★）


> <u>**[力扣第 207 题](https://leetcode.cn/problems/course-schedule/)**</u>

## 题目

<p>你这个学期必须选修 <code>numCourses</code> 门课程，记为 <code>0</code> 到 <code>numCourses - 1</code> 。</p>

<p>在选修某些课程之前需要一些先修课程。 先修课程按数组 <code>prerequisites</code> 给出，其中 <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> ，表示如果要学习课程 <code>a<sub>i</sub></code> 则 <strong>必须</strong> 先学习课程  <code>b<sub>i</sub></code><sub> </sub>。</p>

<ul>
<li>例如，先修课程对 <code>[0, 1]</code> 表示：想要学习课程 <code>0</code> ，你需要先完成课程 <code>1</code> 。</li>
</ul>

<p>请你判断是否可能完成所有课程的学习？如果可以，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>numCourses = 2, prerequisites = [[1,0]]
<strong>输出：</strong>true
<strong>解释：</strong>总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>numCourses = 2, prerequisites = [[1,0],[0,1]]
<strong>输出：</strong>false
<strong>解释：</strong>总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= numCourses <= 10<sup>5</sup></code></li>
<li><code>0 <= prerequisites.length <= 5000</code></li>
<li><code>prerequisites[i].length == 2</code></li>
<li><code>0 <= a<sub>i</sub>, b<sub>i</sub> < numCourses</code></li>
<li><code>prerequisites[i]</code> 中的所有课程对 <strong>互不相同</strong></li>
</ul>


## 分析

典型的拓扑排序，等价于判断有向图中是否有环。

一般用 bfs 实现，更容易理解：
- 初始将所有入度为 0 的顶点入队
- 每轮弹出队首顶点，将所有后继顶点的入度减一，入度变为 0 的顶点入队
- 循环直到队空，判断弹出的顶点个数是否等于 numCourses 即可

## 解答

```python
def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
    n = numCourses
    nxt, indeg = defaultdict(list), [0]*n
    for v, u in prerequisites:
        nxt[u].append(v)
        indeg[v] += 1
    res, Q = 0, deque(u for u in range(n) if indeg[u]==0)
    while Q:
        u = Q.popleft()
        res += 1
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                Q.append(v)
    return res==n
```
48 ms


