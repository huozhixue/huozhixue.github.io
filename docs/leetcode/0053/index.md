# 0053：最大子数组和（★）


> <u>**[力扣第 53 题](https://leetcode.cn/problems/maximum-subarray/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。</p>

<p><strong><span data-keyword="subarray-nonempty">子数组 </span></strong>是数组中的一个连续部分。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [-2,1,-3,4,-1,2,1,-5,4]
<strong>输出：</strong>6
<strong>解释：</strong>连续子数组 [4,-1,2,1] 的和最大，为 6 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [5,4,-1,7,8]
<strong>输出：</strong>23
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>



<p><strong>进阶：</strong>如果你已经实现复杂度为 <code>O(n)</code> 的解法，尝试使用更为精妙的 <strong>分治法</strong> 求解。</p>


**相似问题：**
- [0121：买卖股票的最佳时机](/leetcode/0121)
- [0152：乘积最大子数组](/leetcode/0152)
- [0697：数组的度](/leetcode/0697)
- [0978：最长湍流子数组（1393 分）](/leetcode/0978)
- [2321：拼接数组的最大分数（1790 分）](/leetcode/2321)
- [1749：任意子数组和的绝对值的最大值（1541 分）](/leetcode/1749)
- [1746：经过一次操作后的最大子数组和](/leetcode/1746)
- [2272：最大波动的子字符串（2515 分）](/leetcode/2272)
- [2302：统计得分小于 K 的子数组数目（1808 分）](/leetcode/2302)
- [2496：数组中字符串的最大值（1292 分）](/leetcode/2496)
- [2606：找到最大开销的子字符串（1422 分）](/leetcode/2606)
- [2600：K 件物品的最大和（1434 分）](/leetcode/2600)
- [3026：最大好子数组和（1816 分）](/leetcode/3026)


## 分析 

令 dp[j] 表示以位置 j 结尾的最大和，则

$$dp[j] = max(0, dp[j-1]) + nums[j]$$

最后 max(dp) 即为所求。

## 解答

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        res,dp = -inf,-inf
        for x in nums:
            dp = max(0,dp)+x
            res = max(res,dp)
        return res
```
142 ms

