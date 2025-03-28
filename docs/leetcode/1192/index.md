# 1192：查找集群内的关键连接（2084 分）


> <u>**[力扣第 154 场周赛第 4 题](https://leetcode.cn/problems/critical-connections-in-a-network/)**</u>

## 题目

<p>力扣数据中心有 <code>n</code> 台服务器，分别按从 <code>0</code> 到 <code>n-1</code> 的方式进行了编号。它们之间以 <strong>服务器到服务器</strong> 的形式相互连接组成了一个内部集群，连接是无向的。用  <code>connections</code> 表示集群网络，<code>connections[i] = [a, b]</code> 表示服务器 <code>a</code> 和 <code>b</code> 之间形成连接。任何服务器都可以直接或者间接地通过网络到达任何其他服务器。</p>

<p><strong>关键连接</strong><em> </em>是在该集群中的重要连接，假如我们将它移除，便会导致某些服务器无法访问其他服务器。</p>

<p>请你以任意顺序返回该集群内的所有 <strong>关键连接</strong> 。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/critical-connections-in-a-network.png" style="height: 205px; width: 200px;" /></strong></p>

<pre>
<strong>输入：</strong>n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
<strong>输出：</strong>[[1,3]]
<strong>解释：</strong>[[3,1]] 也是正确的。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>n = 2, connections = [[0,1]]
<b>输出：</b>[[0,1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>n - 1 &lt;= connections.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n - 1</code></li>
<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
<li>不存在重复的连接</li>
</ul>




## 分析

[tarjan](https://zhuanlan.zhihu.com/p/101923309) 算法模版题，求无向图的桥

## 解答

```python
class Solution:
    def criticalConnections(self, n: int, connections: List[List[int]]) -> List[List[int]]:
        def tarjan(u,fa):
            nonlocal t
            dfn[u]=low[u]=t=t+1
            for v in g[u]:
                if not dfn[v]:
                    tarjan(v,u)
                    low[u] = min(low[u],low[v])
                    if low[v]>dfn[u]:
                        bridge.append([u,v])
                elif v!=fa:
                    low[u] = min(low[u],dfn[v])
        g = [[] for _ in range(n)]
        for u,v in connections:
            g[u].append(v)
            g[v].append(u)
        dfn,low,t = [0]*n,[0]*n,0
        bridge = []
        tarjan(0,-1)
        return bridge
```
348 ms

