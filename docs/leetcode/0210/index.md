# 0210：课程表 II（★）


> <u>**[力扣第 210 题](https://leetcode.cn/problems/course-schedule-ii/)**</u>

## 题目

<p>现在你总共有 <code>numCourses</code> 门课需要选，记为 <code>0</code> 到 <code>numCourses - 1</code>。给你一个数组 <code>prerequisites</code> ，其中 <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> ，表示在选修课程 <code>a<sub>i</sub></code> 前 <strong>必须</strong> 先选修 <code>b<sub>i</sub></code> 。</p>

<ul>
<li>例如，想要学习课程 <code>0</code> ，你需要先完成课程 <code>1</code> ，我们用一个匹配来表示：<code>[0,1]</code> 。</li>
</ul>

<p>返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 <strong>任意一种</strong> 就可以了。如果不可能完成所有课程，返回 <strong>一个空数组</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>numCourses = 2, prerequisites = [[1,0]]
<strong>输出：</strong>[0,1]
<strong>解释：</strong>总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 <code>[0,1] 。</code>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
<strong>输出：</strong>[0,2,1,3]
<strong>解释：</strong>总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
因此，一个正确的课程顺序是 <code>[0,1,2,3]</code> 。另一个正确的排序是 <code>[0,2,1,3]</code> 。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>numCourses = 1, prerequisites = []
<strong>输出：</strong>[0]
</pre>


<strong>提示：</strong>

<ul>
<li><code>1 &lt;= numCourses &lt;= 2000</code></li>
<li><code>0 &lt;= prerequisites.length &lt;= numCourses * (numCourses - 1)</code></li>
<li><code>prerequisites[i].length == 2</code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>
<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
<li>所有<code>[a<sub>i</sub>, b<sub>i</sub>]</code> <strong>互不相同</strong></li>
</ul>


**相似问题：**
- [0207：课程表](/leetcode/0207)
- [0269：火星词典](/leetcode/0269)
- [0310：最小高度树](/leetcode/0310)
- [0444：序列重建](/leetcode/0444)
- [0630：课程表 III](/leetcode/0630)
- [1136：并行课程（1710 分）](/leetcode/1136)
- [2115：从给定原材料中找到所有可以做出的菜（1678 分）](/leetcode/2115)
- [2392：给定条件下构造矩阵（1960 分）](/leetcode/2392)
- [2459：通过移动项目到空白区域来排序数组](/leetcode/2459)


## 分析

类似 {{< lc "0207" >}}，保存出队节点即可。

## 解答

```python
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        n = numCourses
        g = [[] for _ in range(n)]
        ind = [0]*n
        for u,v in prerequisites:
            g[v].append(u)
            ind[u] += 1
        Q = deque(u for u in range(n) if ind[u]==0)
        res = []
        while Q:
            u = Q.popleft()
            res.append(u)
            for v in g[u]:
                ind[v] -= 1
                if ind[v]==0:
                    Q.append(v)
        return res if len(res)==n else []
```
37 ms

