# 0797：所有可能的路径（1382 分）


> <u>**[力扣第 797 题](https://leetcode.cn/problems/all-paths-from-source-to-target/)**</u>

## 题目

<p>给你一个有 <code>n</code> 个节点的 <strong>有向无环图（DAG）</strong>，请你找出所有从节点 <code>0</code> 到节点 <code>n-1</code> 的路径并输出（<strong>不要求按特定顺序</strong>）</p>

<p><meta charset="UTF-8" /> <code>graph[i]</code> 是一个从节点 <code>i</code> 可以访问的所有节点的列表（即从节点 <code>i</code> 到节点 <code>graph[i][j]</code>存在一条有向边）。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/09/28/all_1.jpg" /></p>

<pre>
<strong>输入：</strong>graph = [[1,2],[3],[3],[]]
<strong>输出：</strong>[[0,1,3],[0,2,3]]
<strong>解释：</strong>有两条路径 0 -&gt; 1 -&gt; 3 和 0 -&gt; 2 -&gt; 3
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/09/28/all_2.jpg" /></p>

<pre>
<strong>输入：</strong>graph = [[4,3,1],[3,2,4],[3],[4],[]]
<strong>输出：</strong>[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == graph.length</code></li>
<li><code>2 &lt;= n &lt;= 15</code></li>
<li><code>0 &lt;= graph[i][j] &lt; n</code></li>
<li><code>graph[i][j] != i</code>（即不存在自环）</li>
<li><code>graph[i]</code> 中的所有元素 <strong>互不相同</strong></li>
<li>保证输入为 <strong>有向无环图（DAG）</strong></li>
</ul>




**相似问题：**
- [1976：到达目的地的方案数（2094 分）](/leetcode/1976)
- [2328：网格图中递增路径的数目（2001 分）](/leetcode/2328)


## 分析

因为无环，所以可以直接递归。

## 解答

```python
def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
	def dfs(i):
		if i==n-1:
			return [[n-1]]
		return [[i]+path for j in graph[i] for path in dfs(j)]

	n = len(graph)
	return dfs(0)
```
72 ms

