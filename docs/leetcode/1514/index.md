# 1514：概率最大的路径（1846 分）


> <u>**[力扣第 197 场周赛第 3 题](https://leetcode.cn/problems/path-with-maximum-probability/)**</u>

## 题目

<p>给你一个由 <code>n</code> 个节点（下标从 0 开始）组成的无向加权图，该图由一个描述边的列表组成，其中 <code>edges[i] = [a, b]</code> 表示连接节点 a 和 b 的一条无向边，且该边遍历成功的概率为 <code>succProb[i]</code> 。</p>

<p>指定两个节点分别作为起点 <code>start</code> 和终点 <code>end</code> ，请你找出从起点到终点成功概率最大的路径，并返回其成功概率。</p>

<p>如果不存在从 <code>start</code> 到 <code>end</code> 的路径，请 <strong>返回 0</strong> 。只要答案与标准答案的误差不超过 <strong>1e-5 </strong>，就会被视作正确答案。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/07/12/1558_ex1.png" style="height: 186px; width: 187px;"></strong></p>

<pre><strong>输入：</strong>n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
<strong>输出：</strong>0.25000
<strong>解释：</strong>从起点到终点有两条路径，其中一条的成功概率为 0.2 ，而另一条为 0.5 * 0.5 = 0.25
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/07/12/1558_ex2.png" style="height: 186px; width: 189px;"></strong></p>

<pre><strong>输入：</strong>n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
<strong>输出：</strong>0.30000
</pre>

<p><strong>示例 3：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/07/12/1558_ex3.png" style="height: 191px; width: 215px;"></strong></p>

<pre><strong>输入：</strong>n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
<strong>输出：</strong>0.00000
<strong>解释：</strong>节点 0 和 节点 2 之间不存在路径
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 10^4</code></li>
<li><code>0 &lt;= start, end &lt; n</code></li>
<li><code>start != end</code></li>
<li><code>0 &lt;= a, b &lt; n</code></li>
<li><code>a != b</code></li>
<li><code>0 &lt;= succProb.length == edges.length &lt;= 2*10^4</code></li>
<li><code>0 &lt;= succProb[i] &lt;= 1</code></li>
<li>每两个节点之间最多有一条边</li>
</ul>


**相似问题：**
- [1976：到达目的地的方案数（2094 分）](/leetcode/1976)


## 分析

- 类似最短路，权重从相加改为了相乘，求的是最大
- 依然可以用 dijkstra 算法，初始权重设为 -1 即可

## 解答

```python
class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
        g = [[] for _ in range(n)]
        for (a,b),p in zip(edges,succProb):
            g[a].append((b,p))
            g[b].append((a,p))
        d = [inf]*n
        d[start_node] = -1
        pq = [(-1,start_node)]
        while pq:
            w,u = heappop(pq)
            if w>d[u]:
                continue
            if u==end_node:
                return -w
            for v,w2 in g[u]:
                if w*w2<d[v]:
                    d[v]=w*w2
                    heappush(pq,(w*w2,v))
        return 0
```
129 ms


