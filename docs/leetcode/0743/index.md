# 0743：网络延迟时间（★）


> <u>**[力扣第 62 场双周赛第 2 题](https://leetcode.cn/problems/network-delay-time/)**</u>

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


## 分析

典型的单源最短路径问题，可以用堆优化的 dijkstra 算法。

## 解答

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    nxt = defaultdict(list)
    for u, v, w in times:
        nxt[u-1].append((v-1, w))
    d, pq = {}, [(0, k-1)]
    while pq:
        w, u = heappop(pq)
        if u in d:
            continue
        d[u] = w
        for v, w2 in nxt[u]:
            if v not in d:
                heappush(pq, (w+w2, v))
    return max(d.values()) if len(d) == n else -1
```
时间复杂度 O(E*logE)，88 ms

## *附加

本题可以练习各种最短路算法。

### #1 Floyd

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    d = [[float('inf')]*n for _ in range(n)]
    for i in range(n):
        d[i][i] = 0
    for u, v, w in times:
        d[u-1][v-1] = w
    for x, i, j in product(range(n), range(n), range(n)):
        d[i][j] = min(d[i][j], d[i][x]+d[x][j])
    res = max(d[k-1])
    return res if res < float('inf') else -1
```
时间复杂度 O(V^3)，1188 ms

### #2 Bellman-Ford 

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    d = [float('inf')] * n
    d[k-1] = 0
    for _ in range(n - 1):
        flag = True
        for u, v, w in times:
            if d[u-1] + w < d[v-1]:
                d[v-1] = d[u-1] + w
                flag = False
        if flag:
            break
    res = max(d)
    return res if res < float('inf') else -1
```
时间复杂度 O(E*V)，92 ms

### #3 SPFA

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    nxt = defaultdict(list)
    for u, v, w in times:
        nxt[u-1].append((v-1, w))
    d = [float('inf')] * n
    d[k-1] = 0
    queue, vis = deque([k-1]), {k-1}
    while queue:
        u = queue.popleft()
        vis.remove(u)
        for v, w in nxt[u]:
            if d[u] + w < d[v]:
                d[v] = d[u] + w
                if v not in vis:
                    vis.add(v)
                    queue.append(v)
    res = max(d)
    return res if res != float('inf') else -1
```
时间复杂度 O(E*V)，80 ms

### #4 Dijkstra 朴素

```python
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    nxt = defaultdict(list)
    for u, v, w in times:
        nxt[u-1].append((v-1, w))
    d, Q = [float('inf')] * n, set(range(n))
    d[k-1] = 0
    while Q:
        u = min(Q, key=d.__getitem__)
        Q.remove(u)
        for v, w in nxt[u]:
            if v in Q:
                d[v] = min(d[v], d[u] + w)
    res = max(d)
    return res if res != float('inf') else -1
```
时间复杂度 O(V^2)，84 ms
