# 0827：最大人工岛（1933 分）


> <u>**[力扣第 827 题](https://leetcode.cn/problems/making-a-large-island/)**</u>

## 题目

<p>给你一个大小为 <code>n x n</code> 二进制矩阵 <code>grid</code> 。<strong>最多</strong> 只能将一格 <code>0</code> 变成 <code>1</code> 。</p>

<p>返回执行此操作后，<code>grid</code> 中最大的岛屿面积是多少？</p>

<p><strong>岛屿</strong> 由一组上、下、左、右四个方向相连的 <code>1</code> 形成。</p>



<p><strong class="example">示例 1:</strong></p>

<pre>
<strong>输入: </strong>grid = [[1, 0], [0, 1]]
<strong>输出:</strong> 3
<strong>解释:</strong> 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。
</pre>

<p><strong class="example">示例 2:</strong></p>

<pre>
<strong>输入: </strong>grid =<strong> </strong>[[1, 1], [1, 0]]
<strong>输出:</strong> 4
<strong>解释:</strong> 将一格0变成1，岛屿的面积扩大为 4。</pre>

<p><strong class="example">示例 3:</strong></p>

<pre>
<strong>输入: </strong>grid = [[1, 1], [1, 1]]
<strong>输出:</strong> 4
<strong>解释:</strong> 没有0可以让我们变成1，面积依然为 4。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= n &lt;= 500</code></li>
<li><code>grid[i][j]</code> 为 <code>0</code> 或 <code>1</code></li>
</ul>




## 分析

- 先统计所有岛屿面积
- 遍历格子 0，将相邻的岛屿面积相加即可，注意去重
- 需要统计岛屿面积，并维护每个格子所属岛屿，可以用并查集

## 解答


```python
class Solution:
    def largestIsland(self, grid: List[List[int]]) -> int:
        def find(x):
            if f[x]!=x:
                f[x] = find(f[x])
            return f[x]
        
        def union(x,y):
            f[find(x)] = find(y)

        n = len(grid)
        f = list(range(n*n))
        for i,j in product(range(n), range(n)):
            if grid[i][j]:
                if i and grid[i-1][j]:
                    union(i*n+j,i*n-n+j)
                if j and grid[i][j-1]:
                    union(i*n+j,i*n+j-1)
        ct = Counter(find(i*n+j) for i in range(n) for j in range(n) if grid[i][j])
        res = max(ct.values(),default=0)
        for i,j in product(range(n), range(n)):
            if not grid[i][j]:
                vis = set()
                for x,y in [(i,j-1),(i,j+1),(i-1,j),(i+1,j)]:
                    if 0<=x<n and 0<=y<n and grid[x][y]:
                        vis.add(find(x*n+y))
                res = max(res, 1+sum(ct[p] for p in vis))
        return res
```
1360 ms
