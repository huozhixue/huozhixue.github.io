# 0834：树中距离之和（2197 分）


> <u>**[力扣第 84 场周赛第 4 题](https://leetcode.cn/problems/sum-of-distances-in-tree/)**</u>

## 题目

<p>给定一个无向、连通的树。树中有 <code>n</code> 个标记为 <code>0...n-1</code> 的节点以及 <code>n-1</code> 条边 。</p>

<p>给定整数 <code>n</code> 和数组 <code>edges</code> ， <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code>表示树中的节点 <code>a<sub>i</sub></code> 和 <code>b<sub>i</sub></code> 之间有一条边。</p>

<p>返回长度为 <code>n</code> 的数组 <code>answer</code> ，其中 <code>answer[i]</code> 是树中第 <code>i</code> 个节点与所有其他节点之间的距离之和。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/23/lc-sumdist1.jpg" /></p>

<pre>
<strong>输入: </strong>n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
<strong>输出: </strong>[8,12,6,10,10,10]
<strong>解释: </strong>树如图所示。
我们可以计算出 dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
也就是 1 + 1 + 2 + 2 + 2 = 8。 因此，answer[0] = 8，以此类推。
</pre>

<p><strong>示例 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-sumdist2.jpg" />
<pre>
<strong>输入:</strong> n = 1, edges = []
<strong>输出:</strong> [0]
</pre>

<p><strong>示例 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-sumdist3.jpg" />
<pre>
<strong>输入:</strong> n = 2, edges = [[1,0]]
<strong>输出:</strong> [1,1]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>edges.length == n - 1</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; n</code></li>
<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
<li>给定的输入保证为有效的树</li>
</ul>


## 分析

为了方便，考虑节点 0 为根的树形式。显然相邻节点对应的答案有很大联系，考虑递推。

若 u 是 v 的父节点，那么对于任意 v 的子节点 x（包括 v），dist(v,x)=dist(u,x)-1。
对于其它节点 x （包括 u），dist(v,x)=dist(u,x)+1。

因此令 cnt[v] 代表 v 的子节点个数，则 ans[v]=ans[u]-cnt[v]+(n-cnt[v])。

那么先一遍 dfs 从下往上求出 ans[0] 和 cnt 数组，再一遍 dfs 从上往下即可求出 ans 数组。

## 解答

```python
def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
    def dfs1(u, f):
        for v in nxt[u]:
            if v != f:
                dfs1(v, u)
                ans[u] += ans[v] + cnt[v]
                cnt[u] += cnt[v]

    def dfs2(u, f):
        for v in nxt[u]:
            if v != f:
                ans[v] = ans[u] + n - 2 * cnt[v]
                dfs2(v, u)

    nxt = defaultdict(list)
    for u, v in edges:
        nxt[u].append(v)
        nxt[v].append(u)
    ans, cnt = [0] * n, [1] * n
    dfs1(0, -1)
    dfs2(0, -1)
    return ans
```
296 ms

