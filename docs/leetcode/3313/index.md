# 3313：查找树中最后标记的节点（★★）


> <u>**[力扣第 3313 题](https://leetcode.cn/problems/find-the-last-marked-nodes-in-tree/)**</u>

## 题目

<p>有一棵有 <code>n</code> 个节点，编号从 <code>0</code> 到 <code>n - 1</code> 的 <strong>无向</strong> 树。给定一个长度为 <code>n - 1</code> 的整数数组 <code>edges</code>，其中 <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>]</code> 表示树中的 <code>u<sub>i</sub></code> 和 <code>v<sub>i</sub></code> 之间有一条边。</p>

<p>一开始，<strong>所有</strong> 节点都 <b>未标记</b>。之后的每一秒，你需要标记所有 <strong>至少</strong> 有一个已标记节点相邻的未标记节点。</p>

<p>返回一个数组 <code>nodes</code>，表示在时刻 <code>t = 0</code> 标记了节点 <code>i</code>，那么树中最后标记的节点是 <code>nodes[i]</code>。如果对于任意节点 <code>i</code> 有多个 <code>nodes[i]</code>，你可以选择 <strong>任意</strong> 一个作为答案。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>edges = [[0,1],[0,2]]</span></p>

<p><b>输出：</b>[2,2,1]</p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/06/01/screenshot-2024-06-02-122236.png" style="width: 450px; height: 217px;" /></p>

<ul>
<li>对于 <code>i = 0</code>，节点以如下序列标记：<code>[0] -&gt; [0,1,2]</code>。1 和 2 都可以是答案。</li>
<li>对于 <code>i = 1</code>，节点以如下序列标记：<code>[1] -&gt; [0,1] -&gt; [0,1,2]</code>。节点 2 最后被标记。</li>
<li>对于 <code>i = 2</code>，节点以如下序列标记：<code>[2] -&gt; [0,2] -&gt; [0,1,2]</code>。节点 1 最后被标记。</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>edges = [[0,1]]</span></p>

<p><b>输出：</b>[1,0]</p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/06/01/screenshot-2024-06-02-122249.png" style="width: 350px; height: 180px;" /></p>

<ul>
<li>对于 <code>i = 0</code>，节点以如下序列被标记：<code>[0] -&gt; [0,1]</code>。</li>
<li>对于 <code>i = 1</code>，节点以如下序列被标记：<code>[1] -&gt; [0,1]</code>。</li>
</ul>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>edges = [[0,1],[0,2],[2,3],[2,4]]</span></p>

<p><b>输出：</b>[3,3,1,1,1]</p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/06/03/screenshot-2024-06-03-210550.png" style="height: 240px; width: 450px;" /></p>

<ul>
<li>对于 <code>i = 0</code>，节点以如下序列被标记：<code>[0] -&gt; [0,1,2] -&gt; [0,1,2,3,4]</code>。</li>
<li>对于 <code>i = 1</code>，节点以如下序列被标记：<code>[1] -&gt; [0,1] -&gt; [0,1,2] -&gt; [0,1,2,3,4]</code>。</li>
<li>对于 <code>i = 2</code>，节点以如下序列被标记：<code>[2] -&gt; [0,2,3,4] -&gt; [0,1,2,3,4]</code>。</li>
<li>对于 <code>i = 3</code>，节点以如下序列被标记：<code>[3] -&gt; [2,3] -&gt; [0,2,3,4] -&gt; [0,1,2,3,4]</code>。</li>
<li>对于 <code>i = 4</code>，节点以如下序列被标记：<code>[4] -&gt; [2,4] -&gt; [0,2,3,4] -&gt; [0,1,2,3,4]</code>。</li>
</ul>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>edges.length == n - 1</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>0 &lt;= edges[i][0], edges[i][1] &lt;= n - 1</code></li>
<li>输入保证 <code>edges</code> 形成一棵合法的树。</li>
</ul>


**相似问题：**
- [3112：访问消失节点的最少时间（1756 分）](/leetcode/3112)
- [3241：标记所有节点需要的时间（2521 分）](/leetcode/3241)


## 分析

### #1
- 典型的换根dp，同时保存最远的节点即可

```python
# dfs序预处理树
def prep(edges):
    n = len(edges)+1
    g = [[] for _ in range(n)]
    for u,v in edges:
        g[u].append(v)
        g[v].append(u)
    fa = [-1]*n
    order = []
    sk = [0]
    while sk:
        u = sk.pop()
        order.append(u)
        g[u] = [v for v in g[u] if v!=fa[u]]
        for v in g[u]:
            fa[v] = u
            sk.append(v)
    return g,order,fa

class Solution:
    def lastMarkedNodes(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)+1
        g,order,fa = prep(edges)
        f = [[0,u] for u in range(n)]
        for u in order[::-1]:
            for v in g[u]:
                a,b = f[v]
                f[u] = max(f[u],[1+a,b])
        up = [[] for _ in range(n)]
        for u in order:
            m1,m2 = nlargest(2,[[f[v][0]+1,f[v][1]] for v in g[u]]+[up[u],[0,0]])
            for v in g[u]:
                x = m2 if [f[v][0]+1,f[v][1]]==m1 else m1
                up[v] = [x[0]+1,x[1]]
                f[v] = max(f[v],up[v])
        return [p[1] for p in f]
```
2082 ms


### #2

- 也可以先两次 bfs 找到直径的两个端点 u、v
- 树上任意节点距离最远的必然是 u、v 其中之一，比较即可

## 解答

```python
class Solution:
    def lastMarkedNodes(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)+1
        g = [[] for _ in range(n)]
        for u,v in edges:
            g[u].append(v)
            g[v].append(u)
        def bfs(u):
            d = [-1]*n
            d[u] = 0
            dq = deque([u])
            while dq:
                u = dq.popleft()
                for v in g[u]:
                    if d[v]==-1:
                        d[v] = d[u]+1
                        dq.append(v)
            return d
        d = bfs(0)
        u = d.index(max(d))
        d2 = bfs(u)
        v = d2.index(max(d2))
        d3 = bfs(v)
        return [max((d2[x],u),(d3[x],v))[1] for x in range(n)]
```
522 ms
