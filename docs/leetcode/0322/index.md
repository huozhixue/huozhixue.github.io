# 0322：零钱兑换（★）


> <u>**[力扣第 322 题](https://leetcode.cn/problems/coin-change/)**</u>

## 题目

<p>给你一个整数数组 <code>coins</code> ，表示不同面额的硬币；以及一个整数 <code>amount</code> ，表示总金额。</p>

<p>计算并返回可以凑成总金额所需的 <strong>最少的硬币个数</strong> 。如果没有任何一种硬币组合能组成总金额，返回 <code>-1</code> 。</p>

<p>你可以认为每种硬币的数量是无限的。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>coins = <code>[1, 2, 5]</code>, amount = <code>11</code>
<strong>输出：</strong><code>3</code>
<strong>解释：</strong>11 = 5 + 5 + 1</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>coins = <code>[2]</code>, amount = <code>3</code>
<strong>输出：</strong>-1</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>coins = [1], amount = 0
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= coins.length &lt;= 12</code></li>
<li><code>1 &lt;= coins[i] &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>0 &lt;= amount &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

典型的线性 dp，按最后选择的硬币即可递归。

	
## 解答

```python
def coinChange(self, coins: List[int], amount: int) -> int:
    dp = [0] * (amount+1)
    for i in range(1, amount+1):
        dp[i] = 1 + min(dp[i-coin] if coin<=i else float('inf') for coin in coins)
    return dp[-1] if dp[-1]<float('inf') else -1
```
时间复杂度 $O(N*S)$，848 ms
