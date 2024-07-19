# 0684：冗余连接（★）


> <u>**[力扣第 684 题](https://leetcode.cn/problems/redundant-connection/)**</u>

## 题目

<p>树可以看成是一个连通且 <strong>无环 </strong>的 <strong>无向 </strong>图。</p>

<p>给定往一棵 <code>n</code> 个节点 (节点值 <code>1～n</code>) 的树中添加一条边后的图。添加的边的两个顶点包含在 <code>1</code> 到 <code>n</code> 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 <code>n</code> 的二维数组 <code>edges</code> ，<code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> 表示图中在 <code>ai</code> 和 <code>bi</code> 之间存在一条边。</p>

<p>请找出一条可以删去的边，删除后可使得剩余部分是一个有着 <code>n</code> 个节点的树。如果有多个答案，则返回数组 <code>edges</code> 中最后出现的那个。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626676174-hOEVUL-image.png" style="width: 152px; " /></p>

<pre>
<strong>输入:</strong> edges = [[1,2], [1,3], [2,3]]
<strong>输出:</strong> [2,3]
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626676179-kGxcmu-image.png" style="width: 250px; " /></p>

<pre>
<strong>输入:</strong> edges = [[1,2], [2,3], [3,4], [1,4], [1,5]]
<strong>输出:</strong> [1,4]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == edges.length</code></li>
<li><code>3 &lt;= n &lt;= 1000</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>1 &lt;= ai &lt; bi &lt;= edges.length</code></li>
<li><code>ai != bi</code></li>
<li><code>edges</code> 中无重复元素</li>
<li>给定的图是连通的 </li>
</ul>


**相似问题：**
- [0685：冗余连接 II](/leetcode/0685)
- [0721：账户合并](/leetcode/0721)
- [2127：参加会议的最多员工数（2449 分）](/leetcode/2127)
- [2608：图中的最短环（1904 分）](/leetcode/2608)


## 分析

### #1

典型的并查集应用。遍历边，如果两个顶点已经连通则返回，否则就连通。

```python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        def union(x, y):
            f[find(x)] = find(y)

        f = list(range(len(edges) + 1))
        for u, v in edges:
            if find(u) == find(v):
                return [u, v]
            union(u, v)
```
37 ms

### #2

也可以用拓扑排序：
- 先将所有入度为 1 的顶点入队
- 每轮弹出队首，将后继顶点的入度减 1，并将入度变为 1 的顶点入队
- 循环直到队空，剩下的环中的顶点的入度都大于 1
- 返回最后一条剩下的边即可

## 解答

```python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        g = [[] for _ in range(n+1)]
        deg = [0]*(n+1)
        for a,b in edges:
            g[a].append(b)
            g[b].append(a)
            deg[a] += 1
            deg[b] += 1
        Q = deque(u for u in range(n+1) if deg[u]==1)
        while Q:
            u = Q.popleft()
            for v in g[u]:
                deg[v]-=1
                if deg[v]==1:
                    Q.append(v)
        for a,b in edges[::-1]:
            if deg[a]>1 and deg[b]>1:
                return [a,b]
```
33 ms

