# 0053：最大子数组和（★）


> <u>**[力扣第 53 题](https://leetcode.cn/problems/maximum-subarray/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。</p>

<p><strong>子数组 </strong>是数组中的一个连续部分。</p>



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


## 分析 

令 dp[j] 表示以位置 j 结尾的最大和，则

$$dp[j] = max(0, dp[j-1]) + nums[j]$$

最后 max(dp) 即为所求。还可以优化为一个参数。

## 解答

```python
def maxSubArray(self, nums: List[int]) -> int:
    res = dp = float('-inf')
    for num in nums:
        dp = max(0, dp) + num
        res = max(res, dp)
    return res
```
140 ms

