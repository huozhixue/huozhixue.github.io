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


**相似问题：**
- [0983：最低票价（1786 分）](/leetcode/0983)
- [2218：从栈中取出 K 个硬币的最大面值和（2157 分）](/leetcode/2218)
- [2224：转化时间需要的最少操作数（1295 分）](/leetcode/2224)
- [2547：拆分数组的最小代价（2019 分）](/leetcode/2547)
- [2902：和带限制的子多重集合的数目（2758 分）](/leetcode/2902)
- [2915：和为目标值的最长子序列的长度（1658 分）](/leetcode/2915)
- [2952：需要添加的硬币的最小数量（1784 分）](/leetcode/2952)
- [2979：最贵的无法购买的商品](/leetcode/2979)


## 分析

- 完全背包与 01 背包的区别在于递推式 f[i][j] 由 f[i][j-x] 而不是 f[i-1][j-x] 推出
- 可以将 dp 数组优化为一维，与 01 背包的区别仅在于 j 的遍历顺序不同

	
## 解答

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        n = len(coins)
        f = [0]+[inf]*amount
        for x in coins:
            for j in range(x,amount+1):
                f[j] = min(f[j],1+f[j-x])
        return f[-1] if f[-1]<inf else -1
```
744 ms
