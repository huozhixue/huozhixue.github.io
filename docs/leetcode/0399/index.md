# 0399：除法求值（★）


> <u>**[力扣第 399 题](https://leetcode.cn/problems/evaluate-division/)**</u>

## 题目

<p>给你一个变量对数组 <code>equations</code> 和一个实数值数组 <code>values</code> 作为已知条件，其中 <code>equations[i] = [A<sub>i</sub>, B<sub>i</sub>]</code> 和 <code>values[i]</code> 共同表示等式 <code>A<sub>i</sub> / B<sub>i</sub> = values[i]</code> 。每个 <code>A<sub>i</sub></code> 或 <code>B<sub>i</sub></code> 是一个表示单个变量的字符串。</p>

<p>另有一些以数组 <code>queries</code> 表示的问题，其中 <code>queries[j] = [C<sub>j</sub>, D<sub>j</sub>]</code> 表示第 <code>j</code> 个问题，请你根据已知条件找出 <code>C<sub>j</sub> / D<sub>j</sub> = ?</code> 的结果作为答案。</p>

<p>返回 <strong>所有问题的答案</strong> 。如果存在某个无法确定的答案，则用 <code>-1.0</code> 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 <code>-1.0</code> 替代这个答案。</p>

<p><strong>注意：</strong>输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。</p>

<p><strong>注意：</strong>未在等式列表中出现的变量是未定义的，因此无法确定它们的答案。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
<strong>输出：</strong>[6.00000,0.50000,-1.00000,1.00000,-1.00000]
<strong>解释：</strong>
条件：<em>a / b = 2.0</em>, <em>b / c = 3.0</em>
问题：<em>a / c = ?</em>, <em>b / a = ?</em>, <em>a / e = ?</em>, <em>a / a = ?</em>, <em>x / x = ?</em>
结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
注意：x 是未定义的 =&gt; -1.0</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
<strong>输出：</strong>[3.75000,0.40000,5.00000,0.20000]
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
<strong>输出：</strong>[0.50000,2.00000,-1.00000,-1.00000]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= equations.length &lt;= 20</code></li>
<li><code>equations[i].length == 2</code></li>
<li><code>1 &lt;= A<sub>i</sub>.length, B<sub>i</sub>.length &lt;= 5</code></li>
<li><code>values.length == equations.length</code></li>
<li><code>0.0 &lt; values[i] &lt;= 20.0</code></li>
<li><code>1 &lt;= queries.length &lt;= 20</code></li>
<li><code>queries[i].length == 2</code></li>
<li><code>1 &lt;= C<sub>j</sub>.length, D<sub>j</sub>.length &lt;= 5</code></li>
<li><code>A<sub>i</sub>, B<sub>i</sub>, C<sub>j</sub>, D<sub>j</sub></code> 由小写英文字母与数字组成</li>
</ul>


## 分析

### #1

- 将等式看作边 (a, b)，value 看作边的权重，反向边 (b, a) 的权重为 1/value
- 问题就相当于找到从 c 到 d 在图中的路径，计算路径的权重乘积
- 可以用 bfs/dfs 查找每个问题的路径

```python
class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        def bfs(c,d):
            if c not in g or d not in g:
                return -1.0
            Q = deque([(1.0,c)])
            vis = {c}
            while Q:
                w,u = Q.popleft()
                if u==d:
                    return w
                for v,w2 in g[u]:
                    if v not in vis:
                        vis.add(v)
                        Q.append((w*w2,v))
            return -1.0
        g = defaultdict(list)
        for (a,b),w in zip(equations,values):
            g[a].append((b,w))
            g[b].append((a,1/w))
        return [bfs(c,d) for c,d in queries]
```
33 ms

### #2

- 更节省时间的做法是并查集
- 每个节点维护到父节点的权重
- 注意路径压缩和合并时都要同步更新


## 解答

```python
class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        def find(x):
            if f.setdefault(x,x)!=x:
                fx = find(f[x])
                g[x] *= g[f[x]]
                f[x] = fx 
            return f[x]
        
        def union(x,y,w):
            fx,fy = find(x),find(y)
            if fx!=fy:
                f[fx] = fy
                g[fx] = g[y]*w/g[x]

        f,g = {},defaultdict(lambda:1.0)
        for (a,b),w in zip(equations,values):
            union(a,b,w)
        res = []
        for c,d in queries:
            if c not in f or d not in f or find(c)!=find(d):
                res.append(-1)
            else:
                res.append(g[c]/g[d])
        return res
```


