# 3105：最长的严格递增或递减子数组（1217 分）


> <u>**[力扣第 392 场周赛第 1 题](https://leetcode.cn/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 。</p>

<p>返回数组 <code>nums</code> 中 <strong><span data-keyword="strictly-increasing-array">严格递增</span></strong> 或 <strong><span data-keyword="strictly-decreasing-array">严格递减</span> </strong>的最长非空子数组的长度。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">nums = [1,4,3,3,2]</span></p>

<p><strong>输出：</strong><span class="example-io">2</span></p>

<p><strong>解释：</strong></p>

<p><code>nums</code> 中严格递增的子数组有<code>[1]</code>、<code>[2]</code>、<code>[3]</code>、<code>[3]</code>、<code>[4]</code> 以及 <code>[1,4]</code> 。</p>

<p><code>nums</code> 中严格递减的子数组有<code>[1]</code>、<code>[2]</code>、<code>[3]</code>、<code>[3]</code>、<code>[4]</code>、<code>[3,2]</code> 以及 <code>[4,3]</code> 。</p>

<p>因此，返回 <code>2</code> 。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">nums = [3,3,3,3]</span></p>

<p><strong>输出：</strong><span class="example-io">1</span></p>

<p><strong>解释：</strong></p>

<p><code>nums</code> 中严格递增的子数组有 <code>[3]</code>、<code>[3]</code>、<code>[3]</code> 以及 <code>[3]</code> 。</p>

<p><code>nums</code> 中严格递减的子数组有 <code>[3]</code>、<code>[3]</code>、<code>[3]</code> 以及 <code>[3]</code> 。</p>

<p>因此，返回 <code>1</code> 。</p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">nums = [3,2,1]</span></p>

<p><strong>输出：</strong><span class="example-io">3</span></p>

<p><strong>解释：</strong></p>

<p><code>nums</code> 中严格递增的子数组有 <code>[3]</code>、<code>[2]</code> 以及 <code>[1]</code> 。</p>

<p><code>nums</code> 中严格递减的子数组有 <code>[3]</code>、<code>[2]</code>、<code>[1]</code>、<code>[3,2]</code>、<code>[2,1]</code> 以及 <code>[3,2,1]</code> 。</p>

<p>因此，返回 <code>3</code> 。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 50</code></li>
<li><code>1 &lt;= nums[i] &lt;= 50</code></li>
</ul>


## 分析

典型的序列dp，遍历时维护最长递增/减长度即可。

## 解答

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        res=a=b=1
        for x,y in pairwise(nums):
            a,b =  (a+1,1) if x<y else (1,b+1) if x>y else (1,1)
            res = max(res,a,b)
        return res
```
43 ms

