# 1557：可以到达所有点的最少点数目（1512 分）


> <u>**[力扣第 33 场双周赛第 2 题](https://leetcode.cn/problems/minimum-number-of-vertices-to-reach-all-nodes/)**</u>

## 题目

<p>给你一个 <strong>有向无环图</strong> ， <code>n</code> 个节点编号为 <code>0</code> 到 <code>n-1</code> ，以及一个边数组 <code>edges</code> ，其中 <code>edges[i] = [from<sub>i</sub>, to<sub>i</sub>]</code> 表示一条从点  <code>from<sub>i</sub></code> 到点 <code>to<sub>i</sub></code> 的有向边。</p>

<p>找到最小的点集使得从这些点出发能到达图中所有点。题目保证解存在且唯一。</p>

<p>你可以以任意顺序返回这些节点编号。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/08/22/5480e1.png" style="height: 181px; width: 231px;"></p>

<pre><strong>输入：</strong>n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
<strong>输出：</strong>[0,3]
<strong>解释：</strong>从单个节点出发无法到达所有节点。从 0 出发我们可以到达 [0,1,2,5] 。从 3 出发我们可以到达 [3,4,2,5] 。所以我们输出 [0,3] 。</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/08/22/5480e2.png" style="height: 201px; width: 201px;"></p>

<pre><strong>输入：</strong>n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]
<strong>输出：</strong>[0,2,3]
<strong>解释：</strong>注意到节点 0，3 和 2 无法从其他节点到达，所以我们必须将它们包含在结果点集中，这些点都能到达节点 1 和 4 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 10^5</code></li>
<li><code>1 &lt;= edges.length &lt;= min(10^5, n * (n - 1) / 2)</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>0 &lt;= from<sub>i,</sub> to<sub>i</sub> &lt; n</code></li>
<li>所有点对 <code>(from<sub>i</sub>, to<sub>i</sub>)</code> 互不相同。</li>
</ul>


## 分析

显然入度为 0 的节点无法由其他节点到达，所以必须在结果点集中。入度不为 0 的节点可以由其它节点到达，因此不需要添加。
所以返回所有入度为 0 的节点即可。


## 解答

```python
def findSmallestSetOfVertices(self, n: int, edges: List[List[int]]) -> List[int]:
	Set = set(b for _, b in edges)
	return [i for i in range(n) if i not in Set]
```

124 ms


