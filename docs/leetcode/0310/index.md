# 0310：最小高度树（★）


> <u>**[力扣第 310 题](https://leetcode.cn/problems/minimum-height-trees/)**</u>

## 题目

<p>树是一个无向图，其中任何两个顶点只通过一条路径连接。 换句话说，一个任何没有简单环路的连通图都是一棵树。</p>

<p>给你一棵包含 <code>n</code> 个节点的树，标记为 <code>0</code> 到 <code>n - 1</code> 。给定数字 <code>n</code> 和一个有 <code>n - 1</code> 条无向边的 <code>edges</code> 列表（每一个边都是一对标签），其中 <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> 表示树中节点 <code>a<sub>i</sub></code> 和 <code>b<sub>i</sub></code> 之间存在一条无向边。</p>

<p>可选择树中任何一个节点作为根。当选择节点 <code>x</code> 作为根节点时，设结果树的高度为 <code>h</code> 。在所有可能的树中，具有最小高度的树（即，<code>min(h)</code>）被称为 <strong>最小高度树</strong> 。</p>

<p>请你找到所有的 <strong>最小高度树</strong> 并按 <strong>任意顺序</strong> 返回它们的根节点标签列表。</p>
树的 <strong>高度</strong> 是指根节点和叶子节点之间最长向下路径上边的数量。



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/01/e1.jpg" style="height: 213px; width: 800px;" />
<pre>
<strong>输入：</strong>n = 4, edges = [[1,0],[1,2],[1,3]]
<strong>输出：</strong>[1]
<strong>解释：</strong>如图所示，当根是标签为 1 的节点时，树的高度是 1 ，这是唯一的最小高度树。</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/01/e2.jpg" style="height: 321px; width: 800px;" />
<pre>
<strong>输入：</strong>n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
<strong>输出：</strong>[3,4]
</pre>



<ul>
</ul>

<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>edges.length == n - 1</code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; n</code></li>
<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
<li>所有 <code>(a<sub>i</sub>, b<sub>i</sub>)</code> 互不相同</li>
<li>给定的输入 <strong>保证</strong> 是一棵树，并且 <strong>不会有重复的边</strong></li>
</ul>


## 分析

可以用拓扑排序，一层层去掉叶子，最里面的一层即是所求。证明见 [力扣](https://leetcode.cn/problems/minimum-height-trees/solutions/1395249/zui-xiao-gao-du-shu-by-leetcode-solution-6v6f/)

## 解答

```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        g = [[] for _ in range(n)]
        for a,b in edges:
            g[a].append(b)
            g[b].append(a)
        deg = [len(row) for row in g]
        Q = [u for u in range(n) if deg[u]<=1]
        res = []
        while Q:
            res,Q = Q,[]
            for u in res:
                for v in g[u]:
                    deg[v]-=1
                    if deg[v]==1:
                        Q.append(v)
        return res 
```
73 ms

## *附加

也可以用换根dp的方法
- 初始节点 0 作为根
- 第一遍 dfs 得到每个节点的高 H
- 第二遍 dfs 得到每个节点向上能走的最大距离 up
- max(H,up) 即是该节点作为根的高度

```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        g = [[] for _ in range(n)]
        for a,b in edges:
            g[a].append(b)
            g[b].append(a)
        H = [0]*n
        def dfs(u,f):
            for v in g[u]:
                if v!=f:
                    dfs(v,u)
                    H[u] = max(H[u],H[v]+1)
        dfs(0,-1)
        up = [0]*n
        def dfs(u,f):
            A = [1+H[v] for v in g[u] if v!=f]+[up[u],0]
            a,b = nlargest(2,A)
            for v in g[u]:
                if v!=f:
                    up[v]=1+b if 1+H[v]==a else 1+a
                    dfs(v,u)
        dfs(0,-1)
        res = [max(a,b) for a,b in zip(H,up)]
        mi = min(res)
        return [u for u in range(n) if res[u]==mi]
```
187 ms
