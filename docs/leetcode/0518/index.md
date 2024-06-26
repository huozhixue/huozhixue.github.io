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

类似 {{< lc "0322" >}}，修改下递推式即可。

## 解答

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        f = [1]+[0]*amount
        for x in coins:
            for j in range(x,amount+1):
                f[j] += f[j-x]
        return f[-1]
```
95 ms

