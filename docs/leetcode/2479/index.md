# 2479：两个不重叠子树的最大异或值（★★）


> <u>**[力扣第 2479 题](https://leetcode.cn/problems/maximum-xor-of-two-non-overlapping-subtrees/)**</u>

## 题目

<p>有一个无向树，有 <code>n</code> 个节点，节点标记为从 <code>0</code> 到 <code>n - 1</code>。给定整数 <code>n</code> 和一个长度为 <code>n - 1</code> 的 2 维整数数组 <code>edges</code>，其中 <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> 表示在树中的节点 <code>a<sub>i</sub></code> 和 <code>b<sub>i</sub></code> 之间有一条边。树的根节点是标记为 <code>0</code> 的节点。</p>

<p data-group="1-1">每个节点都有一个相关联的 <strong>值</strong>。给定一个长度为 n 的数组 <code>values</code>，其中 <code>values[i]</code> 是第 <code>i</code> 个节点的 <strong>值</strong>。</p>

<p>选择任意两个 <strong>不重叠 </strong>的子树。你的 <strong>分数 </strong>是这些子树中值的和的逐位异或。</p>

<p>返回<em>你能达到的最大分数</em>。<em>如果不可能找到两个不重叠的子树</em>，则返回 <code>0</code>。</p>

<p><strong>注意</strong>：</p>

<ul>
<li>节点的 <strong>子树 </strong>是由该节点及其所有子节点组成的树。</li>
<li>如果两个子树不共享 <strong>任何公共 </strong>节点，则它们是 <strong>不重叠 </strong>的。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/11/22/treemaxxor.png" style="width: 346px; height: 249px;" />
<pre>
<strong>输入:</strong> n = 6, edges = [[0,1],[0,2],[1,3],[1,4],[2,5]], values = [2,8,3,6,2,5]
<strong>输出:</strong> 24
<strong>解释:</strong> 节点 1 的子树的和值为 16，而节点 2 的子树的和值为 8，因此选择这些节点将得到 16 XOR 8 = 24 的分数。可以证明，这是我们能得到的最大可能分数。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/11/22/tree3drawio.png" style="width: 240px; height: 261px;" />
<pre>
<strong>输入:</strong> n = 3, edges = [[0,1],[1,2]], values = [4,6,1]
<strong>输出:</strong> 0
<strong>解释:</strong> 不可能选择两个不重叠的子树，所以我们只返回 0。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>edges.length == n - 1</code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; n</code></li>
<li><code>values.length == n</code></li>
<li><code>1 &lt;= values[i] &lt;= 10<sup>9</sup></code></li>
<li>保证 <code>edges</code> 代表一个有效的树。</li>
</ul>




## 分析

- 异或对问题常用 01字典树
- 为了保证不重叠，dfs 进入时进行计算，返回时才将值添加到字典树中

## 解答

```python
# 01字典树，基于数组
class BitTrie:
    def __init__(self,n,L):                       # 插入总长度 n、最长 L 的二进制串
        self.t = [[0]*(n+1) for _ in range(2)]        
        self.s = [0]*(n+1)
        self.L = L
        self.i = 0

    def add(self, x):
        p = 0
        for j in range(self.L-1, -1, -1):
            b = (x>>j)&1
            if not self.t[b][p]:
                self.t[b][p] = self.i = self.i+1
            p = self.t[b][p]
            self.s[p] += 1
            
    def remove(self,x):
        p = 0
        for j in range(self.L-1,-1,-1):
            b = (x>>j)&1
            p = self.t[b][p]
            self.s[p] -= 1

    def maxxor(self,x):             # 树中与 x 异或的最大值
        res = 0
        p = 0
        for j in range(self.L-1, -1, -1):
            b = (x>>j)&1
            q = self.t[b^1][p]
            if q and self.s[q]:
                res |= 1 << j
                b ^= 1
            p = self.t[b][p]
        return res

class Solution:
    def maxXor(self, n: int, edges: List[List[int]], values: List[int]) -> int:
        g = [[] for _ in range(n)]
        for u,v in edges:
            g[u].append(v)
            g[v].append(u)
        f = values[:]
        def dfs(u,fa):
            for v in g[u]:
                if v!=fa:
                    dfs(v,u)
                    f[u] += f[v]
        dfs(0,-1)
        L = f[0].bit_length()
        trie = BitTrie(n*L,L)
        res = 0
        def dfs(u,fa):
            nonlocal res
            res = max(res,trie.maxxor(f[u]))
            for v in g[u]:
                if v!=fa:
                    dfs(v,u)
            trie.add(f[u])
        dfs(0,-1)
        return res
```
730 ms
