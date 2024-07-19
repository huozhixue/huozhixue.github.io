# 1976：到达目的地的方案数（2094 分）


> <u>**[力扣第 59 场双周赛第 3 题](https://leetcode.cn/problems/number-of-ways-to-arrive-at-destination/)**</u>

## 题目

<p>你在一个城市里，城市由 <code>n</code> 个路口组成，路口编号为 <code>0</code> 到 <code>n - 1</code> ，某些路口之间有 <strong>双向</strong> 道路。输入保证你可以从任意路口出发到达其他任意路口，且任意两个路口之间最多有一条路。</p>

<p>给你一个整数 <code>n</code> 和二维整数数组 <code>roads</code> ，其中 <code>roads[i] = [u<sub>i</sub>, v<sub>i</sub>, time<sub>i</sub>]</code> 表示在路口 <code>u<sub>i</sub></code> 和 <code>v<sub>i</sub></code> 之间有一条需要花费 <code>time<sub>i</sub></code> 时间才能通过的道路。你想知道花费 <strong>最少时间</strong> 从路口 <code>0</code> 出发到达路口 <code>n - 1</code> 的方案数。</p>

<p>请返回花费 <strong>最少时间</strong> 到达目的地的 <strong>路径数目</strong> 。由于答案可能很大，将结果对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 后返回。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/17/graph2.png" style="width: 235px; height: 381px;">
<pre><b>输入：</b>n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
<b>输出：</b>4
<b>解释：</b>从路口 0 出发到路口 6 花费的最少时间是 7 分钟。
四条花费 7 分钟的路径分别为：
- 0 ➝ 6
- 0 ➝ 4 ➝ 6
- 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
- 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>n = 2, roads = [[1,0,10]]
<b>输出：</b>1
<b>解释：</b>只有一条从路口 0 到路口 1 的路，花费 10 分钟。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 200</code></li>
<li><code>n - 1 &lt;= roads.length &lt;= n * (n - 1) / 2</code></li>
<li><code>roads[i].length == 3</code></li>
<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>
<li><code>1 &lt;= time<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
<li><code>u<sub>i </sub>!= v<sub>i</sub></code></li>
<li>任意两个路口之间至多有一条路。</li>
<li>从任意路口出发，你能够到达其他任意路口。</li>
</ul>


**相似问题：**
- [0797：所有可能的路径（1382 分）](/leetcode/0797)
- [1514：概率最大的路径（1846 分）](/leetcode/1514)
- [2045：到达目的地的第二短时间（2201 分）](/leetcode/2045)


## 分析

可以先用 dijkstra 求出所有节点到 n-1 的最短时间 dis。

然后假如节点 u 和 v 相邻，权重 w，且 dis[u]-w=dis[v]，连一条有向边 <u, v>，
问题转为求新的有向无环图中 0 到 n-1 的路径。显然可以动态规划递推。

> 注意到 dijkstra 出堆节点的顺序和动态规划中递推的顺序其实是一致的，因此可以同时进行。

## 解答

```python
def countPaths(self, n: int, roads: List[List[int]]) -> int:
    nxt = defaultdict(list)
    for u, v, w in roads:
        nxt[u].append((v, w))
        nxt[v].append((u, w))
    dp, mod = Counter({n-1: 1}), 10**9+7
    d, pq = {}, [(0, n-1)]
    while pq:
        w, u = heappop(pq)
        if u in d:
            continue
        d[u] = w
        for v, w2 in nxt[u]:
            if v not in d:
                heappush(pq, (w+w2, v))
            elif d[u]-w2==d[v]:
                dp[u] += dp[v]
                dp[u] %= mod
    return dp[0]
```
120 ms

