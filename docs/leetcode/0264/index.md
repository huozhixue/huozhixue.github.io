# 0264：丑数 II（★）


> <u>**[力扣第 264 题](https://leetcode.cn/problems/ugly-number-ii/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，请你找出并返回第 <code>n</code> 个 <strong>丑数</strong> 。</p>

<p><strong>丑数 </strong>就是只包含质因数 <code>2</code>、<code>3</code> 和/或 <code>5</code> 的正整数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 10
<strong>输出：</strong>12
<strong>解释：</strong>[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
<strong>解释：</strong>1 通常被视为丑数。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 1690</code></li>
</ul>


## 分析

{{< lc "0263" >}} 升级版，有个巧妙的 dp 方法：
- 令 dp[n] 代表第 n 个丑数
- 显然后面的丑数必然是前面的某个丑数乘 2或3或5 得到：

$$ dp[n]=min(dp[j]*p)_{ 
\begin{subarray}{l}\ j \ in \ range(n); \\\
p \ in [2,3,5]; \\\
if \ dp[j]*p>dp[n-1] 
\end{subarray}}$$
- 观察发现，p 固定时，只需要考虑第一个使得 dp[j]*p>dp[n-1] 的 j
- 令 A[p] 代表第一个使得 dp[j]*p>dp[n-1] 的 j，递推式转为：

$$dp[n]=min(dp[A[p]]*p)_{p \ in [2,3,5]} $$
- 维护 A[p] 很简单，当 dp[A[p]]*p==dp[n] 时，将 A[p] 增 1 即可。



## 解答

```python
def nthUglyNumber(self, n: int) -> int:
    dp, A = [1] * n, defaultdict(int)
    for i in range(1, n):
        dp[i] = min(dp[A[p]]*p for p in [2,3,5])
        for p in [2,3,5]:
            if dp[A[p]]*p == dp[i]:
                A[p] += 1
    return dp[-1]
```
时间复杂度 O(N)，224 ms

