# 0152：乘积最大子数组（★）


> <u>**[力扣第 152 题](https://leetcode.cn/problems/maximum-product-subarray/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。</p>

<p>测试用例的答案是一个 <strong>32-位</strong> 整数。</p>

<p><strong>子数组</strong> 是数组的连续子序列。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [2,3,-2,4]
<strong>输出:</strong> <code>6</code>
<strong>解释:</strong> 子数组 [2,3] 有最大乘积 6。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [-2,0,-1]
<strong>输出:</strong> 0
<strong>解释:</strong> 结果不能为 2, 因为 [-2,-1] 不是子数组。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>
<li><code>nums</code> 的任何前缀或后缀的乘积都 <strong>保证</strong> 是一个 <strong>32-位</strong> 整数</li>
</ul>


## 分析

{{< lc "0053" >}} 进阶版，加法变成了乘法。

注意乘法的最值和正负有关。因此令 dp[j][0]、dp[j][1] 分别代表以位置 j 结尾的最小/大乘积，即可递推。

还可以优化为两个参数。

## 解答

```python
def maxProduct(self, nums: List[int]) -> int:
    res, Min, Max = float('-inf'), 1, 1
    for num in nums:
        Min, _, Max = sorted([num*Max, num*Min, num])
        res = max(res, Max)
    return res
```
44 ms

