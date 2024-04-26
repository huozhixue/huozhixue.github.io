# 1518：换水问题


> <u>**[力扣第 198 场周赛第 1 题](https://leetcode.cn/problems/water-bottles/)**</u>

## 题目

<p>超市正在促销，你可以用 <code>numExchange</code> 个空水瓶从超市兑换一瓶水。最开始，你一共购入了 <code>numBottles</code> 瓶水。</p>

<p>如果喝掉了水瓶中的水，那么水瓶就会变成空的。</p>

<p>给你两个整数 <code>numBottles</code> 和 <code>numExchange</code> ，返回你 <strong>最多</strong> 可以喝到多少瓶水。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/07/19/sample_1_1875.png" style="height: 240px; width: 480px;" /></strong></p>

<pre>
<strong>输入：</strong>numBottles = 9, numExchange = 3
<strong>输出：</strong>13
<strong>解释：</strong>你可以用 <code>3</code> 个空瓶兑换 1 瓶水。
所以最多能喝到 9 + 3 + 1 = 13 瓶水。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/07/19/sample_2_1875.png" style="height: 240px; width: 790px;" /></p>

<pre>
<strong>输入：</strong>numBottles = 15, numExchange = 4
<strong>输出：</strong>19
<strong>解释：</strong>你可以用 <code>4</code> 个空瓶兑换 1 瓶水。
所以最多能喝到 15 + 3 + 1 = 19 瓶水。
</pre>





<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= numBottles &lt;= 100</code></li>
<li><code>2 &lt;= numExchange &lt;= 100</code></li>
</ul>


## 分析

可以模拟，也可以直接用数学
- numExchange 个空瓶换一瓶水，喝完得到一个空瓶
- 因此相当于 numExchange-1 个空瓶换一瓶瓶里的水
- 注意最后刚好剩 numExchange-1 个空瓶时，不能再换
- 所以总共能换 (numBottles-1)//(numExchange-1) 瓶水

## 解答


```python
class Solution:
    def numWaterBottles(self, numBottles: int, numExchange: int) -> int:
        return numBottles+(numBottles-1)//(numExchange-1)
```
41 ms
