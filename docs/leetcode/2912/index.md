# 2912：在网格上移动到目的地的方法数（★★）


> <u>**[力扣第 2912 题](https://leetcode.cn/problems/number-of-ways-to-reach-destination-in-the-grid/)**</u>

## 题目

<p>给定两个整数 <code>n</code> 和 <code>m</code>，它们表示一个 <strong>下标从 1 开始 </strong>的网格的大小。还给定一个整数 <code>k</code>，以及两个 <b>下标从 1 开始</b> 的整数数组 <code>source</code> 和 <code>dest</code>。这两个数组 <code>source</code> 和 <code>dest</code> 形如 <code>[x, y]</code>，表示网格上的一个单元格。</p>

<p>你可以按照以下方式在网格上移动：</p>

<ul>
<li>你可以从单元格 <code>[x1, y1]</code> 移动到 <code>[x2, y2]</code>，只要 <code>x1 == x2</code> 或 <code>y1 == y2</code>。</li>
<li>注意，你 <strong>不能</strong> 移动到当前所在的单元格，即 <code>x1 == x2</code> 且 <code>y1 == y2</code>。</li>
</ul>

<p>请返回你在网格上从 <code>source</code> 到 <code>dest</code> 移动 <code>k</code> 次一共可以有 <strong>多少种 </strong>方法。</p>

<p>由于答案可能非常大，因此请对 <code>10<sup>9</sup> + 7</code> <strong>取模</strong> 后返回。</p>



<p><b>示例 1:</b></p>

<pre>
<b>输入：</b> n = 3, m = 2, k = 2, source = [1,1], dest = [2,2]
<b>输出：</b> 2
<b>解释： </b>有两种可能的方式从 [1,1] 到达 [2,2]：
- [1,1] -&gt; [1,2] -&gt; [2,2]
- [1,1] -&gt; [2,1] -&gt; [2,2]
</pre>

<p><b>示例 2:</b></p>

<pre>
<b>输入：</b> n = 3, m = 4, k = 3, source = [1,2], dest = [2,3]
<b>输出：</b> 9
<b>解释：</b> 有 9 种可能的方式从 [1,2] 到达 [2,3]：:
- [1,2] -&gt; [1,1] -&gt; [1,3] -&gt; [2,3]
- [1,2] -&gt; [1,1] -&gt; [2,1] -&gt; [2,3]
- [1,2] -&gt; [1,3] -&gt; [3,3] -&gt; [2,3]
- [1,2] -&gt; [1,4] -&gt; [1,3] -&gt; [2,3]
- [1,2] -&gt; [1,4] -&gt; [2,4] -&gt; [2,3]
- [1,2] -&gt; [2,2] -&gt; [2,1] -&gt; [2,3]
- [1,2] -&gt; [2,2] -&gt; [2,4] -&gt; [2,3]
- [1,2] -&gt; [3,2] -&gt; [2,2] -&gt; [2,3]
- [1,2] -&gt; [3,2] -&gt; [3,3] -&gt; [2,3]
</pre>



<p><b>提示：</b></p>

<ul>
<li><code>2 &lt;= n, m &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>
<li><code>source.length == dest.length == 2</code></li>
<li><code>1 &lt;= source[1], dest[1] &lt;= n</code></li>
<li><code>1 &lt;= source[2], dest[2] &lt;= m</code></li>
</ul>




## 分析

### #1 dp

- 移动中，实际上只关心跟目标单元格的横纵坐标是否相等
- 因此，维护 4 个状态表示与目标的横纵坐标相等情况，递推即可

```python
class Solution:
    def numberOfWays(self, n: int, m: int, k: int, source: List[int], dest: List[int]) -> int:
        mod = 10**9+7
        sx,sy = source
        tx,ty = dest
        f = [0]*4
        f[(sx==tx)+2*(sy==ty)] = 1
        for _ in range(k):
            g = [0]*4
            g[0] = f[0]*(n+m-4)+f[1]*(n-1)+f[2]*(m-1)
            g[1] = f[0]+f[1]*(m-2)+f[3]*(m-1)
            g[2] = f[0]+f[2]*(n-2)+f[3]*(n-1)
            g[3] = f[1]+f[2]
            f = [x%mod for x in g]
        return f[-1]
```
1057 ms

### #2 矩阵快速幂

每轮的递推系数相同，可以用矩阵快速幂优化


## 解答


```python
mod = 10**9+7
def mul(A,B):
    return [[sum(a*b for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]
def mpow(mat,n):
    res = mat
    for i in range(n.bit_length()-2,-1,-1):
        res = mul(res,res)
        if n>>i&1:
            res = mul(res,mat)
    return res

class Solution:
    def numberOfWays(self, n: int, m: int, k: int, source: List[int], dest: List[int]) -> int:
        sx,sy = source
        tx,ty = dest
        f = [[0] for _ in range(4)]
        f[(sx==tx)+2*(sy==ty)][0] = 1
        g = [[n+m-4,n-1,m-1,0],[1,m-2,0,m-1],[1,0,n-2,n-1],[0,1,1,0]]
        res = mul(mpow(g,k),f)
        return res[-1][-1]
```
437 ms
