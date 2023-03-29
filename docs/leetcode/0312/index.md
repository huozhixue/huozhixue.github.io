# 0312：戳气球（★★）


> <u>**[力扣第 312 题](https://leetcode.cn/problems/burst-balloons/)**</u>

## 题目

<p>有 <code>n</code> 个气球，编号为<code>0</code> 到 <code>n - 1</code>，每个气球上都标有一个数字，这些数字存在数组 <code>nums</code> 中。</p>

<p>现在要求你戳破所有的气球。戳破第 <code>i</code> 个气球，你可以获得 <code>nums[i - 1] * nums[i] * nums[i + 1]</code> 枚硬币。 这里的 <code>i - 1</code> 和 <code>i + 1</code> 代表和 <code>i</code> 相邻的两个气球的序号。如果 <code>i - 1</code>或 <code>i + 1</code> 超出了数组的边界，那么就当它是一个数字为 <code>1</code> 的气球。</p>

<p>求所能获得硬币的最大数量。</p>


<strong>示例 1：</strong>

<pre>
<strong>输入：</strong>nums = [3,1,5,8]
<strong>输出：</strong>167
<strong>解释：</strong>
nums = [3,1,5,8] --&gt; [3,5,8] --&gt; [3,8] --&gt; [8] --&gt; []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,5]
<strong>输出：</strong>10
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 300</code></li>
<li><code>0 &lt;= nums[i] &lt;= 100</code></li>
</ul>


## 分析

为了方便，在前后各加一个数字 1 的气球得到数组 A。问题转为求 A 戳破非边界气球能得到的最大硬币数。

假设最后戳破第 k 个气球，获得 A[0]*A[-1]*A[k] 个硬币，剩下的即转为 A[:k+1] 和 A[k:] 的递归子问题。

令 dp[i][j] 代表 A[i:j+1] 能得到的最大硬币数，则递推式为：
$$dp[i][j] = max(A[k]*A[i]*A[j]+dp[i][k]+dp[k][j])_{\ i<k<j}$$

## 解答

```python
def maxCoins(self, nums: List[int]) -> int:
    A = [1]+nums+[1]
    n = len(A)
    dp = [[0]*n for _ in range(n)]
    for i in range(n-3, -1, -1):
        for j in range(i+2, n):
            dp[i][j] = max(A[k]*A[i]*A[j]+dp[i][k]+dp[k][j] for k in range(i+1, j))
    return dp[0][-1]
```
时间复杂度 O(N^3)，2968 ms

