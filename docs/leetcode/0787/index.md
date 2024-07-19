# 0787：K 站中转内最便宜的航班（1786 分）


> <u>**[力扣第 787 题](https://leetcode.cn/problems/cheapest-flights-within-k-stops/)**</u>

## 题目

<p>有 <code>n</code> 个城市通过一些航班连接。给你一个数组 <code>flights</code> ，其中 <code>flights[i] = [from<sub>i</sub>, to<sub>i</sub>, price<sub>i</sub>]</code> ，表示该航班都从城市 <code>from<sub>i</sub></code> 开始，以价格 <code>price<sub>i</sub></code> 抵达 <code>to<sub>i</sub></code>。</p>

<p>现在给定所有的城市和航班，以及出发城市 <code>src</code> 和目的地 <code>dst</code>，你的任务是找到出一条最多经过 <code>k</code> 站中转的路线，使得从 <code>src</code> 到 <code>dst</code> 的 <strong>价格最便宜</strong> ，并返回该价格。 如果不存在这样的路线，则输出 <code>-1</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong>
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 1
<strong>输出:</strong> 200
<strong>解释:</strong>
城市航班图如下
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/02/16/995.png" style="height: 180px; width: 246px;" />

从城市 0 到城市 2 在 1 站中转以内的最便宜价格是 200，如图中红色所示。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入:</strong>
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 0
<strong>输出:</strong> 500
<strong>解释:</strong>
城市航班图如下
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/02/16/995.png" style="height: 180px; width: 246px;" />

从城市 0 到城市 2 在 0 站中转以内的最便宜价格是 500，如图中蓝色所示。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 100</code></li>
<li><code>0 &lt;= flights.length &lt;= (n * (n - 1) / 2)</code></li>
<li><code>flights[i].length == 3</code></li>
<li><code>0 &lt;= from<sub>i</sub>, to<sub>i</sub> &lt; n</code></li>
<li><code>from<sub>i</sub> != to<sub>i</sub></code></li>
<li><code>1 &lt;= price<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
<li>航班没有重复，且不存在自环</li>
<li><code>0 &lt;= src, dst, k &lt; n</code></li>
<li><code>src != dst</code></li>
</ul>


**相似问题：**
- [0568：最大休假天数](/leetcode/0568)
- [2093：前往目标城市的最小费用](/leetcode/2093)


## 分析

### #1

限制了路径长度的可以先考虑动态规划。

用 dp[i][j] 代表从 src 到 i 最多飞 j 次的最低价格，即可递推。
	

```python
def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    dp = [[float('inf')]*(k+2) for _ in range(n)]
    dp[src] = [0] * (k+2)
    for j in range(k+1):
        for u, v, w in flights:
            dp[v][j+1] = min(dp[v][j+1], dp[u][j]+w)
    res = dp[dst][-1]
    return res if res < float('inf') else -1
```
228 ms

### #2

可以优化为一维数组。观察发现，这本质上就是 Bellman-Ford 算法。

> 区别在于必须保存上一轮的距离数组，保证每轮只多松弛一次

## 解答

```python
def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    dp = [float('inf')] * n
    dp[src] = 0
    for _ in range(k + 1):
        prev, flag = dp[:], True
        for u, v, w in flights:
            if prev[u]+w < dp[v]:
                dp[v] = prev[u]+w
                flag = False
        if flag:
            break
    res = dp[dst]
    return res if res < float('inf') else -1
```
52 ms

### *附加

还有个巧妙的解法。

将状态 (城市 u，飞行次数 c) 看作顶点，如果 c <k+1，那么对于航班 <u,v,w>，从 (u, c) 到 (v, c+1) 连有向边，权重 w。

问题即转为在新图中求 (src, 0) 到 (dst, 0<=c<=k+1) 的最短路，可以用 dijkstra 算法。
   
> 具体实现时不需要真的构造出新图。

## 解答

```python
def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    nxt = defaultdict(list)
    for u, v, w in flights:
        nxt[u].append((v, w))
    d, pq = {}, [(0, src, 0)]
    while pq:
        w, u, c = heappop(pq)
        if (u, c) in d:
            continue
        if u == dst:
            return w
        d[(u, c)] = w
        if c < k + 1:
            for v, w2 in nxt[u]:
                if (v, c+1) not in d:
                    heappush(pq, (w+w2, v, c+1))
    return -1
```
160 ms


