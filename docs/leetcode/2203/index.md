# 2203：得到要求路径的最小带权子图（★★★）


> <u>**[力扣第 284 场周赛第 4 题](https://leetcode.cn/problems/minimum-weighted-subgraph-with-the-required-paths/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，它表示一个 <strong>带权有向</strong> 图的节点数，节点编号为 <code>0</code> 到 <code>n - 1</code> 。</p>

<p>同时给你一个二维整数数组 <code>edges</code> ，其中 <code>edges[i] = [from<sub>i</sub>, to<sub>i</sub>, weight<sub>i</sub>]</code> ，表示从 <code>from<sub>i</sub></code> 到 <code>to<sub>i</sub></code> 有一条边权为 <code>weight<sub>i</sub></code> 的 <strong>有向</strong> 边。</p>

<p>最后，给你三个 <strong>互不相同</strong> 的整数 <code>src1</code> ，<code>src2</code> 和 <code>dest</code> ，表示图中三个不同的点。</p>

<p>请你从图中选出一个 <b>边权和最小</b> 的子图，使得从 <code>src1</code> 和 <code>src2</code> 出发，在这个子图中，都 <strong>可以</strong> 到达 <code>dest</code> 。如果这样的子图不存在，请返回 <code>-1</code> 。</p>

<p><strong>子图</strong> 中的点和边都应该属于原图的一部分。子图的边权和定义为它所包含的所有边的权值之和。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2022/02/17/example1drawio.png" style="width: 263px; height: 250px;" /></p>

<pre>
<b>输入：</b>n = 6, edges = [[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], src1 = 0, src2 = 1, dest = 5
<b>输出：</b>9
<strong>解释：</strong>
上图为输入的图。
蓝色边为最优子图之一。
注意，子图 [[1,0,3],[0,5,6]] 也能得到最优解，但无法在满足所有限制的前提下，得到更优解。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2022/02/17/example2-1drawio.png" style="width: 350px; height: 51px;" /></p>

<pre>
<b>输入：</b>n = 3, edges = [[0,1,1],[2,1,1]], src1 = 0, src2 = 1, dest = 2
<b>输出：</b>-1
<strong>解释：</strong>
上图为输入的图。
可以看到，不存在从节点 1 到节点 2 的路径，所以不存在任何子图满足所有限制。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= edges.length &lt;= 10<sup>5</sup></code></li>
<li><code>edges[i].length == 3</code></li>
<li><code>0 &lt;= from<sub>i</sub>, to<sub>i</sub>, src1, src2, dest &lt;= n - 1</code></li>
<li><code>from<sub>i</sub> != to<sub>i</sub></code></li>
<li><code>src1</code> ，<code>src2</code> 和 <code>dest</code> 两两不同。</li>
<li><code>1 &lt;= weight[i] &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

最终的子图一定是三岔路的形式（可以反证），而且由三条最短路组成。

因此遍历每个节点 x，使三条最短路之和最小即可。

> 注意是求所有节点 x 到 dest 的最短路，而不是求 dest 到所有节点的最短路。
>一个巧妙的方法是将边全部反向，将问题转为求 dest 到所有节点的最短路。


## 解答

```python
def minimumWeight(self, n: int, edges: List[List[int]], src1: int, src2: int, dest: int) -> int:
    def dij(root, nxt):
        d, pq = defaultdict(lambda: float('inf')), [(0, root)]
        while pq:
            w, u = heappop(pq)
            if u in d:
                continue
            d[u] = w
            for v, w2 in nxt[u]:
                if v not in d:
                    heappush(pq, (w+w2, v))
        return d
    
    nxt1, nxt2 = defaultdict(list), defaultdict(list)
    for u, v, w in edges:
        nxt1[u].append((v, w))
        nxt2[v].append((u, w))
    d1 = dij(src1, nxt1)
    d2 = dij(src2, nxt1)
    d3 = dij(dest, nxt2)
    res = min(d1[i]+d2[i]+d3[i] for i in range(n))
    return res if res<float('inf') else -1
```
860 ms
