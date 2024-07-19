# 0882：细分图中的可到达节点（2328 分）


> <u>**[力扣第 96 场周赛第 4 题](https://leetcode.cn/problems/reachable-nodes-in-subdivided-graph/)**</u>

## 题目

<p>给你一个无向图（<strong>原始图</strong>），图中有 <code>n</code> 个节点，编号从 <code>0</code> 到 <code>n - 1</code> 。你决定将图中的每条边 <strong>细分</strong> 为一条节点链，每条边之间的新节点数各不相同。</p>

<p>图用由边组成的二维数组 <code>edges</code> 表示，其中 <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>, cnt<sub>i</sub>]</code> 表示原始图中节点 <code>u<sub>i</sub></code> 和 <code>v<sub>i</sub></code> 之间存在一条边，<code>cnt<sub>i</sub></code> 是将边 <strong>细分</strong> 后的新节点总数。注意，<code>cnt<sub>i</sub> == 0</code> 表示边不可细分。</p>

<p>要 <strong>细分</strong> 边 <code>[ui, vi]</code> ，需要将其替换为 <code>(cnt<sub>i</sub> + 1)</code> 条新边，和 <code>cnt<sub>i</sub></code> 个新节点。新节点为 <code>x<sub>1</sub></code>, <code>x<sub>2</sub></code>, ..., <code>x<sub>cnt<sub>i</sub></sub></code> ，新边为 <code>[u<sub>i</sub>, x<sub>1</sub>]</code>, <code>[x<sub>1</sub>, x<sub>2</sub>]</code>, <code>[x<sub>2</sub>, x<sub>3</sub>]</code>, ..., <code>[x<sub>cnt<sub>i</sub>-1</sub>, x<sub>cnt<sub>i</sub></sub>]</code>, <code>[x<sub>cnt<sub>i</sub></sub>, v<sub>i</sub>]</code> 。</p>

<p>现在得到一个 <strong>新的细分图</strong> ，请你计算从节点 <code>0</code> 出发，可以到达多少个节点？如果节点间距离是 <code>maxMoves</code> 或更少，则视为 <strong>可以到达</strong> 。</p>

<p>给你原始图和 <code>maxMoves</code> ，返回 <em>新的细分图中从节点 <code>0</code> 出发</em><strong><em> 可到达的节点数</em></strong> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/01/origfinal.png" style="height: 247px; width: 600px;" />
<pre>
<strong>输入：</strong>edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3
<strong>输出：</strong>13
<strong>解释：</strong>边的细分情况如上图所示。
可以到达的节点已经用黄色标注出来。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>edges = [[0,1,4],[1,2,6],[0,2,8],[1,3,1]], maxMoves = 10, n = 4
<strong>输出：</strong>23
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>edges = [[1,2,4],[1,4,5],[1,3,1],[2,3,4],[3,4,5]], maxMoves = 17, n = 5
<strong>输出：</strong>1
<strong>解释：</strong>节点 0 与图的其余部分没有连通，所以只有节点 0 可以到达。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= edges.length &lt;= min(n * (n - 1) / 2, 10<sup>4</sup>)</code></li>
<li><code>edges[i].length == 3</code></li>
<li><code>0 &lt;= u<sub>i</sub> &lt; v<sub>i</sub> &lt; n</code></li>
<li>图中 <strong>不存在平行边</strong></li>
<li><code>0 &lt;= cnt<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= maxMoves &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= n &lt;= 3000</code></li>
</ul>


**相似问题：**
- [2092：找出知晓秘密的所有专家（2003 分）](/leetcode/2092)
- [2077：殊途同归](/leetcode/2077)


## 分析

将 cnt+1 条新边看作是原边的权重，那么可以用 dijkstra 计算出每个原节点到 0 的距离。

原节点距离不超过 maxMoves 即可倒达，新的细分节点则可以根据最近的原节点来判断。

## 解答

```python
def reachableNodes(self, edges: List[List[int]], maxMoves: int, n: int) -> int:
    nxt = defaultdict(list)
    for u, v, cnt in edges:
        nxt[u].append((v, cnt+1))
        nxt[v].append((u, cnt+1))
    d, pq = defaultdict(lambda: float('inf')), [(0, 0)]
    while pq:
        w, u = heappop(pq)
        if u in d:
            continue
        d[u] = w
        for v, w2 in nxt[u]:
            if v not in d:
                heappush(pq, (w+w2, v))
    res = sum(d[v]<=maxMoves for v in range(n))
    for u, v, cnt in edges:
        res += min(cnt, max(0, maxMoves-d[u])+max(0, maxMoves-d[v]))
    return res
```
224 ms

