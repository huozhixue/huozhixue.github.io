# 0803：打砖块（★★★★）


> <u>**[力扣第 803 题](https://leetcode.cn/problems/bricks-falling-when-hit/)**</u>

## 题目

<p>有一个 <code>m x n</code> 的二元网格<meta charset="UTF-8" /> <code>grid</code> ，其中 <code>1</code> 表示砖块，<code>0</code> 表示空白。砖块 <strong>稳定</strong>（不会掉落）的前提是：</p>

<ul>
<li>一块砖直接连接到网格的顶部，或者</li>
<li>至少有一块相邻（4 个方向之一）砖块<strong> 稳定 </strong>不会掉落时</li>
</ul>

<p>给你一个数组 <code>hits</code> ，这是需要依次消除砖块的位置。每当消除 <code>hits[i] = (rowi, coli)</code> 位置上的砖块时，对应位置的砖块（若存在）会消失，然后其他的砖块可能因为这一消除操作而 <strong>掉落</strong> 。一旦砖块掉落，它会 <strong>立即</strong> 从网格 <code>grid</code> 中消失（即，它不会落在其他稳定的砖块上）。</p>

<p>返回一个数组 <code>result</code> ，其中 <code>result[i]</code> 表示第 <code>i</code> 次消除操作对应掉落的砖块数目。</p>

<p><strong>注意</strong>，消除可能指向是没有砖块的空白位置，如果发生这种情况，则没有砖块掉落。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]
<strong>输出：</strong>[2]
<strong>解释：</strong>网格开始为：
[[1,0,0,0]，
[<strong>1</strong>,1,1,0]]
消除 (1,0) 处加粗的砖块，得到网格：
[[1,0,0,0]
[0,<strong>1</strong>,<strong>1</strong>,0]]
两个加粗的砖不再稳定，因为它们不再与顶部相连，也不再与另一个稳定的砖相邻，因此它们将掉落。得到网格：
[[1,0,0,0],
[0,0,0,0]]
因此，结果为 [2] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,0,0,0],[1,1,0,0]], hits = [[1,1],[1,0]]
<strong>输出：</strong>[0,0]
<strong>解释：</strong>网格开始为：
[[1,0,0,0],
[1,<strong>1</strong>,0,0]]
消除 (1,1) 处加粗的砖块，得到网格：
[[1,0,0,0],
[1,0,0,0]]
剩下的砖都很稳定，所以不会掉落。网格保持不变：
[[1,0,0,0],
[<strong>1</strong>,0,0,0]]
接下来消除 (1,0) 处加粗的砖块，得到网格：
[[1,0,0,0],
[0,0,0,0]]
剩下的砖块仍然是稳定的，所以不会有砖块掉落。
因此，结果为 [0,0] 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>grid[i][j]</code> 为 <code>0</code> 或 <code>1</code></li>
<li><code>1 &lt;= hits.length &lt;= 4 * 10<sup>4</sup></code></li>
<li><code>hits[i].length == 2</code></li>
<li><code>0 &lt;= x<sub>i </sub>&lt;= m - 1</code></li>
<li><code>0 &lt;= y<sub>i</sub> &lt;= n - 1</code></li>
<li>所有 <code>(x<sub>i</sub>, y<sub>i</sub>)</code> 互不相同</li>
</ul>


## 分析

连通相关容易想到并查集，但本题中是要去掉元素。

针对离线查询，可以考虑逆向遍历，依次添加砖块，并维护并查集大小，那么连到顶部的连通块增加的大小（除了当前添加的砖块外）即为所求。

注意消除可能指向空白，所以先记录有效的消除下标。


## 解答


```python
class Solution:
    def hitBricks(self, grid: List[List[int]], hits: List[List[int]]) -> List[int]:
        def find(x):
            if f.setdefault(x,x)!=x:
                f[x] = find(f[x])
            return f[x]
        
        def union(x,y):
            fx, fy = find(x),find(y)
            if fx != fy:
                if sz[fx]>sz[fy]:
                    fx, fy = fy, fx
                f[fx] = fy
                sz[fy] += sz[fx]
        
        f, sz = {}, defaultdict(lambda: 1)
        A = []
        for i,(r,c) in enumerate(hits):
            if grid[r][c]:
                A.append((i,r,c))
                grid[r][c] = 0
        m, n = len(grid), len(grid[0])
        dummy = (-1,-1)
        for i,j in product(range(m),range(n)):
            if grid[i][j]:
                if i==0:
                    union((i,j),dummy)
                if i and grid[i-1][j]:
                    union((i,j),(i-1,j))
                if j and grid[i][j-1]:
                    union((i,j),(i,j-1))
        res = [0]*len(hits)
        for i,r,c in A[::-1]:
            tmp = sz[find(dummy)]
            if r==0:
                union((r,c),dummy)
            for x,y in [(r+1,c),(r-1,c),(r,c+1),(r,c-1)]:
                if 0<=x<m and 0<=y<n and grid[x][y]:
                    union((r,c),(x,y))
            grid[r][c] = 1
            res[i] = max(0,sz[find(dummy)]-tmp-1)
        return res
```
752 ms

