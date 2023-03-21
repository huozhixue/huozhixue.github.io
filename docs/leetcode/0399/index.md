# 0399：除法求值（★）


> <u>**[力扣第 4 场周赛第 4 题](https://leetcode.cn/problems/evaluate-division/)**</u>

## 题目

<p>给你一个变量对数组 <code>equations</code> 和一个实数值数组 <code>values</code> 作为已知条件，其中 <code>equations[i] = [A<sub>i</sub>, B<sub>i</sub>]</code> 和 <code>values[i]</code> 共同表示等式 <code>A<sub>i</sub> / B<sub>i</sub> = values[i]</code> 。每个 <code>A<sub>i</sub></code> 或 <code>B<sub>i</sub></code> 是一个表示单个变量的字符串。</p>

<p>另有一些以数组 <code>queries</code> 表示的问题，其中 <code>queries[j] = [C<sub>j</sub>, D<sub>j</sub>]</code> 表示第 <code>j</code> 个问题，请你根据已知条件找出 <code>C<sub>j</sub> / D<sub>j</sub> = ?</code> 的结果作为答案。</p>

<p>返回 <strong>所有问题的答案</strong> 。如果存在某个无法确定的答案，则用 <code>-1.0</code> 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 <code>-1.0</code> 替代这个答案。</p>

<p><strong>注意：</strong>输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
<strong>输出：</strong>[6.00000,0.50000,-1.00000,1.00000,-1.00000]
<strong>解释：</strong>
条件：<em>a / b = 2.0</em>, <em>b / c = 3.0</em>
问题：<em>a / c = ?</em>, <em>b / a = ?</em>, <em>a / e = ?</em>, <em>a / a = ?</em>, <em>x / x = ?</em>
结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
<strong>输出：</strong>[3.75000,0.40000,5.00000,0.20000]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
<strong>输出：</strong>[0.50000,2.00000,-1.00000,-1.00000]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= equations.length <= 20</code></li>
<li><code>equations[i].length == 2</code></li>
<li><code>1 <= A<sub>i</sub>.length, B<sub>i</sub>.length <= 5</code></li>
<li><code>values.length == equations.length</code></li>
<li><code>0.0 < values[i] <= 20.0</code></li>
<li><code>1 <= queries.length <= 20</code></li>
<li><code>queries[i].length == 2</code></li>
<li><code>1 <= C<sub>j</sub>.length, D<sub>j</sub>.length <= 5</code></li>
<li><code>A<sub>i</sub>, B<sub>i</sub>, C<sub>j</sub>, D<sub>j</sub></code> 由小写英文字母与数字组成</li>
</ul>


## 分析

### #1

将等式看作边 (a, b)，value 看作边的权重，同时反向边 (b, a) 的权重为 1/value。
那么问题就相当于找到从 c 到 d 在图中的路径，计算路径的权重乘积。

因为数据规模较小，所以可以对每个问题进行遍历查找，bfs 或 dfs 都可以。

```python
def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
    def bfs(c, d):
        queue, vis = deque([(c, 1.0)]), set()
        while queue:
            u, w = queue.popleft()
            for v, w2 in nxt[u]:
                if v not in vis:
                    if v == d:
                        return w * w2
                    vis.add(v)
                    queue.append((v, w * w2))
        return -1

    nxt = defaultdict(list)
    for (a, b), value in zip(equations, values):
        nxt[a].append((b, value))
        nxt[b].append((a, 1/value))
    return [bfs(c, d) for c, d in queries]
```
36 ms

### #2

更节省时间的做法是并查集。每个节点维护到父节点的权重，注意路径压缩和合并时都要同步更新。

最终查询 c、d 的比值时，如果 c、d 都出现过且连通，那么 c、d 路径压缩后的权重比值即为所求。

## 解答

```python
def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
    def find(x):
        if f.setdefault(x, x) != x:
            root = find(f[x])
            w[x] *= w[f[x]]
            f[x] = root
        return f[x]

    def union(x, y, val):
        root = find(x)
        f[root] = find(y)
        w[root] = w[y] * val / w[x]

    f, w = {}, defaultdict(lambda: 1.0)
    for (a, b), val in zip(equations, values):
        union(a, b, val)
    return [w[c]/w[d] if c in f and d in f and find(c)==find(d) else -1 for c, d in queries]
```
28 ms


