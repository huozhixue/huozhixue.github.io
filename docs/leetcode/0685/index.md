# 0685：冗余连接 II（★★）


> <u>**[力扣第 685 题](https://leetcode.cn/problems/redundant-connection-ii/)**</u>

## 题目

<p>在本问题中，有根树指满足以下条件的 <strong>有向</strong> 图。该树只有一个根节点，所有其他节点都是该根节点的后继。该树除了根节点之外的每一个节点都有且只有一个父节点，而根节点没有父节点。</p>

<p>输入一个有向图，该图由一个有着 <code>n</code> 个节点（节点值不重复，从 <code>1</code> 到 <code>n</code>）的树及一条附加的有向边构成。附加的边包含在 <code>1</code> 到 <code>n</code> 中的两个不同顶点间，这条附加的边不属于树中已存在的边。</p>

<p>结果图是一个以边组成的二维数组 <code>edges</code> 。 每个元素是一对 <code>[u<sub>i</sub>, v<sub>i</sub>]</code>，用以表示 <strong>有向 </strong>图中连接顶点 <code>u<sub>i</sub></code> 和顶点 <code>v<sub>i</sub></code> 的边，其中 <code>u<sub>i</sub></code> 是 <code>v<sub>i</sub></code> 的一个父节点。</p>

<p>返回一条能删除的边，使得剩下的图是有 <code>n</code> 个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/graph1.jpg" style="width: 222px; height: 222px;" />
<pre>
<strong>输入：</strong>edges = [[1,2],[1,3],[2,3]]
<strong>输出：</strong>[2,3]
</pre>

<p><strong class="example">示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/graph2.jpg" style="width: 222px; height: 382px;" />
<pre>
<strong>输入：</strong>edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
<strong>输出：</strong>[4,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == edges.length</code></li>
<li><code>3 &lt;= n &lt;= 1000</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>1 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n</code></li>
</ul>


**相似问题：**
- [0684：冗余连接](/leetcode/0684)


## 分析

- 显然有根树等价于所有节点连通，且只有一个节点入度为 0，其它节点入度都为 1
- 输入的图有两种情况：
	- 多余的边指向根节点：所有节点的入度都为 1 ，存在一个环，删除环中任意一条边即可
	- 多余的边指向其它节点 v：只有节点 v 的入度为 2，应选择一条指向 v 的边删除
- 因此可以先遍历边，统计入度
	- 若有节点 v 的入度为 2，遍历指向 v 的边，假如去掉该边不影响连通性，即可删除
	- 若没有节点 v 的入度为 2，转为 {{< lc "0684" >}} 

## 解答

```python
class Solution:
    def findRedundantDirectedConnection(self, edges: List[List[int]]) -> List[int]:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        def union(x, y):
            f[find(x)] = find(y)

        def check(u, v):
            for x, y in edges:
                if (x, y) != (u, v):
                    union(x-1,y-1)
            return len({find(i) for i in range(n)})==1

        n = len(edges)
        f, d = list(range(n)), {}
        for u,v in edges:
            if v in d:
                return [u,v] if check(u,v) else [d[v],v]
            d[v] = u
        for u,v in edges:
            if find(u-1)==find(v-1):
                return [u,v]
            union(u-1,v-1)
```
7 ms



