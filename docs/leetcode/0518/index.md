# 0518：零钱兑换 II（★）


> <u>**[力扣第 518 题](https://leetcode.cn/problems/coin-change-ii/)**</u>

## 题目

<p>给你一个整数数组 <code>coins</code> 表示不同面额的硬币，另给一个整数 <code>amount</code> 表示总金额。</p>

<p>请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 <code>0</code> 。</p>

<p>假设每一种面额的硬币有无限个。 </p>

<p>题目数据保证结果符合 32 位带符号整数。</p>



<ul>
</ul>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>amount = 5, coins = [1, 2, 5]
<strong>输出：</strong>4
<strong>解释：</strong>有四种方式可以凑成总金额：
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>amount = 3, coins = [2]
<strong>输出：</strong>0
<strong>解释：</strong>只用面额 2 的硬币不能凑成总金额 3 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>amount = 10, coins = [10]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= coins.length <= 300</code></li>
<li><code>1 <= coins[i] <= 5000</code></li>
<li><code>coins</code> 中的所有值 <strong>互不相同</strong></li>
<li><code>0 <= amount <= 5000</code></li>
</ul>


## 分析

### #1

将硬币组合按升序排列，只要排列不同，就是不同的组合。

那么总金额 amount 的组合有两种可能：
- 最后一个硬币是 coins[-1]，转为 (amount-coins[-1], coins) 的子问题
- 最后一个硬币不是 coins[-1]，转为 (amount, coins[:-1]) 的子问题

因此，令 dfs(i, j) 代表总金额 j 由 coins[:i+1] 组成的种数，即可递归。

```python
def change(self, amount: int, coins: List[int]) -> int:
    @lru_cache(None)
    def dfs(i, j):
        if i<0 or j<0:
            return 0
        if j==0:
            return 1
        return dfs(i, j-coins[i])+dfs(i-1, j)
    return dfs(len(coins)-1, amount)
```
时间复杂度 O(N*S)，156 ms

### #2

可以改写成非递归形式，递推式为：
    
    dp[i][j]=dp[i][j-coins[i]]+dp[i-1][j]

注意到 dp[i][j] 依赖的是 dp[i-1][j]，可以直接优化为一维数组。

> 这是典型的完全背包问题

## 解答

```python
def change(self, amount: int, coins: List[int]) -> int:
    dp = [1]+[0]*amount
    for coin in coins:
        for j in range(coin, amount+1):
            dp[j] += dp[j-coin]
    return dp[-1]
```
116 ms

