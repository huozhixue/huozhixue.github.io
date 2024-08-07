# 2192：有向无环图中一个节点的所有祖先（1787 分）


> <u>**[力扣第 73 场双周赛第 3 题](https://leetcode.cn/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/)**</u>

## 题目

<p>给你一个正整数 <code>n</code> ，它表示一个 <strong>有向无环图</strong> 中节点的数目，节点编号为 <code>0</code> 到 <code>n - 1</code> （包括两者）。</p>

<p>给你一个二维整数数组 <code>edges</code> ，其中 <code>edges[i] = [from<sub>i</sub>, to<sub>i</sub>]</code> 表示图中一条从 <code>from<sub>i</sub></code> 到 <code>to<sub>i</sub></code> 的单向边。</p>

<p>请你返回一个数组 <code>answer</code>，其中<em> </em><code>answer[i]</code>是第 <code>i</code> 个节点的所有 <strong>祖先</strong> ，这些祖先节点 <strong>升序</strong> 排序。</p>

<p>如果 <code>u</code> 通过一系列边，能够到达 <code>v</code> ，那么我们称节点 <code>u</code> 是节点 <code>v</code> 的 <strong>祖先</strong> 节点。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/12/12/e1.png" style="width: 322px; height: 265px;"></p>

<pre><b>输入：</b>n = 8, edgeList = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
<b>输出：</b>[[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
<strong>解释：</strong>
上图为输入所对应的图。
- 节点 0 ，1 和 2 没有任何祖先。
- 节点 3 有 2 个祖先 0 和 1 。
- 节点 4 有 2 个祖先 0 和 2 。
- 节点 5 有 3 个祖先 0 ，1 和 3 。
- 节点 6 有 5 个祖先 0 ，1 ，2 ，3 和 4 。
- 节点 7 有 4 个祖先 0 ，1 ，2 和 3 。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/12/12/e2.png" style="width: 343px; height: 299px;"></p>

<pre><b>输入：</b>n = 5, edgeList = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
<b>输出：</b>[[],[0],[0,1],[0,1,2],[0,1,2,3]]
<strong>解释：</strong>
上图为输入所对应的图。
- 节点 0 没有任何祖先。
- 节点 1 有 1 个祖先 0 。
- 节点 2 有 2 个祖先 0 和 1 。
- 节点 3 有 3 个祖先 0 ，1 和 2 。
- 节点 4 有 4 个祖先 0 ，1 ，2 和 3 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
<li><code>0 &lt;= edges.length &lt;= min(2000, n * (n - 1) / 2)</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>0 &lt;= from<sub>i</sub>, to<sub>i</sub> &lt;= n - 1</code></li>
<li><code>from<sub>i</sub> != to<sub>i</sub></code></li>
<li>图中不会有重边。</li>
<li>图是 <strong>有向</strong> 且 <strong>无环</strong> 的。</li>
</ul>


**相似问题：**
- [1786：从第一个节点出发到最后一个节点的受限路径数（2078 分）](/leetcode/1786)


## 分析

有向无环图可以直接递归。


## 解答

```python
def getAncestors(self, n: int, edges: List[List[int]]) -> List[List[int]]:
    @lru_cache(None)
    def dfs(u):
        return sorted({vv for v in nxt[u] for vv in dfs(v)+[v]})

    nxt = defaultdict(list)
    for v, u in edges:
        nxt[u].append(v)
    return [dfs(i) for i in range(n)]
```
164 ms
