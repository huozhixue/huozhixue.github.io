# 1938：查询最大基因差（2502 分）


> <u>**[力扣第 250 场周赛第 4 题](https://leetcode.cn/problems/maximum-genetic-difference-query/)**</u>

## 题目

<p>给你一棵 <code>n</code> 个节点的有根树，节点编号从 <code>0</code> 到 <code>n - 1</code> 。每个节点的编号表示这个节点的 <strong>独一无二的基因值</strong> （也就是说节点 <code>x</code> 的基因值为 <code>x</code>）。两个基因值的 <strong>基因差</strong> 是两者的 <strong>异或和</strong> 。给你整数数组 <code>parents</code> ，其中 <code>parents[i]</code> 是节点 <code>i</code> 的父节点。如果节点 <code>x</code> 是树的 <strong>根</strong> ，那么 <code>parents[x] == -1</code> 。</p>

<p>给你查询数组 <code>queries</code> ，其中 <code>queries[i] = [node<sub>i</sub>, val<sub>i</sub>]</code> 。对于查询 <code>i</code> ，请你找到 <code>val<sub>i</sub></code> 和 <code>p<sub>i</sub></code> 的 <strong>最大基因差</strong> ，其中 <code>p<sub>i</sub></code> 是节点 <code>node<sub>i</sub></code> 到根之间的任意节点（包含 <code>node<sub>i</sub></code> 和根节点）。更正式的，你想要最大化 <code>val<sub>i</sub> XOR p<sub>i</sub></code><sub> </sub>。</p>

<p>请你返回数组<em> </em><code>ans</code> ，其中 <code>ans[i]</code> 是第 <code>i</code> 个查询的答案。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/29/c1.png" style="width: 118px; height: 163px;">
<pre><b>输入：</b>parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]
<b>输出：</b>[2,3,7]
<strong>解释：</strong>查询数组处理如下：
- [0,2]：最大基因差的对应节点为 0 ，基因差为 2 XOR 0 = 2 。
- [3,2]：最大基因差的对应节点为 1 ，基因差为 2 XOR 1 = 3 。
- [2,5]：最大基因差的对应节点为 2 ，基因差为 5 XOR 2 = 7 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/29/c2.png" style="width: 256px; height: 221px;">
<pre><b>输入：</b>parents = [3,7,-1,2,0,7,0,2], queries = [[4,6],[1,15],[0,5]]
<b>输出：</b>[6,14,7]
<strong>解释：</strong>查询数组处理如下：
- [4,6]：最大基因差的对应节点为 0 ，基因差为 6 XOR 0 = 6 。
- [1,15]：最大基因差的对应节点为 1 ，基因差为 15 XOR 1 = 14 。
- [0,5]：最大基因差的对应节点为 2 ，基因差为 5 XOR 2 = 7 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= parents.length &lt;= 10<sup>5</sup></code></li>
<li>对于每个 <strong>不是</strong> 根节点的 <code>i</code> ，有 <code>0 &lt;= parents[i] &lt;= parents.length - 1</code> 。</li>
<li><code>parents[root] == -1</code></li>
<li><code>1 &lt;= queries.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= node<sub>i</sub> &lt;= parents.length - 1</code></li>
<li><code>0 &lt;= val<sub>i</sub> &lt;= 2 * 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [1707：与数组中元素的最大异或值（2358 分）](/leetcode/1707)


## 分析

- 类似 {{< lc "1707" >}}，限制条件从值上界变为了树的路径
- 考虑遍历树并动态维护哈希表或字典树即可
- 注意动态维护过程中不仅有添加，还有删除，因此需要维护前缀的计数

## 解答

```python
class Solution:
    def maxGeneticDifference(self, parents: List[int], queries: List[List[int]]) -> List[int]:
        n = len(parents)
        root = parents.index(-1)
        g = [[] for _ in range(n)]
        for u,v in enumerate(parents):
            if v!=-1:
                g[v].append(u)
        L = max(n-1,max(x for _,x in queries)).bit_length()
        d = defaultdict(list)
        for i,(u,x) in enumerate(queries):
            d[u].append((i,x))
        T = [defaultdict(int) for _ in range(L)]
        res = [0]*len(queries)
        sk = [root]
        while sk:
            u = sk.pop()
            if isinstance(u,str):
                u = int(u)
                for j in range(L):
                    T[j][u>>j] -= 1
                continue
            for j in range(L):
                T[j][u>>j] += 1
            for i,x in d[u]:
                y = 0
                for j in range(L-1,-1,-1):
                    y <<= 1
                    y += T[j][(y+1)^(x>>j)]>0
                res[i] = y
            sk.append(str(u))
            sk.extend(g[u])
        return res
```
2392 ms

## *附加

字典树写法。

```python
class BitTrie:
    def __init__(self,n,L):                       # 插入总长度 n-1、最长 L 的二进制串
        self.t = [[0]*n for _ in range(2)]        # 模拟树节点
        self.i = 0
        self.L = L
        self.s = [0]*n

    def add(self, x):
        p = 0
        for j in range(self.L-1, -1, -1):
            bit = (x>>j)&1
            if not self.t[bit][p]:
                self.i += 1
                self.t[bit][p] = self.i  
            p = self.t[bit][p]
            self.s[p] += 1
            
    def remove(self,x):
        p = 0
        for j in range(self.L-1,-1,-1):
            bit = (x>>j)&1
            p = self.t[bit][p]
            self.s[p]-=1

    def maxxor(self,x):
        p = 0
        res = 0
        for j in range(self.L-1, -1, -1):
            bit = (x>>j)&1
            q = self.t[bit^1][p]
            if q and self.s[q]:
                res |= 1 << j
                bit ^= 1
            p = self.t[bit][p]
        return res

class Solution:
    def maxGeneticDifference(self, parents: List[int], queries: List[List[int]]) -> List[int]:
        n = len(parents)
        root = parents.index(-1)
        g = [[] for _ in range(n)]
        for u,v in enumerate(parents):
            if v!=-1:
                g[v].append(u)
        L = max(n-1,max(x for _,x in queries)).bit_length()
        trie = BitTrie(n*L+1,L)
        d = defaultdict(list)
        for i,(u,x) in enumerate(queries):
            d[u].append((i,x))
        res = [0]*len(queries)
        sk = [root]
        while sk:
            u = sk.pop()
            if isinstance(u,str):
                trie.remove(int(u))
                continue
            trie.add(u)
            for i,x in d[u]:
                res[i] = trie.maxxor(x)
            sk.append(str(u))
            sk.extend(g[u])
        return res
```

2744 ms
