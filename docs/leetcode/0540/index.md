# 0540：有序数组中的单一元素（★）


> <u>**[力扣第 540 题](https://leetcode.cn/problems/single-element-in-a-sorted-array/)**</u>

## 题目

<p>给你一个仅由整数组成的有序数组，其中每个元素都会出现两次，唯有一个数只会出现一次。</p>

<p>请你找出并返回只出现一次的那个数。</p>

<p>你设计的解决方案必须满足 <code>O(log n)</code> 时间复杂度和 <code>O(1)</code> 空间复杂度。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,1,2,3,3,4,4,8,8]
<strong>输出:</strong> 2
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums =  [3,3,7,7,10,11,11]
<strong>输出:</strong> 10
</pre>



<p><meta charset="UTF-8" /></p>

<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>




## 分析

二分查找第一个不满足 nums[i]=nums[i^1] 的 i 即可。
## 解答


```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        i = bisect_left(range(len(nums)-1),True,key=lambda i:nums[i]!=nums[i^1])
        return nums[i]
```
60 ms
