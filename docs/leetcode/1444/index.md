# 1444：切披萨的方案数（2126 分）


> <u>**[力扣第 188 场周赛第 4 题](https://leetcode.cn/problems/number-of-ways-of-cutting-a-pizza/)**</u>

## 题目

<p>给你一个 <code>rows x cols</code> 大小的矩形披萨和一个整数 <code>k</code> ，矩形包含两种字符： <code>&#39;A&#39;</code> （表示苹果）和 <code>&#39;.&#39;</code> （表示空白格子）。你需要切披萨 <code>k-1</code> 次，得到 <code>k</code> 块披萨并送给别人。</p>

<p>切披萨的每一刀，先要选择是向垂直还是水平方向切，再在矩形的边界上选一个切的位置，将披萨一分为二。如果垂直地切披萨，那么需要把左边的部分送给一个人，如果水平地切，那么需要把上面的部分送给一个人。在切完最后一刀后，需要把剩下来的一块送给最后一个人。</p>

<p>请你返回确保每一块披萨包含 <strong>至少</strong> 一个苹果的切披萨方案数。由于答案可能是个很大的数字，请你返回它对 10^9 + 7 取余的结果。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/10/ways_to_cut_apple_1.png" style="height: 378px; width: 500px;"></strong></p>

<pre><strong>输入：</strong>pizza = [&quot;A..&quot;,&quot;AAA&quot;,&quot;...&quot;], k = 3
<strong>输出：</strong>3
<strong>解释：</strong>上图展示了三种切披萨的方案。注意每一块披萨都至少包含一个苹果。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>pizza = [&quot;A..&quot;,&quot;AA.&quot;,&quot;...&quot;], k = 3
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>pizza = [&quot;A..&quot;,&quot;A..&quot;,&quot;...&quot;], k = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= rows, cols &lt;= 50</code></li>
<li><code>rows == pizza.length</code></li>
<li><code>cols == pizza[i].length</code></li>
<li><code>1 &lt;= k &lt;= 10</code></li>
<li><code>pizza</code> 只包含字符 <code>&#39;A&#39;</code> 和 <code>&#39;.&#39;</code> 。</li>
</ul>


**相似问题：**
- [2312：卖木头块（2363 分）](/leetcode/2312)


## 分析

### #1

- 为了方便，可以将行和列都反序
- 按切线递推即可
- 可以预处理二维前缀和，快速判断切下的一块是否有苹果


```python
class Solution:
    def ways(self, pizza: List[str], k: int) -> int:
        mod = 10**9+7
        A = [[int(a=='A') for a in row[::-1]] for row in pizza[::-1]]
        m,n = len(A),len(A[0])
        h = [[0]*(n+1) for _ in range(m+1)]
        f = [[0]*(n+1) for _ in range(m+1)]
        for i in range(1,m+1):
            for j in range(1,n+1):
                h[i][j] = h[i][j-1]+h[i-1][j]-h[i-1][j-1]+A[i-1][j-1]
                f[i][j] = int(h[i][j]>0)
        for _ in range(k-1):
            g = [[0]*(n+1) for _ in range(m+1)]
            for i in range(1,m+1):
                for j in range(1,n+1):
                    s = 0
                    for x in range(i):
                        if h[i][j]>h[x][j]:
                            s += f[x][j]
                    for y in range(j):
                        if h[i][j]>h[i][y]:
                            s += f[i][y]
                    g[i][j] = s%mod
            f = g
        return f[-1][-1]
```
59 ms

### #2

- 注意递推式，找到最大的 y 使得 h[i][j]>h[i][y]，那么就是求 f[i][:y+1] 的前缀和
- 因此，可以预处理 f 按行/列的前缀和，优化时间
## 解答


```python
class Solution:
    def ways(self, pizza: List[str], k: int) -> int:
        mod = 10**9+7
        A = [[int(a=='A') for a in row[::-1]] for row in pizza[::-1]]
        m,n = len(A),len(A[0])
        h = [[0]*(n+1) for _ in range(m+1)]
        f = [[0]*(n+1) for _ in range(m+1)]
        for i in range(1,m+1):
            for j in range(1,n+1):
                h[i][j] = h[i][j-1]+h[i-1][j]-h[i-1][j-1]+A[i-1][j-1]
                f[i][j] = int(h[i][j]>0)
        for _ in range(k-1):
            R = [[0]*(n+1) for _ in range(m+1)]
            C = [[0]*(m+1) for _ in range(n+1)]
            g = [[0]*(n+1) for _ in range(m+1)]
            for i in range(1,m+1):
                for j in range(1,n+1):
                    if h[i][j]==h[i-1][j]:
                        g[i][j] = g[i-1][j]
                    elif h[i][j]==h[i][j-1]:
                        g[i][j] = g[i][j-1]
                    else:
                        g[i][j] = (R[i][j-1]+C[j][i-1])%mod
                    R[i][j] = (R[i][j-1]+f[i][j])%mod
                    C[j][i] = (C[j][i-1]+f[i][j])%mod
            f = g
        return f[-1][-1]
```
6 ms
