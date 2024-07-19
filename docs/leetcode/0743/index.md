# 0743：网络延迟时间（★）


> <u>**[力扣第 743 题](https://leetcode.cn/problems/network-delay-time/)**</u>

## 题目

<p>有 <code>n</code> 个网络节点，标记为 <code>1</code> 到 <code>n</code>。</p>

<p>给你一个列表 <code>times</code>，表示信号经过 <strong>有向</strong> 边的传递时间。 <code>times[i] = (u<sub>i</sub>, v<sub>i</sub>, w<sub>i</sub>)</code>，其中 <code>u<sub>i</sub></code> 是源节点，<code>v<sub>i</sub></code> 是目标节点， <code>w<sub>i</sub></code> 是一个信号从源节点传递到目标节点的时间。</p>

<p>现在，从某个节点 <code>K</code> 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png" style="height: 220px; width: 200px;" /></p>

<pre>
<strong>输入：</strong>times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>times = [[1,2,1]], n = 2, k = 1
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>times = [[1,2,1]], n = 2, k = 2
<strong>输出：</strong>-1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= n &lt;= 100</code></li>
<li><code>1 &lt;= times.length &lt;= 6000</code></li>
<li><code>times[i].length == 3</code></li>
<li><code>1 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n</code></li>
<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>
<li><code>0 &lt;= w<sub>i</sub> &lt;= 100</code></li>
<li>所有 <code>(u<sub>i</sub>, v<sub>i</sub>)</code> 对都 <strong>互不相同</strong>（即，不含重复边）</li>
</ul>


**相似问题：**
- [2039：网络空闲的时刻（1865 分）](/leetcode/2039)
- [2045：到达目的地的第二短时间（2201 分）](/leetcode/2045)


## 分析

典型的单源最短路径问题，可以用 dijkstra 算法。

## 解答

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        g = [[] for _ in range(n)]
        for u,v,w in times:
            g[u-1].append((v-1,w))
        d = [inf]*n
        d[k-1] = 0
        pq = [(0,k-1)]
        while pq:
            w,u = heappop(pq)
            if w>d[u]:
                continue
            for v,w2 in g[u]:
                if w+w2<d[v]:
                    d[v] = w+w2
                    heappush(pq,(w+w2,v))
        res = max(d)
        return res if res<inf else -1
```
时间 O(M*logM)，65 ms

## *附加

本题数据量很小，可以练习各种最短路算法。

### #1 Floyd

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        f = [[inf]*n for _ in range(n)]
        for i in range(n):
            f[i][i] = 0
        for u, v, w in times:
            f[u-1][v-1] = w
        for x,i,j in product(range(n),range(n),range(n)):
            f[i][j] = min(f[i][j],f[i][x]+f[x][j])
        res = max(f[k-1])
        return res if res<inf else -1
```
时间 O(N^3)，761 ms

### #2 Bellman-Ford 
```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        d = [inf]*n
        d[k-1] = 0
        for _ in range(n-1):
            flag = True
            for u,v,w in times:
                if d[u-1]+w<d[v-1]:
                    d[v-1] = d[u-1]+w
                    flag = False
            if flag:
                break
        res = max(d)
        return res if res<inf else -1
```
时间 O(M*N)，63 ms

### #3 SPFA

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        g = [[] for _ in range(n)]
        for u,v,w in times:
            g[u-1].append((v-1,w))
        d = [inf]*n
        d[k-1] = 0
        Q, vis = deque([k-1]), {k-1}
        while Q:
            u = Q.popleft()
            vis.remove(u)
            for v,w in g[u]:
                if d[u]+w<d[v]:
                    d[v] = d[u]+w
                    if v not in vis:
                        vis.add(v)
                        Q.append(v)
        res = max(d)
        return res if res<inf else -1
```
时间 O(M*N)，52 ms

### #4 Dijkstra 朴素

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        g = [[] for _ in range(n)]
        for u,v,w in times:
            g[u-1].append((v-1,w))
        d = [inf]*n
        d[k-1] = 0
        Q = set(range(n))
        while Q:
            u = min(Q,key=lambda i:d[i])
            Q.remove(u)
            for v,w in g[u]:
                d[v] = min(d[v],d[u]+w)
        res = max(d)
        return res if res<inf else -1
```
时间 O(N^2)，66 ms
