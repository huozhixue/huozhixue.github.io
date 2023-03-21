# 1938：查询最大基因差（★★）


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


## 分析

类似 {{< lc "1707" >}}，只不过限制条件从数组上界变为了树的路径。
考虑遍历树的节点 node 时动态维护哈希表或字典树，即可回答 node 对应的查询。

注意动态维护过程中不仅有添加，还有删除，因此需要维护前缀的计数。

这里用更简单的哈希表方法。

## 解答

```python
def maxGeneticDifference(self, parents: List[int], queries: List[List[int]]) -> List[int]:
    def find(x):
        ans = 0
        for j in range(17, -1, -1):
            ans <<= 1
            ans += 1 if A[j][(ans+1)^(x>>j)] else 0
        return ans

    def dfs(u):
        for v in nxt[u]:
            for j in range(18):
                A[j][v >> j] += 1
            for i, val in qr[v]:
                res[i] = find(val)
            dfs(v)
            for j in range(18):
                A[j][v >> j] -= 1

    nxt = defaultdict(list)
    for v, u in enumerate(parents):
        nxt[u].append(v)
    qr = defaultdict(list)
    for i, (node,val) in enumerate(queries):
        qr[node].append((i, val))
    A = [defaultdict(int) for _ in range(18)]
    res = [0] * len(queries)
    dfs(-1)
    return res
```

3476 ms

## *附加

字典树写法。

```python
def maxGeneticDifference(self, parents: List[int], queries: List[List[int]]) -> List[int]:
    def find(x):
        ans, p = '', trie
        for bit in bin(x)[2:].zfill(18):
            bit_rev = str(int(bit)^1)
            ans += '1' if p[bit_rev].get('cnt') else '0'
            p = p[bit_rev] if p[bit_rev].get('cnt') else p[bit]
        return int(ans, 2)

    def dfs(u):
        for v in nxt[u]:
            p = trie
            for bit in bin(v)[2:].zfill(18):
                p = p[bit]
                p['cnt'] = p.get('cnt', 0) + 1
            for i, val in qr[v]:
                res[i] = find(val)
            dfs(v)
            p = trie
            for bit in bin(v)[2:].zfill(18):
                p = p[bit]
                p['cnt'] -= 1

    nxt = defaultdict(list)
    for v, u in enumerate(parents):
        nxt[u].append(v)
    qr = defaultdict(list)
    for i, (node,val) in enumerate(queries):
        qr[node].append((i, val))
    T = lambda: defaultdict(T)
    trie = T()
    res = [0] * len(queries)
    dfs(-1)
    return res
```

4444 ms
