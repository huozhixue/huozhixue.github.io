# 1411：给 N x 3 网格图涂色的方案数（1844 分）


> <u>**[力扣第 184 场周赛第 4 题](https://leetcode.cn/problems/number-of-ways-to-paint-n-3-grid/)**</u>

## 题目

<p>你有一个 <code>n x 3</code> 的网格图 <code>grid</code> ，你需要用 <strong>红，黄，绿</strong> 三种颜色之一给每一个格子上色，且确保相邻格子颜色不同（也就是有相同水平边或者垂直边的格子颜色不同）。</p>

<p>给你网格图的行数 <code>n</code> 。</p>

<p>请你返回给 <code>grid</code> 涂色的方案数。由于答案可能会非常大，请你返回答案对 <code>10^9 + 7</code> 取余的结果。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 1
<strong>输出：</strong>12
<strong>解释：</strong>总共有 12 种可行的方法：
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/12/e1.png" style="height: 289px; width: 450px;">
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 2
<strong>输出：</strong>54
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>n = 3
<strong>输出：</strong>246
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>n = 7
<strong>输出：</strong>106494
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>n = 5000
<strong>输出：</strong>30228214
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == grid.length</code></li>
<li><code>grid[i].length == 3</code></li>
<li><code>1 &lt;= n &lt;= 5000</code></li>
</ul>


**相似问题：**
- [1931：用三种不同颜色为网格涂色（2170 分）](/leetcode/1931)


## 分析

### #1

- 按每列的颜色情况可以递推
- 相邻两列哪些情况合法可以预处理，节省时间

```python
class Solution:
    def numOfWays(self, n: int) -> int:
        mod = 10**9+7
        A = [u for u in product(range(3),repeat=3) if all(a!=b for a,b in pairwise(u))]
        h = defaultdict(list)
        for u in A:
            h[u] = [v for v in A if all(a!=b for a,b in zip(u,v))]
        f = {u:1 for u in A}
        for _ in range(n-1):
            g = defaultdict(int)
            for u,w in f.items():
                for v in h[u]:
                    g[v] = (g[v]+w)%mod
            f = g
        return sum(f.values())%mod 
```
403 ms

### #2

- 注意到每列的 12 种情况可以分为两类：全不相同，两边相同
- 分类后依然可以递推

```python
class Solution:
    def numOfWays(self, n: int) -> int:
        mod = 10**9+7
        a,b = 6,6
        for _ in range(n-1):
            a,b = (a*3+b*2)%mod,(a*2+b*2)%mod
        return (a+b)%mod    
```
7 ms

### #3

这个递推式还可以用矩阵快速幂优化
## 解答


```python
mod = 10**9+7
def mul(A,B):
    return [[sum(a*b for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]
def mpow(mat, n):
    res = mat
    for i in range(n.bit_length()-2,-1,-1):
        res = mul(res,res)
        if n>>i&1:
            res = mul(res,mat)
    return res

class Solution:
    def numOfWays(self, n: int) -> int:
        f = [[6],[6]]
        A = [[3,2],[2,2]]
        f = mul(mpow(A,n-1),f) if n>1 else f
        return sum(sum(A) for A in f)%mod   
```
0 ms
