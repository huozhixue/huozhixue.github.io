# 0834：树中距离之和（★★★）


> **第 84 场周赛第 4 题**

## 题目

给定一个无向、连通的树。树中有 N 个标记为 0...N-1 的节点以及 N-1 条边 。

第 i 条边连接节点 edges[i][0] 和 edges[i][1] 。

返回一个表示节点 i 与其他所有节点距离之和的列表 ans。

说明: 1 <= N <= 10000

示例 1:

    输入: N = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
    输出: [8,12,6,10,10,10]
    解释: 
    如下为给定的树的示意图：
      0
     / \
    1   2
       /|\
      3 4 5
    
    我们可以计算出 dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5) 
    也就是 1 + 1 + 2 + 2 + 2 = 8。 因此，answer[0] = 8，以此类推。


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

