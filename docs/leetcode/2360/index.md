# 2360：图中的最长环（1897 分）


> <u>**[力扣第 304 场周赛第 4 题](https://leetcode.cn/problems/longest-cycle-in-a-graph/)**</u>

## 题目

<p>给你一个 <code>n</code> 个节点的 <b>有向图</b> ，节点编号为 <code>0</code> 到 <code>n - 1</code> ，其中每个节点 <strong>至多</strong> 有一条出边。</p>

<p>图用一个大小为 <code>n</code> 下标从<strong> 0</strong> 开始的数组 <code>edges</code> 表示，节点 <code>i</code> 到节点 <code>edges[i]</code> 之间有一条有向边。如果节点 <code>i</code> 没有出边，那么 <code>edges[i] == -1</code> 。</p>

<p>请你返回图中的 <strong>最长</strong> 环，如果没有任何环，请返回 <code>-1</code> 。</p>

<p>一个环指的是起点和终点是 <strong>同一个</strong> 节点的路径。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2022/06/08/graph4drawio-5.png" style="width: 335px; height: 191px;" /></p>

<pre>
<b>输入：</b>edges = [3,3,4,2,3]
<b>输出去：</b>3
<b>解释：</b>图中的最长环是：2 -&gt; 4 -&gt; 3 -&gt; 2 。
这个环的长度为 3 ，所以返回 3 。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2022/06/07/graph4drawio-1.png" style="width: 171px; height: 161px;" /></p>

<pre>
<b>输入：</b>edges = [2,-1,3,1]
<b>输出：</b>-1
<b>解释：</b>图中没有任何环。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == edges.length</code></li>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>-1 &lt;= edges[i] &lt; n</code></li>
<li><code>edges[i] != i</code></li>
</ul>


**相似问题：**
- [1591：奇怪的打印机 II（2290 分）](/leetcode/1591)
- [2471：逐层排序二叉树所需的最少操作数目（1635 分）](/leetcode/2471)
- [2608：图中的最短环（1904 分）](/leetcode/2608)


## 分析

### #1

出度最多为1，是内向基环树森林，可以用拓扑排序去掉树枝，遍历剩下的环即可。

```python
class Solution:
    def longestCycle(self, edges: List[int]) -> int:
        n = len(edges)
        ind = [0]*n
        for u in edges:
            if u>=0:
                ind[u] += 1
        Q = deque(u for u in range(n) if ind[u]==0)
        while Q:
            u = Q.popleft()
            v =edges[u]
            if v>=0:
                ind[v] -= 1
                if ind[v]==0:
                    Q.append(v)
        res = -1
        for u in range(n):
            if ind[u]:
                w = 0
                while ind[u]:
                    ind[u]=0
                    u=edges[u]
                    w += 1
                res = max(res,w)
        return res
```
177 ms

### #2

- 一种更简单的写法是从每个节点 u 出发，遍历直到遇到已访问节点 v
- 假如 v 在此次遍历的路径中，说明发现了一个新的环，可定位环长
## 解答



```python
class Solution:
    def longestCycle(self, edges: List[int]) -> int:
        n = len(edges)
        vis = [0]*n
        res = -1
        for u in range(n):
            A = []
            while u>=0 and not vis[u]:
                A.append(u)
                vis[u]=1
                u = edges[u]
            if u in A:
                res = max(res,len(A)-A.index(u))
        return res
```
147 ms
