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


## 分析

遍历时关心的状态其实是 (节点 u, 访问过的节点集合 s) 二元组。那么类似 {{< lc "0787" >}}，可以构造新图。

对于原边 <u, v>，从 (u, s) 到 (u, s|{v}) 连有向边，权重 1。
问题转为在新图中求任意 (u, {u}) 到任意 (v, 所有节点集合) 的最短路。

因为边的权重相等，所以可以用 bfs 解决。具体实现时不需要真的构造出新图。

> 注意 set 类型不能作为哈希的键，因此考虑用状态压缩来表示节点集合。

## 解答

```python
def shortestPathLength(self, graph: List[List[int]]) -> int:
    n = len(graph)
    queue = deque([(0, u, 1<<u) for u in range(n)])
    vis = {(u, 1<<u) for u in range(n)}
    while queue:
        w, u, s = queue.popleft()
        if s == (1<<n)-1:
            return w
        for v in graph[u]:
            s2 = s|(1<<v)
            if (v, s2) not in vis:
                vis.add((v, s2))
                queue.append((w+1, v, s2))
```
180 ms

