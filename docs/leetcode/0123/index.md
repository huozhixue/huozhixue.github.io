# 0123：买卖股票的最佳时机 III（★★）


> <u>**[力扣第 123 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/)**</u>

## 题目

<p>给定一个数组，它的第<em> </em><code>i</code> 个元素是一支给定的股票在第 <code>i</code><em> </em>天的价格。</p>

<p>设计一个算法来计算你所能获取的最大利润。你最多可以完成 <strong>两笔 </strong>交易。</p>

<p><strong>注意：</strong>你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入：</strong>prices = [3,3,5,0,0,3,1,4]
<strong>输出：</strong>6
<strong>解释：</strong>在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>prices = [1,2,3,4,5]
<strong>输出：</strong>4
<strong>解释：</strong>在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>prices = [7,6,4,3,1]
<strong>输出：</strong>0
<strong>解释：</strong>在这个情况下, 没有交易完成, 所以最大利润为 0。</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>prices = [1]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= prices.length <= 10<sup>5</sup></code></li>
<li><code>0 <= prices[i] <= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0121：买卖股票的最佳时机](/leetcode/0121)
- [0122：买卖股票的最佳时机 II](/leetcode/0122)
- [0188：买卖股票的最佳时机 IV](/leetcode/0188)
- [0689：三个无重叠子数组的最大和](/leetcode/0689)
- [2291：最大股票收益](/leetcode/2291)
- [2555：两个线段获得的最多奖品（2080 分）](/leetcode/2555)


## 分析


- {{< lc "0121" >}} 升级版，添加了次数限制，所以加一个状态参数
- 令 dp[i][j][0]、dp[i][j][1] 分别代表 prices[:i] 最多买过 j 支股票且手里有/无股票的最大利润，即可递推：
$$\begin{cases}
dp[i][j][0] = max(dp[i-1][j][0], dp[i-1][j-1][1]-prices[i-1]) \\\ 
dp[i][j][1] = max(dp[i-1][j][1], dp[i-1][j][0]+prices[i-1])
\end{cases}$$
- 可以优化为 4 个参数
## 解答

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        a,b,c,d = -inf,0,-inf,0
        for x in prices:
            a,b,c,d = max(a,-x),max(b,a+x),max(c,b-x),max(d,c+x)
        return d
```
274 ms




