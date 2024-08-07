# 1334：阈值距离内邻居最少的城市（1854 分）


> <u>**[力扣第 173 场周赛第 3 题](https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)**</u>

## 题目

<p>有 <code>n</code> 个城市，按从 <code>0</code> 到 <code>n-1</code> 编号。给你一个边数组 <code>edges</code>，其中 <code>edges[i] = [from<sub>i</sub>, to<sub>i</sub>, weight<sub>i</sub>]</code> 代表 <code>from<sub>i</sub></code> 和 <code>to<sub>i</sub></code><sub> </sub>两个城市之间的双向加权边，距离阈值是一个整数 <code>distanceThreshold</code>。</p>

<p>返回在路径距离限制为 <code>distanceThreshold</code> 以内可到达城市最少的城市。如果有多个这样的城市，则返回编号最大的城市。</p>

<p>注意，连接城市 <em><strong>i</strong></em> 和 <em><strong>j</strong></em> 的路径的距离等于沿该路径的所有边的权重之和。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/26/find_the_city_01.png" style="height: 225px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
<strong>输出：</strong>3
<strong>解释：</strong>城市分布图如上。
每个城市阈值距离 distanceThreshold = 4 内的邻居城市分别是：
城市 0 -&gt; [城市 1, 城市 2]
城市 1 -&gt; [城市 0, 城市 2, 城市 3]
城市 2 -&gt; [城市 0, 城市 1, 城市 3]
城市 3 -&gt; [城市 1, 城市 2]
城市 0 和 3 在阈值距离 4 以内都有 2 个邻居城市，但是我们必须返回城市 3，因为它的编号最大。
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/26/find_the_city_02.png" style="height: 225px; width: 300px;" /></strong></p>

<pre>
<strong>输入：</strong>n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
<strong>输出：</strong>0
<strong>解释：</strong>城市分布图如上。
每个城市阈值距离 distanceThreshold = 2 内的邻居城市分别是：
城市 0 -&gt; [城市 1]
城市 1 -&gt; [城市 0, 城市 4]
城市 2 -&gt; [城市 3, 城市 4]
城市 3 -&gt; [城市 2, 城市 4]
城市 4 -&gt; [城市 1, 城市 2, 城市 3]
城市 0 在阈值距离 2 以内只有 1 个邻居城市。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 100</code></li>
<li><code>1 &lt;= edges.length &lt;= n * (n - 1) / 2</code></li>
<li><code>edges[i].length == 3</code></li>
<li><code>0 &lt;= from<sub>i</sub> &lt; to<sub>i</sub> &lt; n</code></li>
<li><code>1 &lt;= weight<sub>i</sub>, distanceThreshold &lt;= 10^4</code></li>
<li>所有 <code>(from<sub>i</sub>, to<sub>i</sub>)</code> 都是不同的。</li>
</ul>


**相似问题：**
- [2045：到达目的地的第二短时间（2201 分）](/leetcode/2045)


## 分析

典型的最短路问题，可以直接用 floyd 算法。

## 解答

```python
def findTheCity(self, n: int, edges: List[List[int]], distanceThreshold: int) -> int:
    dis = [[float('inf')]*n for _ in range(n)]
    for i in range(n):
        dis[i][i] = 0
    for u, v, w in edges:
        dis[u][v] = dis[v][u] = w
    for x, u, v in product(range(n), range(n), range(n)):
        dis[u][v] = min(dis[u][v], dis[u][x]+dis[x][v])
    return min(range(n), key=lambda i: (sum(w<=distanceThreshold for w in dis[i]), -i))
```
844 ms


