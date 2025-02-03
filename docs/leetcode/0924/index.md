# 0924：尽量减少恶意软件的传播（1868 分）


> <u>**[力扣第 106 场周赛第 4 题](https://leetcode.cn/problems/minimize-malware-spread/)**</u>

## 题目

<p>给出了一个由 <code>n</code> 个节点组成的网络，用 <code>n × n</code> 个邻接矩阵图<meta charset="UTF-8" /> <code>graph</code> 表示。在节点网络中，当 <code>graph[i][j] = 1</code> 时，表示节点 <code>i</code> 能够直接连接到另一个节点 <code>j</code>。 </p>

<p>一些节点 <code>initial</code> 最初被恶意软件感染。只要两个节点直接连接，且其中至少一个节点受到恶意软件的感染，那么两个节点都将被恶意软件感染。这种恶意软件的传播将继续，直到没有更多的节点可以被这种方式感染。</p>

<p>假设 <code>M(initial)</code> 是在恶意软件停止传播之后，整个网络中感染恶意软件的最终节点数。</p>

<p>如果从 <code>initial</code> 中<strong>移除某一节点</strong>能够最小化 <code>M(initial)</code>， 返回该节点。如果有多个节点满足条件，就返回<strong>索引最小</strong>的节点。</p>

<p>请注意，如果某个节点已从受感染节点的列表 <code>initial</code> 中删除，它以后仍有可能因恶意软件传播而受到感染。</p>



<ol>
</ol>

<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>graph = [[1,1,0],[1,1,0],[0,0,1]], initial = [0,1]
<strong>输出：</strong>0
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>graph = [[1,0,0],[0,1,0],[0,0,1]], initial = [0,2]
<strong>输出：</strong>0
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>graph = [[1,1,1],[1,1,1],[1,1,1]], initial = [1,2]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>
<meta charset="UTF-8" />

<ul>
<li><code>n == graph.length</code></li>
<li><code>n == graph[i].length</code></li>
<li><code>2 &lt;= n &lt;= 300</code></li>
<li><code>graph[i][j] == 0</code> 或 <code>1</code>.</li>
<li><code>graph[i][j] == graph[j][i]</code></li>
<li><code>graph[i][i] == 1</code></li>
<li><code>1 &lt;= initial.length &lt;= n</code></li>
<li><code>0 &lt;= initial[i] &lt;= n - 1</code></li>
<li><code>initial</code> 中所有整数均<strong>不重复</strong></li>
</ul>




## 分析

- 典型的连通性问题
- 可以用 bfs/dfs/并查集 先得到连通块
- 移除某一恶意节点 i，设其所在连通块为 a
	- 假如 a 中有不止一个恶意节点，删除 i 无意义
	- 假如 a 只有 i 一个恶意节点，删除 i 减少的 M 即是 a 的节点个数
- 因此遍历恶意节点并比较即可
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
        f = list(range(n))
        for i,j in product(range(n),range(n)):
            if graph[i][j]:
                union(i, j)
        sz, sz2 = [0]*n, [0]*n
        for i in range(n):
            sz[find(i)] += 1
        for i in initial:
            sz2[find(i)] += 1 
        return max(sorted(initial), key=lambda i: sz[find(i)] if sz2[find(i)]==1 else 0)
```
111 ms
