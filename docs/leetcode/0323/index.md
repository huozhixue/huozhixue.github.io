# 0323：无向图中连通分量的数目（★）


> <u>**[力扣第 323 题](https://leetcode.cn/problems/number-of-connected-components-in-an-undirected-graph/)**</u>

## 题目

<p>你有一个包含 <code>n</code> 个节点的图。给定一个整数 <code>n</code> 和一个数组 <code>edges</code> ，其中 <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> 表示图中 <code>a<sub>i</sub></code> 和 <code>b<sub>i</sub></code> 之间有一条边。</p>

<p>返回 <em>图中已连接分量的数目</em> 。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/14/conn1-graph.jpg" /></p>

<pre>
<strong>输入: </strong><code>n = 5</code>, <code>edges = [[0, 1], [1, 2], [3, 4]]</code>
<strong>输出: </strong>2
</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/14/conn2-graph.jpg" /></p>

<pre>
<strong>输入: </strong><code>n = 5,</code> <code>edges = [[0,1], [1,2], [2,3], [3,4]]</code>
<strong>输出:  </strong>1</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2000</code></li>
<li><code>1 &lt;= edges.length &lt;= 5000</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>0 &lt;= a<sub>i</sub> &lt;= b<sub>i</sub> &lt; n</code></li>
<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
<li><code>edges</code> 中不会出现重复的边</li>
</ul>


## 分析

典型的并查集，最后计算块的个数即可。

## 解答

```python
def countComponents(self, n: int, edges: List[List[int]]) -> int:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    f = list(range(n))
    for u, v in edges:
        union(u, v)
    return len({find(x) for x in range(n)})
```
56 ms



