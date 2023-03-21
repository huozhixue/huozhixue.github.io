# 1857：有向图中最大颜色值（★★）


> <u>**[力扣第 240 场周赛第 4 题](https://leetcode.cn/problems/largest-color-value-in-a-directed-graph/)**</u>

## 题目

<p>给你一个 <strong>有向图</strong> ，它含有 <code>n</code> 个节点和 <code>m</code> 条边。节点编号从 <code>0</code> 到 <code>n - 1</code> 。</p>

<p>给你一个字符串 <code>colors</code> ，其中 <code>colors[i]</code> 是小写英文字母，表示图中第 <code>i</code> 个节点的 <b>颜色</b> （下标从 <strong>0</strong> 开始）。同时给你一个二维数组 <code>edges</code> ，其中 <code>edges[j] = [a<sub>j</sub>, b<sub>j</sub>]</code> 表示从节点 <code>a<sub>j</sub></code> 到节点 <code>b<sub>j</sub></code><sub> </sub>有一条 <strong>有向边</strong> 。</p>

<p>图中一条有效 <strong>路径</strong> 是一个点序列 <code>x<sub>1</sub> -&gt; x<sub>2</sub> -&gt; x<sub>3</sub> -&gt; ... -&gt; x<sub>k</sub></code> ，对于所有 <code>1 &lt;= i &lt; k</code> ，从 <code>x<sub>i</sub></code> 到 <code>x<sub>i+1</sub></code> 在图中有一条有向边。路径的 <strong>颜色值</strong> 是路径中 <strong>出现次数最多</strong> 颜色的节点数目。</p>

<p>请你返回给定图中有效路径里面的 <strong>最大颜色值</strong><strong> 。</strong>如果图中含有环，请返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/04/21/leet1.png" style="width: 400px; height: 182px;"></p>

<pre><b>输入：</b>colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
<b>输出：</b>3
<b>解释：</b>路径 0 -&gt; 2 -&gt; 3 -&gt; 4 含有 3 个颜色为 <code>"a" 的节点（上图中的红色节点）。</code>
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/04/21/leet2.png" style="width: 85px; height: 85px;"></p>

<pre><b>输入：</b>colors = "a", edges = [[0,0]]
<b>输出：</b>-1
<b>解释：</b>从 0 到 0 有一个环。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == colors.length</code></li>
<li><code>m == edges.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= m &lt;= 10<sup>5</sup></code></li>
<li><code>colors</code> 只含有小写英文字母。</li>
<li><code>0 &lt;= a<sub>j</sub>, b<sub>j</sub> &lt; n</code></li>
</ul>


## 分析

要判断环，容易想到用拓扑排序。

若没有环，那么对于有向无环图，可以考虑用递归：
- 问题中要求路径中的最大颜色值，不好直接递归。容易递归的是每种颜色的最大值。
- 假设路径中的最大颜色值是 cnt，对应的颜色为 x，那么显然颜色 x 的最大值就是 cnt，其它颜色的最大值 <= cnt。
- 因此 max(每种颜色的最大值) 即为所求。

> 注意到拓扑排序出队的顺序和递推的顺序其实是一致的，因此可以同时进行。

## 解答

```python
def largestPathValue(self, colors: str, edges: List[List[int]]) -> int:
    n = len(colors)
    nxt, indeg = defaultdict(list), [0]*n
    for u, v in edges:
        nxt[u].append(v)
        indeg[v] += 1
    res, dp = 0, [defaultdict(int) for _ in range(n)]
    queue = deque(u for u in range(n) if indeg[u]==0)
    while queue:
        u = queue.popleft()
        dp[u][colors[u]] += 1
        res = max(res, dp[u][colors[u]])
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
            for c in dp[u]:
                dp[v][c] = max(dp[v][c], dp[u][c])
    return res if all(indeg[u]==0 for u in range(n)) else -1
```
1812 ms

