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


**相似问题：**
- [0979：在二叉树中分配硬币（1709 分）](/leetcode/0979)
- [2049：统计最高分的节点数目（1911 分）](/leetcode/2049)
- [2603：收集树中金币（2711 分）](/leetcode/2603)
- [2925：在树上执行操作以后得到的最大分数（1939 分）](/leetcode/2925)
- [3067：在带权树网络中统计可连接服务器对数目（1908 分）](/leetcode/3067)


## 分析

- 典型的换根 dp，通用的方法是先 dfs 一次求出根节点 0 的值，然后再 dfs 一次，根据相邻节点的关系更新其它节点的值
- 本题中，第一次 dfs 时，求节点 u 到所有子节点的距离之和 f[u]
	- 除了知道每个子结点 v 的值 f[v] 外，还需要知道 v 的节点个数
	- 因此维护 sz[u] 表示 u 的节点个数，即可递推
	- dfs 结束后，f[0] 即是节点 0 的最终值
- 第二次 dfs 时，假如已知节点 u 的最终值为 g[u]
	- 对于 u 的子节点 v，v 相比于 u，到 v 的子节点的距离都少了 1，到其它节点的距离都多了 1
	- 因此可以递推 g[v]=g[u]-sz[v]+n-sz[v]

## 解答

```python
class Solution:
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        g = [[] for _ in range(n)]
        for a,b in edges:
            g[a].append(b)
            g[b].append(a)
        res = [0]*n
        sz = [1]*n
        def dfs(u,fa):
            for v in g[u]:
                if v!=fa:
                    dfs(v,u)
                    sz[u] += sz[v]
                    res[u] += res[v]+sz[v]
        dfs(0,-1)
        def dfs(u,fa):
            for v in g[u]:
                if v!=fa:
                    res[v] = res[u]+n-sz[v]-sz[v]
                    dfs(v,u)
        dfs(0,-1)
        return res
```
127 ms

