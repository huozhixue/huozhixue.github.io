# 0581：最短无序连续子数组（★）


> <u>**[力扣第 581 题](https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，你需要找出一个 <strong>连续子数组</strong> ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。</p>

<p>请你找出符合题意的 <strong>最短</strong> 子数组，并输出它的长度。</p>



<div class="original__bRMd">
<div>
<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,6,4,8,10,9,15]
<strong>输出：</strong>5
<strong>解释：</strong>你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4]
<strong>输出：</strong>0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>4</sup></code></li>
<li><code>-10<sup>5</sup> <= nums[i] <= 10<sup>5</sup></code></li>
</ul>



<p><strong>进阶：</strong>你可以设计一个时间复杂度为 <code>O(n)</code> 的解决方案吗？</p>
</div>
</div>




## 分析

### #1

排序后找第一个和最后一个不相等的位置即可。

```python
class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        n = len(nums)
        i,j = n+1,n
        for k,(x,y) in enumerate(zip(nums,sorted(nums))):
            if x!=y:
                i,j = min(i,k),k
        return j-i+1
```
66 ms

### #2

- 要求 O(N)，可以换种方式判断
- 左边界即是第一个不满足 nums[i]<=min(nums[i:]) 的位置 i
- 右边界即是最后一个不满足 nums[j]>=max(nums[:j]) 的位置 j
## 解答


```python
class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        n = len(nums)
        i,j = n+1,n
        mi = inf
        for k in range(n-1,-1,-1):
            if nums[k]>mi:
                i = k
            mi = min(mi,nums[k])
        ma = -inf
        for k in range(n):
            if nums[k]<ma:
                j = k
            ma = max(ma,nums[k])
        return j-i+1
```
74 ms
