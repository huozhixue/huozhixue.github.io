# 3108：带权图里旅途的最小代价（2108 分）


> <u>**[力扣第 392 场周赛第 4 题](https://leetcode.cn/problems/minimum-cost-walk-in-weighted-graph/)**</u>

## 题目

<p>给你一个 <code>n</code> 个节点的带权无向图，节点编号为 <code>0</code> 到 <code>n - 1</code> 。</p>

<p>给你一个整数 <code>n</code> 和一个数组 <code>edges</code> ，其中 <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>, w<sub>i</sub>]</code> 表示节点 <code>u<sub>i</sub></code> 和 <code>v<sub>i</sub></code> 之间有一条权值为 <code>w<sub>i</sub></code> 的无向边。</p>

<p>在图中，一趟旅途包含一系列节点和边。旅途开始和结束点都是图中的节点，且图中存在连接旅途中相邻节点的边。注意，一趟旅途可能访问同一条边或者同一个节点多次。</p>

<p>如果旅途开始于节点 <code>u</code> ，结束于节点 <code>v</code> ，我们定义这一趟旅途的 <strong>代价</strong> 是经过的边权按位与 <code>AND</code> 的结果。换句话说，如果经过的边对应的边权为 <code>w<sub>0</sub>, w<sub>1</sub>, w<sub>2</sub>, ..., w<sub>k</sub></code> ，那么代价为<code>w<sub>0</sub> &amp; w<sub>1</sub> &amp; w<sub>2</sub> &amp; ... &amp; w<sub>k</sub></code> ，其中 <code>&amp;</code> 表示按位与 <code>AND</code> 操作。</p>

<p>给你一个二维数组 <code>query</code> ，其中 <code>query[i] = [s<sub>i</sub>, t<sub>i</sub>]</code> 。对于每一个查询，你需要找出从节点开始 <code>s<sub>i</sub></code> ，在节点 <code>t<sub>i</sub></code> 处结束的旅途的最小代价。如果不存在这样的旅途，答案为 <code>-1</code> 。</p>

<p>返回数组<em> </em><code>answer</code> ，其中<em> </em><code>answer[i]</code><em> </em>表示对于查询 <code>i</code> 的 <strong>最小</strong> 旅途代价。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]</span></p>

<p><span class="example-io"><b>输出：</b>[1,-1]</span></p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/01/31/q4_example1-1.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 351px; height: 141px;" /></p>

<p>第一个查询想要得到代价为 1 的旅途，我们依次访问：<code>0-&gt;1</code>（边权为 7 ）<code>1-&gt;2</code> （边权为 1 ）<code>2-&gt;1</code>（边权为 1 ）<code>1-&gt;3</code> （边权为 7 ）。</p>

<p>第二个查询中，无法从节点 3 到节点 4 ，所以答案为 -1 。</p>

<p><strong class="example">示例 2：</strong></p>
</div>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>n = 3, edges = [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query = [[1,2]]</span></p>

<p><span class="example-io"><b>输出：</b>[0]</span></p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/01/31/q4_example2e.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 211px; height: 181px;" /></p>

<p>第一个查询想要得到代价为 0 的旅途，我们依次访问：<code>1-&gt;2</code>（边权为 1 ），<code>2-&gt;1</code>（边权 为 6 ），<code>1-&gt;2</code>（边权为 1 ）。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= edges.length &lt;= 10<sup>5</sup></code></li>
<li><code>edges[i].length == 3</code></li>
<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>
<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>
<li><code>0 &lt;= w<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= query.length &lt;= 10<sup>5</sup></code></li>
<li><code>query[i].length == 2</code></li>
<li><code>0 &lt;= s<sub>i</sub>, t<sub>i</sub> &lt;= n - 1</code></li>
</ul>




## 分析

典型的并查集，求出每个连通块的最小代价即可。
## 解答


```python
class Solution:
    def minimumCost(self, n: int, edges: List[List[int]], query: List[List[int]]) -> List[int]:
        def find(x):
            if f[x]!=x:
                f[x] = find(f[x])
            return f[x]

        def union(x,y):
            f[find(x)] = find(y)

        f = list(range(n))
        for u,v,w in edges:
            union(u,v)
        g = {}
        for u,v,w in edges:
            g[find(u)] = g.get(find(u),w)&w
        return [0 if s==t else g[find(s)] if find(s)==find(t) else -1 for s,t in query]
```
210 ms
