# 0847：访问所有节点的最短路径（2200 分）


> <u>**[力扣第 87 场周赛第 4 题](https://leetcode.cn/problems/shortest-path-visiting-all-nodes/)**</u>

## 题目

<p>存在一个由 <code>n</code> 个节点组成的无向连通图，图中的节点按从 <code>0</code> 到 <code>n - 1</code> 编号。</p>

<p>给你一个数组 <code>graph</code> 表示这个图。其中，<code>graph[i]</code> 是一个列表，由所有与节点 <code>i</code> 直接相连的节点组成。</p>

<p>返回能够访问所有节点的最短路径的长度。你可以在任一节点开始和停止，也可以多次重访节点，并且可以重用边。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/12/shortest1-graph.jpg" style="width: 222px; height: 183px;" />
<pre>
<strong>输入：</strong>graph = [[1,2,3],[0],[0],[0]]
<strong>输出：</strong>4
<strong>解释：</strong>一种可能的路径为 [1,0,2,0,3]</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/05/12/shortest2-graph.jpg" style="width: 382px; height: 222px;" /></p>

<pre>
<strong>输入：</strong>graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
<strong>输出：</strong>4
<strong>解释：</strong>一种可能的路径为 [0,1,4,2,3]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == graph.length</code></li>
<li><code>1 &lt;= n &lt;= 12</code></li>
<li><code>0 &lt;= graph[i].length &lt; n</code></li>
<li><code>graph[i]</code> 不包含 <code>i</code></li>
<li>如果 <code>graph[a]</code> 包含 <code>b</code> ，那么 <code>graph[b]</code> 也包含 <code>a</code></li>
<li>输入的图总是连通图</li>
</ul>


**相似问题：**
- [3149：找出分数最低的排列（2641 分）](/leetcode/3149)


## 分析

- 典型的 bfs，维护状态 <节点 u, 访问过的节点集合 st> 即可
- 注意 set 类型不能作为哈希的键，将节点集合状态压缩成一个数即可

## 解答

```python
class Solution:
    def shortestPathLength(self, graph: List[List[int]]) -> int:
        n = len(graph)
        dq = deque([(0,i,1<<i) for i in range(n)])
        vis = [[0]*(1<<n) for _ in range(n)]
        for i in range(n):
            vis[i][1<<i] = 1
        while dq:
            w,i,u = dq.popleft()
            if u==(1<<n)-1:
                return w
            for j in graph[i]:
                v = u|1<<j
                if not vis[j][v]:
                    dq.append((w+1,j,v))
                    vis[j][v] = 1
```
55 ms

