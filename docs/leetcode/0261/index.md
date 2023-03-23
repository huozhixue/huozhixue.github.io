# 0261：以图判树（★）


> <u>**[力扣第 261 题](https://leetcode.cn/problems/graph-valid-tree/)**</u>

## 题目

<p>给定编号从 <code>0</code> 到 <code>n - 1</code> 的 <code>n</code> 个结点。给定一个整数 <code>n</code> 和一个 <code>edges</code> 列表，其中 <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> 表示图中节点 <code>a<sub>i</sub></code> 和 <code>b<sub>i</sub></code> 之间存在一条无向边。</p>

<p>如果这些边能够形成一个合法有效的树结构，则返回 <code>true</code> ，否则返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/12/tree1-graph.jpg" /></p>

<pre>
<strong>输入:</strong> <code>n = 5</code>, edges<code> = [[0,1],[0,2],[0,3],[1,4]]</code>
<strong>输出:</strong> true</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/12/tree2-graph.jpg" /></p>

<pre>
<strong>输入:</strong> <code>n = 5, </code>edges<code> = [[0,1],[1,2],[2,3],[1,3],[1,4]]</code>
<strong>输出:</strong> false</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2000</code></li>
<li><code>0 &lt;= edges.length &lt;= 5000</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; n</code></li>
<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
<li>不存在自循环或重复的边</li>
</ul>


## 分析

只要所有点连通且没有环，即是一棵树。用并查集判断即可。

## 解答

```python
def validTree(self, n: int, edges: List[List[int]]) -> bool:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]
    
    def union(x, y):
        f[find(x)] = find(y)
    
    if len(edges) != n-1:
        return False
    f = list(range(n))
    for u, v in edges:
        if find(u)==find(v):
            return False
        union(u, v)
    return True
```
40 ms
