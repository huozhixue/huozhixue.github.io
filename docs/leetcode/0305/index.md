# 0305：岛屿数量 II（★★）


> <u>**[力扣第 305 题](https://leetcode.cn/problems/number-of-islands-ii/)**</u>

## 题目

<p>给你一个大小为 <code>m x n</code> 的二进制网格 <code>grid</code> 。网格表示一个地图，其中，<code>0</code> 表示水，<code>1</code> 表示陆地。最初，<code>grid</code> 中的所有单元格都是水单元格（即，所有单元格都是 <code>0</code>）。</p>

<p>可以通过执行 <code>addLand</code> 操作，将某个位置的水转换成陆地。给你一个数组 <code>positions</code> ，其中 <code>positions[i] = [r<sub>i</sub>, c<sub>i</sub>]</code> 是要执行第 <code>i</code> 次操作的位置 <code>(r<sub>i</sub>, c<sub>i</sub>)</code> 。</p>

<p>返回一个整数数组 <code>answer</code> ，其中 <code>answer[i]</code> 是将单元格 <code>(r<sub>i</sub>, c<sub>i</sub>)</code> 转换为陆地后，地图中岛屿的数量。</p>

<p><strong>岛屿</strong> 的定义是被「水」包围的「陆地」，通过水平方向或者垂直方向上相邻的陆地连接而成。你可以假设地图网格的四边均被无边无际的「水」所包围。</p>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/10/tmp-grid.jpg" style="width: 500px; height: 294px;" />
<pre>
<strong>输入：</strong>m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
<strong>输出：</strong>[1,1,2,3]
<strong>解释：</strong>
起初，二维网格 <code>grid</code> 被全部注入「水」。（0 代表「水」，1 代表「陆地」）
- 操作 #1：<code>addLand(0, 0)</code> 将 <code>grid[0][0]</code> 的水变为陆地。此时存在 1 个岛屿。
- 操作 #2：<code>addLand(0, 1)</code> 将 <code>grid[0][1]</code> 的水变为陆地。此时存在 1 个岛屿。
- 操作 #3：<code>addLand(1, 2)</code> 将 <code>grid[1][2]</code> 的水变为陆地。此时存在 2 个岛屿。
- 操作 #4：<code>addLand(2, 1)</code> 将 <code>grid[2][1]</code> 的水变为陆地。此时存在 3 个岛屿。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>m = 1, n = 1, positions = [[0,0]]
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= m, n, positions.length &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= m * n &lt;= 10<sup>4</sup></code></li>
<li><code>positions[i].length == 2</code></li>
<li><code>0 &lt;= r<sub>i</sub> &lt; m</code></li>
<li><code>0 &lt;= c<sub>i</sub> &lt; n</code></li>
</ul>



<p><strong>进阶：</strong>你可以设计一个时间复杂度 <code>O(k log(mn))</code> 的算法解决此问题吗？（其中 <code>k == positions.length</code>）</p>


## 分析

典型的并查集，维护并查集的块的个数即可。

## 解答

```python
def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
    def find(x):
        if f.setdefault(x, x) != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        fx, fy = find(x), find(y)
        if fx != fy:
            f[fx] = fy
            self.cnt -= 1

    res, f, self.cnt = [], {}, 0
    for i, j in positions:
        if (i, j) not in f:
            f[(i, j)] = (i, j)
            self.cnt += 1
            for x, y in [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]:
                if (x, y) in f:
                    union((x, y), (i, j))
        res.append(self.cnt)
    return res
```
252 ms

