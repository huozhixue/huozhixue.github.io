# 2277：树中最接近路径的节点（★★）


> <u>**[力扣第 2277 题](https://leetcode.cn/problems/closest-node-to-path-in-tree/)**</u>

## 题目

<p>给定一个正整数 <code>n</code>，表示树中的节点数，编号从 <code>0</code> 到 <code>n - 1</code> (<strong>含边界</strong>)。还给定一个长度为 <code>n - 1</code> 的二维整数数组 <code>edges</code>，其中 <code>edges[i] = [node1<sub>i</sub>, node2<sub>i</sub>]</code> 表示有一条 <strong>双向 </strong>边连接树中的 <code>node1<sub>i</sub></code> 和 <code>node2<sub>i</sub></code>。</p>

<p>给定一个长度为 <code>m</code> ，<strong>下标从 0 开始</strong> 的整数数组 <code>query</code>，其中 <code>query[i] = [start<sub>i</sub>, end<sub>i</sub>, node<sub>i</sub>]</code> 意味着对于第 <code>i</code> 个查询，您的任务是从 <code>start<sub>i</sub></code> 到 <code>end<sub>i</sub></code> 的路径上找到 <strong>最接近</strong> <code>node<sub>i</sub></code><sub> </sub>的节点。</p>

<p>返回<em>长度为 <code>m</code> 的整数数组 </em><code>answer</code><em>，其中 </em><code>answer[i]</code> <em>是第 <code>i</code> 个查询的答案。</em></p>



<p><strong class="example">示例 1:</strong></p>
<img src="https://assets.leetcode.com/uploads/2022/05/14/image-20220514132158-1.png" style="width: 300px; height: 211px;" />
<pre>
<strong>输入:</strong> n = 7, edges = [[0,1],[0,2],[0,3],[1,4],[2,5],[2,6]], query = [[5,3,4],[5,3,6]]
<strong>输出:</strong> [0,2]
<strong>解释:</strong>
节点 5 到节点 3 的路径由节点 5、2、0、3 组成。
节点 4 到节点 0 的距离为 2。
节点 0 是距离节点 4 最近的路径上的节点，因此第一个查询的答案是 0。
节点 6 到节点 2 的距离为 1。
节点 2 是距离节点 6 最近的路径上的节点，因此第二个查询的答案是 2。
</pre>

<p><strong class="example">示例 2:</strong></p>
<img src="https://assets.leetcode.com/uploads/2022/05/14/image-20220514132318-2.png" style="width: 300px; height: 89px;" />
<pre>
<strong>输入:</strong> n = 3, edges = [[0,1],[1,2]], query = [[0,1,2]]
<strong>输出:</strong> [1]
<strong>解释:</strong>
从节点 0 到节点 1 的路径由节点 0,1 组成。
节点 2 到节点 1 的距离为 1。
节点 1 是距离节点 2 最近的路径上的节点，因此第一个查询的答案是 1。
</pre>

<p><strong class="example">示例 3:</strong></p>
<img src="https://assets.leetcode.com/uploads/2022/05/14/image-20220514132333-3.png" style="width: 300px; height: 89px;" />
<pre>
<strong>输入:</strong> n = 3, edges = [[0,1],[1,2]], query = [[0,0,0]]
<strong>输出:</strong> [0]
<strong>解释:</strong>
节点 0 到节点 0 的路径由节点 0 组成。
因为 0 是路径上唯一的节点，所以第一个查询的答案是0。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
<li><code>edges.length == n - 1</code></li>
<li><code>edges[i].length == 2</code></li>
<li><code>0 &lt;= node1<sub>i</sub>, node2<sub>i</sub> &lt;= n - 1</code></li>
<li><code>node1<sub>i</sub> != node2<sub>i</sub></code></li>
<li><code>1 &lt;= query.length &lt;= 1000</code></li>
<li><code>query[i].length == 3</code></li>
<li><code>0 &lt;= start<sub>i</sub>, end<sub>i</sub>, node<sub>i</sub> &lt;= n - 1</code></li>
<li>
<p data-group="1-1">这个图是一个树。</p>
</li>
</ul>


**相似问题：**
- [2581：统计可能的树根数目（2228 分）](/leetcode/2581)
- [2642：设计可以求最短路径的图类（1810 分）](/leetcode/2642)


## 分析

- 等价于找三条路径的交点
- 一种方法是分别求出 a=lca(x,y),b=lca(x,z),c=lca(y,z)，a^b^c 即是交点

## 解答

```python
# 倍增求 lca
class LCA:
    def __init__(self,edges):
        n = len(edges)+1
        m = n.bit_length()
        g = [[] for _ in range(n)]
        for u,v in edges: 
            g[u].append(v)
            g[v].append(u)
        self.D = D = [0]*n
        self.f = f = [[-1]*m for _ in range(n)]
        sk = [0]
        while sk:
            u = sk.pop()
            for v in g[u]:
                if v!=f[u][0]:
                    sk.append(v)
                    f[v][0] = u
                    D[v] = D[u]+1
        for i in range(m-1):
            for u in range(n):
                p = f[u][i]
                if p!=-1:
                    f[u][i+1] = f[p][i]
    
    def kth(self,x,k):
        for i in range(k.bit_length()):
            if k>>i&1:
                x = self.f[x][i]
        return x
    
    def get(self,x,y):
        f,D = self.f,self.D
        if D[x]>D[y]:
            x,y = y,x
        y = self.kth(y,D[y]-D[x])
        if x!=y:
            for i in range(len(f[x])-1,-1,-1):
                px,py = f[x][i],f[y][i]
                if px!=py:
                    x,y = px,py
            x = f[x][0]
        return x

class Solution:
    def closestNode(self, n: int, edges: List[List[int]], query: List[List[int]]) -> List[int]:
        def cal(u,v,x):
            a,b,c = lca.get(u,v),lca.get(u,x),lca.get(v,x)
            return a^b^c
        lca = LCA(edges)
        return [cal(u,v,x) for u,v,x in query]
```

16 ms
