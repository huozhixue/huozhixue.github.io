# 0790：多米诺和托米诺平铺（1830 分）


> <u>**[力扣第 790 题](https://leetcode.cn/problems/domino-and-tromino-tiling/)**</u>

## 题目

<p>有两种形状的瓷砖：一种是 <code>2 x 1</code> 的多米诺形，另一种是形如 "L" 的托米诺形。两种形状都可以旋转。</p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/15/lc-domino.jpg" style="height: 195px; width: 362px;" /></p>

<p>给定整数 n ，返回可以平铺 <code>2 x n</code> 的面板的方法的数量。<strong>返回对</strong> <code>10<sup>9</sup> + 7</code> <strong>取模 </strong>的值。</p>

<p>平铺指的是每个正方形都必须有瓷砖覆盖。两个平铺不同，当且仅当面板上有四个方向上的相邻单元中的两个，使得恰好有一个平铺有一个瓷砖占据两个正方形。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/15/lc-domino1.jpg" style="height: 226px; width: 500px;" /></p>

<pre>
<strong>输入:</strong> n = 3
<strong>输出:</strong> 5
<strong>解释:</strong> 五种不同的方法如上所示。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 1
<strong>输出:</strong> 1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
</ul>




## 分析

假设最后一列竖着铺 1x2，显然转为递归子问题，横着铺两个 1x2，也同理。

假如最后一列铺 'L' 性，则要求平铺 2x(n-1) 但最后一列只铺一个的方法数。

为了方便递推，令：
- dp[i][0] 代表平铺 i-1 列的方法数
- dp[i][1] 代表平铺 i 列但最后一列只铺一个的方法数
- dp[i][2] 代表平铺 i 列的方法数

即可由 dp[i] 递推出 dp[i+1]。还可以优化为 3 个变量。

## 解答

```python
def numTilings(self, n: int) -> int:
    a, b, c, mod = 0, 0, 1, 10**9+7
    for _ in range(n):
        a, b, c = c, (2*a+b)%mod, (a+b+c)%mod
    return c
```
36 ms

## *附加

这是完全的线性递推关系，因此可以用矩阵快速幂优化。

注意在矩阵乘法时也取模即可。

```python
def numTilings(self, n: int) -> int:
    def mpow(mat, n):
        res = mat
        for bit in bin(n)[3:]:
            res = res*res%mod
            if bit=='1':
                res = res*mat%mod
        return res

    import numpy as np
    mod = 10**9+7
    A = np.mat([[0,0,1],[2,1,0],[1,1,1]])
    dp = np.mat([[0],[0],[1]])
    dp = mpow(A, n)*dp
    return int(dp[-1])%mod
```
76 ms
