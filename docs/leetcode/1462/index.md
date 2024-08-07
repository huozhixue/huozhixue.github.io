# 1462：课程表 IV（1692 分）


> <u>**[力扣第 27 场双周赛第 3 题](https://leetcode.cn/problems/course-schedule-iv/)**</u>

## 题目

<p>你总共需要上<meta charset="UTF-8" /> <code>numCourses</code> 门课，课程编号依次为 <code>0</code> 到 <code>numCourses-1</code> 。你会得到一个数组 <code>prerequisite</code> ，其中<meta charset="UTF-8" /> <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> 表示如果你想选<meta charset="UTF-8" /> <code>b<sub>i</sub></code> 课程，你<strong> 必须</strong> 先选<meta charset="UTF-8" /> <code>a<sub>i</sub></code> 课程。</p>

<ul>
<li>有的课会有直接的先修课程，比如如果想上课程 <code>1</code> ，你必须先上课程 <code>0</code> ，那么会以 <code>[0,1]</code> 数对的形式给出先修课程数对。</li>
</ul>

<p>先决条件也可以是 <strong>间接</strong> 的。如果课程 <code>a</code> 是课程 <code>b</code> 的先决条件，课程 <code>b</code> 是课程 <code>c</code> 的先决条件，那么课程 <code>a</code> 就是课程 <code>c</code> 的先决条件。</p>

<p>你也得到一个数组<meta charset="UTF-8" /> <code>queries</code> ，其中<meta charset="UTF-8" /> <code>queries[j] = [u<sub>j</sub>, v<sub>j</sub>]</code>。对于第 <code>j</code> 个查询，您应该回答课程<meta charset="UTF-8" /> <code>u<sub>j</sub></code> 是否是课程<meta charset="UTF-8" /> <code>v<sub>j</sub></code> 的先决条件。</p>

<p>返回一个布尔数组 <code>answer</code> ，其中 <code>answer[j]</code> 是第 <code>j</code> 个查询的答案。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/05/01/courses4-1-graph.jpg" /></p>

<pre>
<strong>输入：</strong>numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
<strong>输出：</strong>[false,true]
<strong>解释：</strong>课程 0 不是课程 1 的先修课程，但课程 1 是课程 0 的先修课程。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]
<strong>输出：</strong>[false,false]
<strong>解释：</strong>没有先修课程对，所以每门课程之间是独立的。
</pre>

<p><strong>示例 3：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/05/01/courses4-3-graph.jpg" /></p>

<pre>
<strong>输入：</strong>numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
<strong>输出：</strong>[true,true]
</pre>



<p><strong>提示：</strong></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>2 &lt;= numCourses &lt;= 100</code></li>
<li><code>0 &lt;= prerequisites.length &lt;= (numCourses * (numCourses - 1) / 2)</code></li>
<li><code>prerequisites[i].length == 2</code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n - 1</code></li>
<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
<li>每一对<meta charset="UTF-8" /> <code>[a<sub>i</sub>, b<sub>i</sub>]</code> 都 <strong>不同</strong></li>
<li>先修课程图中没有环。</li>
<li><code>1 &lt;= queries.length &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>
<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>
</ul>




## 分析

有向无环图，可以直接递归求课程 u 的所有先决条件。


## 解答

```python
def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
    @lru_cache(None)
    def dfs(u):
        return reduce(or_, [dfs(v) for v in nxt[u]], set(nxt[u]))
    
    nxt = defaultdict(list)
    for v, u in prerequisites:
        nxt[u].append(v)
    return [u in dfs(v) for u, v in queries]
```
108 ms


