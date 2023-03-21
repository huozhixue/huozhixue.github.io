# 0547：省份数量（★）


> <u>**[力扣第 547 题](https://leetcode.cn/problems/number-of-provinces/)**</u>

## 题目

<div class="original__bRMd">
<div>
<p>有 <code>n</code> 个城市，其中一些彼此相连，另一些没有相连。如果城市 <code>a</code> 与城市 <code>b</code> 直接相连，且城市 <code>b</code> 与城市 <code>c</code> 直接相连，那么城市 <code>a</code> 与城市 <code>c</code> 间接相连。</p>

<p><strong>省份</strong> 是一组直接或间接相连的城市，组内不含其他没有相连的城市。</p>

<p>给你一个 <code>n x n</code> 的矩阵 <code>isConnected</code> ，其中 <code>isConnected[i][j] = 1</code> 表示第 <code>i</code> 个城市和第 <code>j</code> 个城市直接相连，而 <code>isConnected[i][j] = 0</code> 表示二者不直接相连。</p>

<p>返回矩阵中 <strong>省份</strong> 的数量。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/graph1.jpg" style="width: 222px; height: 142px;" />
<pre>
<strong>输入：</strong>isConnected = [[1,1,0],[1,1,0],[0,0,1]]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/graph2.jpg" style="width: 222px; height: 142px;" />
<pre>
<strong>输入：</strong>isConnected = [[1,0,0],[0,1,0],[0,0,1]]
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 200</code></li>
<li><code>n == isConnected.length</code></li>
<li><code>n == isConnected[i].length</code></li>
<li><code>isConnected[i][j]</code> 为 <code>1</code> 或 <code>0</code></li>
<li><code>isConnected[i][i] == 1</code></li>
<li><code>isConnected[i][j] == isConnected[j][i]</code></li>
</ul>
</div>
</div>


## 分析

即是求无向图的连通分量数，可以通过遍历求解，bfs 和 dfs 都可以。

不过一般这类问题用并查集，更直观。

## 解答

```python
def findCircleNum(self, isConnected: List[List[int]]) -> int:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    n = len(isConnected)
    f = list(range(n))
    for i, j in product(range(n), range(n)):
        if isConnected[i][j]:
            union(i, j)
    return sum(f[i] == i for i in range(n))
```
188 ms
