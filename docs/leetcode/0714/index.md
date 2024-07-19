# 0714：买卖股票的最佳时机含手续费（★）


> <u>**[力扣第 714 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)**</u>

## 题目

<p>给定一个整数数组 <code>prices</code>，其中 <code>prices[i]</code>表示第 <code>i</code> 天的股票价格 ；整数 <code>fee</code> 代表了交易股票的手续费用。</p>

<p>你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。</p>

<p>返回获得利润的最大值。</p>

<p><strong>注意：</strong>这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>prices = [1, 3, 2, 8, 4, 9], fee = 2
<strong>输出：</strong>8
<strong>解释：</strong>能够达到的最大利润:
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>prices = [1,3,7,5,10,3], fee = 3
<strong>输出：</strong>6
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= prices.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= prices[i] &lt; 5 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= fee &lt; 5 * 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0122：买卖股票的最佳时机 II](/leetcode/0122)


## 分析

{{< lc "0122" >}} 升级版，修改下递推式即可。

## 解答

```python
class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        a,b = -inf,0
        for x in prices:
            a,b = max(a,b-x-fee),max(b,a+x)
        return b
```

142 ms

