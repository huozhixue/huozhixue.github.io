# 0959：由斜杠划分区域（2135 分）


> <u>**[力扣第 115 场周赛第 3 题](https://leetcode.cn/problems/regions-cut-by-slashes/)**</u>

## 题目

<p>在由 <code>1 x 1</code> 方格组成的 <code>n x n</code> 网格 <code>grid</code> 中，每个 <code>1 x 1</code> 方块由 <code>'/'</code>、<code>'\'</code> 或空格构成。这些字符会将方块划分为一些共边的区域。</p>

<p>给定网格 <code>grid</code> 表示为一个字符串数组，返回 <em>区域的数量</em> 。</p>

<p>请注意，反斜杠字符是转义的，因此 <code>'\'</code> 用 <code>'\\'</code> 表示。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/12/15/1.png" style="height: 200px; width: 200px;" /></p>

<pre>
<strong>输入：</strong>grid = [" /","/ "]
<strong>输出：</strong>2</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/12/15/2.png" style="height: 198px; width: 200px;" /></p>

<pre>
<strong>输入：</strong>grid = [" /","  "]
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/12/15/4.png" style="height: 200px; width: 200px;" /></p>

<pre>
<strong>输入：</strong>grid = ["/\\","\\/"]
<strong>输出：</strong>5
<strong>解释：</strong>回想一下，因为 \ 字符是转义的，所以 "/\\" 表示 /\，而 "\\/" 表示 \/。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == grid.length == grid[i].length</code></li>
<li><code>1 &lt;= n &lt;= 30</code></li>
<li><code>grid[i][j]</code> 是 <code>'/'</code>、<code>'\'</code>、或 <code>' '</code></li>
</ul>




## 分析

- 区域数量其实就是连通块的数量，考虑用并查集
- 注意 '/' 和 '\' 将方格分为四小块，因此考虑对每一小块遍历并连通
- 注意方格 (i, j) 左小块和 (i, j-1) 右小块必然连通，方格 (i, j) 上小块和 (i-1, j) 下小块必然连通

## 解答

```python
class Solution:
    def regionsBySlashes(self, grid: List[str]) -> int:
        def find(x):
            if f[x]!=x:
                f[x]=find(f[x])
            return f[x]
        
        def union(x,y):
            f[find(x)]=find(y)

        n = len(grid)
        f = list(range(n*n*4))
        for i in range(n):
            for j in range(n):
                base = i*n*4+j*4
                if i:
                    union(base,base-n*4+2)
                if j:
                    union(base+3,base-3)
                x = grid[i][j]
                if x!='/':
                    union(base,base+1)
                    union(base+2,base+3)
                if x!='\\':
                    union(base+1,base+2)
                    union(base,base+3)
        return sum(find(i)==i for i in range(n*n*4))
```
81 ms
