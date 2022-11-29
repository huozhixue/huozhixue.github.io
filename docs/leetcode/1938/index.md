# 1938：查询最大基因差（★★★）


第 250 场周赛第 4 题

## 题目

给你一棵 n 个节点的有根树，节点编号从 0 到 n - 1 。
每个节点的编号表示这个节点的 独一无二的基因值 （也就是说节点 x 的基因值为 x）。
两个基因值的 基因差 是两者的 异或和 。给你整数数组 parents ，其中 parents[i] 是节点 i 的父节点。
如果节点 x 是树的 根 ，那么 parents[x] == -1 。

给你查询数组 queries ，其中 queries[i] = [nodei, vali] 。
对于查询 i ，请你找到 vali 和 pi 的 最大基因差 ，其中 pi 是节点 nodei 到根之间的任意节点（包含 nodei 和根节点）。
更正式的，你想要最大化 vali XOR pi 。

请你返回数组 ans ，其中 ans[i] 是第 i 个查询的答案。


提示：

- 2 <= parents.length <= 105
- 对于每个 不是 根节点的 i ，有 0 <= parents[i] <= parents.length - 1 。
- parents[root] == -1
- 1 <= queries.length <= 3 * 104
- 0 <= nodei <= parents.length - 1
- 0 <= vali <= 2 * 105

示例 1：

![img](https://assets.leetcode.com/uploads/2021/06/29/c1.png)

    输入：parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]
    输出：[2,3,7]
    解释：查询数组处理如下：
    - [0,2]：最大基因差的对应节点为 0 ，基因差为 2 XOR 0 = 2 。
    - [3,2]：最大基因差的对应节点为 1 ，基因差为 2 XOR 1 = 3 。
    - [2,5]：最大基因差的对应节点为 2 ，基因差为 5 XOR 2 = 7 。

示例 2：

![img](https://assets.leetcode.com/uploads/2021/06/29/c2.png)

    输入：parents = [3,7,-1,2,0,7,0,2], queries = [[4,6],[1,15],[0,5]]
    输出：[6,14,7]
    解释：查询数组处理如下：
    - [4,6]：最大基因差的对应节点为 0 ，基因差为 6 XOR 0 = 6 。
    - [1,15]：最大基因差的对应节点为 1 ，基因差为 15 XOR 1 = 14 。
    - [0,5]：最大基因差的对应节点为 2 ，基因差为 5 XOR 2 = 7 。

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
