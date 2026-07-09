# 2699：修改图中的边权（2873 分）


> <u>**[力扣第 346 场周赛第 4 题](https://leetcode.cn/problems/modify-graph-edge-weights/)**</u>

## 题目

<p>给你一个 <code>n</code> 个节点的 <strong>无向带权连通</strong> 图，节点编号为 <code>0</code> 到 <code>n - 1</code> ，再给你一个整数数组 <code>edges</code> ，其中 <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>, w<sub>i</sub>]</code> 表示节点 <code>a<sub>i</sub></code> 和 <code>b<sub>i</sub></code> 之间有一条边权为 <code>w<sub>i</sub></code> 的边。</p>

<p>部分边的边权为 <code>-1</code>（<code>w<sub>i</sub> = -1</code>），其他边的边权都为 <strong>正</strong> 数（<code>w<sub>i</sub> &gt; 0</code>）。</p>

<p>你需要将所有边权为 <code>-1</code> 的边都修改为范围 <code>[1, 2 * 10<sup>9</sup>]</code> 中的 <strong>正整数</strong> ，使得从节点 <code>source</code> 到节点 <code>destination</code> 的 <strong>最短距离</strong> 为整数 <code>target</code> 。如果有 <strong>多种</strong> 修改方案可以使 <code>source</code> 和 <code>destination</code> 之间的最短距离等于 <code>target</code> ，你可以返回任意一种方案。</p>

<p>如果存在使 <code>source</code> 到 <code>destination</code> 最短距离为 <code>target</code> 的方案，请你按任意顺序返回包含所有边的数组（包括未修改边权的边）。如果不存在这样的方案，请你返回一个 <strong>空数组</strong> 。</p>

<p><strong>注意：</strong>你不能修改一开始边权为正数的边。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2023/04/18/graph.png" style="width: 300px; height: 300px;" /></strong></p>

<pre>
<b>输入：</b>n = 5, edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], source = 0, destination = 1, target = 5
<b>输出：</b>[[4,1,1],[2,0,1],[0,3,3],[4,3,1]]
<b>解释：</b>上图展示了一个满足题意的修改方案，从 0 到 1 的最短距离为 5 。
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2023/04/18/graph-2.png" style="width: 300px; height: 300px;" /></strong></p>

<pre>
<b>输入：</b>n = 3, edges = [[0,1,-1],[0,2,5]], source = 0, destination = 2, target = 6
<b>输出：</b>[]
<b>解释：</b>上图是一开始的图。没有办法通过修改边权为 -1 的边，使得 0 到 2 的最短距离等于 6 ，所以返回一个空数组。
</pre>

<p><strong>示例 3：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2023/04/19/graph-3.png" style="width: 300px; height: 300px;" /></strong></p>

<pre>
<b>输入：</b>n = 4, edges = [[1,0,4],[1,2,3],[2,3,5],[0,3,-1]], source = 0, destination = 2, target = 6
<b>输出：</b>[[1,0,4],[1,2,3],[2,3,5],[0,3,1]]
<b>解释：</b>上图展示了一个满足题意的修改方案，从 0 到 2 的最短距离为 6 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 100</code></li>
<li><code>1 &lt;= edges.length &lt;= n * (n - 1) / 2</code></li>
<li><code>edges[i].length == 3</code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i </sub>&lt; n</code></li>
<li><code>w<sub>i</sub> = -1</code> 或者 <code>1 &lt;= w<sub>i </sub>&lt;= 10<sup><span style="">7</span></sup></code></li>
<li><code>a<sub>i </sub>!= b<sub>i</sub></code></li>
<li><code>0 &lt;= source, destination &lt; n</code></li>
<li><code>source != destination</code></li>
<li><code>1 &lt;= target &lt;= 10<sup>9</sup></code></li>
<li>输入的图是连通图，且没有自环和重边。</li>
</ul>




## 分析

- 先给所有-1边赋权1，跑一趟最短路得到 d[v] 代表终点 e 到 v 的最短距离，这也是理论上的最短距离
	- 如果 d[s]>target，显然不存在解
- 假设 s 到 e 的最短路径上第一个-1边是 (u,v)，显然可以增大该边权，使得该路径总和为target
- 但修改后该路径不一定是最短路径了，需要继续修改剩下的最短路径
- 因此再从 s 出发，边跑最短路，边修改-1边，这样修改后不影响之前的最短路径，接着跑最短路即可，可以一趟解决

## 解答


```python []
class Solution:
    def modifiedGraphEdges(self, n: int, edges: List[List[int]], source: int, destination: int, target: int) -> List[List[int]]:
        def push(w,u,d):
            if w<d[u]:
                d[u] = w
                heappush(pq,(w,u))
        
        E = edges
        s,e,t = source,destination,target
        g = [[] for _ in range(n)]
        for i,(u,v,w) in enumerate(E):
            g[u].append((v,i))
            g[v].append((u,i))
        pq = [(0,e)]
        d = [inf]*n
        d[e] = 0
        while pq:
            w,u = heappop(pq)
            if w>d[u]:
                continue
            for v,i in g[u]:
                w2 = max(1,E[i][2])
                push(w+w2,v,d)
        if d[s]>t:
            return []
        pq = [(0,s)]
        f = [inf]*n
        f[s] = 0
        while pq:
            w,u = heappop(pq)
            if w>f[u]:
                continue
            for v,i in g[u]:
                w2 = E[i][2]
                if w2==-1:
                    w2 = max(1,t-f[u]-d[v])
                    E[i][2] = w2
                push(w+w2,v,f)
        return E if f[e]==t else []
```
283 ms

