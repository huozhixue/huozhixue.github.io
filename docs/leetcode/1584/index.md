# 1584：连接所有点的最小费用（1857 分）


> <u>**[力扣第 206 场周赛第 3 题](https://leetcode.cn/problems/min-cost-to-connect-all-points/)**</u>

## 题目

<p>给你一个<code>points</code> 数组，表示 2D 平面上的一些点，其中 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 。</p>

<p>连接点 <code>[x<sub>i</sub>, y<sub>i</sub>]</code> 和点 <code>[x<sub>j</sub>, y<sub>j</sub>]</code> 的费用为它们之间的 <strong>曼哈顿距离</strong> ：<code>|x<sub>i</sub> - x<sub>j</sub>| + |y<sub>i</sub> - y<sub>j</sub>|</code> ，其中 <code>|val|</code> 表示 <code>val</code> 的绝对值。</p>

<p>请你返回将所有点连接的最小总费用。只有任意两点之间 <strong>有且仅有</strong> 一条简单路径时，才认为所有点都已连接。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/08/26/d.png" style="height:268px; width:214px; background:#e5e5e5" /></p>

<pre>
<strong>输入：</strong>points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
<strong>输出：</strong>20
<strong>解释：
</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/08/26/c.png" style="height:268px; width:214px; background:#e5e5e5" />
我们可以按照上图所示连接所有点得到最小总费用，总费用为 20 。
注意到任意两个点之间只有唯一一条路径互相到达。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>points = [[3,12],[-2,5],[-4,1]]
<strong>输出：</strong>18
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>points = [[0,0],[1,1],[1,0],[-1,1]]
<strong>输出：</strong>4
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>points = [[-1000000,-1000000],[1000000,1000000]]
<strong>输出：</strong>4000000
</pre>

<p><strong>示例 5：</strong></p>

<pre>
<strong>输入：</strong>points = [[0,0]]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= points.length &lt;= 1000</code></li>
<li><code>-10<sup>6</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>6</sup></code></li>
<li>所有点 <code>(x<sub>i</sub>, y<sub>i</sub>)</code> 两两不同。</li>
</ul>


**相似问题：**
- [2152：穿过所有点的所需最少直线数量](/leetcode/2152)


## 分析

典型的最小生成树问题，按费用排序，依次判断是否添加边即可。

## 解答

```python
def minCostConnectPoints(self, points: List[List[int]]) -> int:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)
    
    def cal(p1, p2):
        return abs(p1[0]-p2[0])+abs(p1[1]-p2[1])

    n = len(points)
    A = [[cal(points[i], points[j]), i, j] for i in range(n) for j in range(i+1, n)]
    res, f = 0, list(range(n))
    for w, i, j in sorted(A):
        if find(i) != find(j):
            union(i, j)
            res += w
    return res
```
2516 ms


