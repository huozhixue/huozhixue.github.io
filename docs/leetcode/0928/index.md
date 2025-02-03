# 0928：尽量减少恶意软件的传播 II（1985 分）


> <u>**[力扣第 107 场周赛第 4 题](https://leetcode.cn/problems/minimize-malware-spread-ii/)**</u>

## 题目

<p>给定一个由 <code>n</code> 个节点组成的网络，用 <code>n x n</code> 个邻接矩阵 <code>graph</code> 表示。在节点网络中，只有当 <code>graph[i][j] = 1</code> 时，节点 <code>i</code> 能够直接连接到另一个节点 <code>j</code>。</p>

<p>一些节点 <code>initial</code> 最初被恶意软件感染。只要两个节点直接连接，且其中至少一个节点受到恶意软件的感染，那么两个节点都将被恶意软件感染。这种恶意软件的传播将继续，直到没有更多的节点可以被这种方式感染。</p>

<p>假设 <code>M(initial)</code> 是在恶意软件停止传播之后，整个网络中感染恶意软件的最终节点数。</p>

<p>我们可以从 <code>initial</code> 中 <strong>删除一个节点</strong>，<strong>并完全移除该节点以及从该节点到任何其他节点的任何连接。</strong></p>

<p>请返回移除后能够使 <code>M(initial)</code> 最小化的节点。如果有多个节点满足条件，返回索引 <strong>最小的节点</strong> 。</p>



<ol>
</ol>

<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>graph = [[1,1,0],[1,1,0],[0,0,1]], initial = [0,1]
<strong>输出：</strong>0
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>graph = [[1,1,0],[1,1,1],[0,1,1]], initial = [0,1]
<strong>输出：</strong>1
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>graph = [[1,1,0,0],[1,1,1,0],[0,1,1,1],[0,0,1,1]], initial = [0,1]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>
<meta charset="UTF-8" />

<ul>
<li><code>n == graph.length</code></li>
<li><code>n == graph[i].length</code></li>
<li><code>2 &lt;= n &lt;= 300</code></li>
<li><code>graph[i][j]</code> 是 <code>0</code> 或 <code>1</code>.</li>
<li><code>graph[i][j] == graph[j][i]</code></li>
<li><code>graph[i][i] == 1</code></li>
<li><code>1 &lt;= initial.length &lt; n</code></li>
<li><code>0 &lt;= initial[i] &lt;= n - 1</code></li>
<li> <code>initial</code> 中每个整数都<strong>不同</strong></li>
</ul>




## 分析

- 与 {{< lc "0924" >}} 的区别在于删除恶意节点是完全删除
- 因此先考虑去掉所有恶意节点时的连通状态
- 然后考虑某一恶意节点 i，设其和某个连通块 a 相连
	- 假如 a 和不止一个恶意节点相连，删除 i 无意义
	- 假如 a 只和 i 一个恶意节点相连，删除 i 则 a 的节点都不会被感染
	- 遍历和 i 相连的所有连通块，即得到删除 i 后 M 的减少量
- 遍历恶意节点并比较即可
## 解答


```python
class Solution:
    def minMalwareSpread(self, graph: List[List[int]], initial: List[int]) -> int:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]
        
        def union(x,y):
            f[find(x)] = find(y)
        
        n = len(graph)
        f, vis = list(range(n)), set(initial)
        for i,j in product(range(n),range(n)):
            if graph[i][j] and i not in vis and j not in vis:
                union(i,j)
        sz,g = [0]*n,[set() for _ in range(n)]
        for i in range(n):
            if i not in vis:
                sz[find(i)] += 1
                g[find(i)] |= {j for j in vis if graph[i][j]}
        d = [0]*n
        for i in range(n):
            if len(g[i])==1:
                d[g[i].pop()] += sz[i]
        return max(sorted(initial),key=lambda i:d[i])
```
39 ms
