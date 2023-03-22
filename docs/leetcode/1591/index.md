# 1591：奇怪的打印机 II（★★★）


> <u>**[力扣第 35 场双周赛第 4 题](https://leetcode.cn/problems/strange-printer-ii/)**</u>

## 题目

<p>给你一个奇怪的打印机，它有如下两个特殊的打印规则：</p>

<ul>
<li>每一次操作时，打印机会用同一种颜色打印一个矩形的形状，每次打印会覆盖矩形对应格子里原本的颜色。</li>
<li>一旦矩形根据上面的规则使用了一种颜色，那么 <strong>相同的颜色不能再被使用 </strong>。</li>
</ul>

<p>给你一个初始没有颜色的 <code>m x n</code> 的矩形 <code>targetGrid</code> ，其中 <code>targetGrid[row][col]</code> 是位置 <code>(row, col)</code> 的颜色。</p>

<p>如果你能按照上述规则打印出矩形<em> </em><code>targetGrid</code> ，请你返回 <code>true</code> ，否则返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/09/19/sample_1_1929.png" style="height: 138px; width: 483px;"></p>

<pre><strong>输入：</strong>targetGrid = [[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/09/19/sample_2_1929.png" style="height: 290px; width: 483px;"></p>

<pre><strong>输入：</strong>targetGrid = [[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]]
<strong>输出：</strong>true
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>targetGrid = [[1,2,1],[2,1,2],[1,2,1]]
<strong>输出：</strong>false
<strong>解释：</strong>没有办法得到 targetGrid ，因为每一轮操作使用的颜色互不相同。</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>targetGrid = [[1,1,1],[3,1,3]]
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == targetGrid.length</code></li>
<li><code>n == targetGrid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 60</code></li>
<li><code>1 &lt;= targetGrid[row][col] &lt;= 60</code></li>
</ul>


## 分析

一种颜色只能打印一次，因此每种颜色打印的矩形必然包括了该颜色的所有点。

因此，某种颜色所有点的边界即对应了打印的矩形（更大没有意义）。确定了每种颜色的打印矩形，问题只在于打印顺序。

假如某个颜色 c 的矩形包含了其它颜色 c2，那么 c 必须在 c2 之前打印。如果不包含其它颜色，那么 c 可以最后打印。

于是转为拓扑排序问题，判断是否存在拓扑顺序即可。

## 解答

```python
def isPrintable(self, targetGrid: List[List[int]]) -> bool:
    m, n = len(targetGrid), len(targetGrid[0])
    d = defaultdict(lambda: defaultdict(set))
    for i, j in product(range(m), range(n)):
        c = targetGrid[i][j]
        d[c]['X'].add(i)
        d[c]['Y'].add(j)
    nxt, indeg = defaultdict(set), defaultdict(int)
    for c in d:
        x1, x2 = min(d[c]['X']), max(d[c]['X'])
        y1, y2 = min(d[c]['Y']), max(d[c]['Y'])
        for x, y in product(range(x1, x2+1), range(y1, y2+1)):
            c2 = targetGrid[x][y]
            if c2 != c and c2 not in nxt[c]:
                nxt[c].add(c2)
                indeg[c2] += 1
    queue = deque(c for c in d if indeg[c]==0)
    while queue:
        u = queue.popleft()
        for v in nxt[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return all(indeg[c]==0 for c in d)
```
280 ms


