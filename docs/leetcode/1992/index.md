# 1992：找到所有的农场组（1539 分）


> <u>**[力扣第 60 场双周赛第 2 题](https://leetcode.cn/problems/find-all-groups-of-farmland/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始，大小为 <code>m x n</code> 的二进制矩阵 <code>land</code> ，其中 <code>0</code> 表示一单位的森林土地，<code>1</code> 表示一单位的农场土地。</p>

<p>为了让农场保持有序，农场土地之间以矩形的 <strong>农场组</strong> 的形式存在。每一个农场组都 <strong>仅</strong> 包含农场土地。且题目保证不会有两个农场组相邻，也就是说一个农场组中的任何一块土地都 <strong>不会</strong> 与另一个农场组的任何一块土地在四个方向上相邻。</p>

<p><code>land</code> 可以用坐标系统表示，其中 <code>land</code> 左上角坐标为 <code>(0, 0)</code> ，右下角坐标为 <code>(m-1, n-1)</code> 。请你找到所有 <b>农场组</b> 最左上角和最右下角的坐标。一个左上角坐标为 <code>(r<sub>1</sub>, c<sub>1</sub>)</code> 且右下角坐标为 <code>(r<sub>2</sub>, c<sub>2</sub>)</code> 的 <strong>农场组</strong> 用长度为 4 的数组 <code>[r<sub>1</sub>, c<sub>1</sub>, r<sub>2</sub>, c<sub>2</sub>]</code> 表示。</p>

<p>请你返回一个二维数组，它包含若干个长度为 4 的子数组，每个子数组表示 <code>land</code> 中的一个 <strong>农场组</strong> 。如果没有任何农场组，请你返回一个空数组。可以以 <strong>任意顺序</strong> 返回所有农场组。</p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/07/27/screenshot-2021-07-27-at-12-23-15-copy-of-diagram-drawio-diagrams-net.png" style="width: 300px; height: 300px;"></p>

<pre><b>输入：</b>land = [[1,0,0],[0,1,1],[0,1,1]]
<b>输出：</b>[[0,0,0,0],[1,1,2,2]]
<strong>解释：</strong>
第一个农场组的左上角为 land[0][0] ，右下角为 land[0][0] 。
第二个农场组的左上角为 land[1][1] ，右下角为 land[2][2] 。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/07/27/screenshot-2021-07-27-at-12-30-26-copy-of-diagram-drawio-diagrams-net.png" style="width: 200px; height: 200px;"></p>

<pre><b>输入：</b>land = [[1,1],[1,1]]
<b>输出：</b>[[0,0,1,1]]
<strong>解释：</strong>
第一个农场组左上角为 land[0][0] ，右下角为 land[1][1] 。
</pre>

<p><strong>示例 3：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/07/27/screenshot-2021-07-27-at-12-32-24-copy-of-diagram-drawio-diagrams-net.png" style="width: 100px; height: 100px;"></p>

<pre><b>输入：</b>land = [[0]]
<b>输出：</b>[]
<b>解释：</b>
没有任何农场组。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == land.length</code></li>
<li><code>n == land[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 300</code></li>
<li><code>land</code> 只包含 <code>0</code> 和 <code>1</code> 。</li>
<li>农场组都是 <strong>矩形</strong> 的形状。</li>
</ul>


## 分析

先遍历找到所有农场的左上角（上和左都是 0 的土地位置），然后每个农场遍历找到右下角即可。

## 解答

```python
def findFarmland(self, land: List[List[int]]) -> List[List[int]]:
    tmp, m, n = [], len(land), len(land[0])
    for i, j in product(range(m), range(n)):
        if land[i][j] == 1 and (not i or land[i-1][j]==0) and (not j or land[i][j-1]==0):
            tmp.append([i, j])
    res = []
    for r1, c1 in tmp:
        r2, c2 = r1, c1
        while r2+1<m and land[r2+1][c2] == 1:
            r2 += 1
        while c2+1<n and land[r2][c2+1] == 1:
            c2 += 1
        res.append([r1, c1, r2, c2])
    return res
```
时间复杂度 O(M*N)，184 ms

