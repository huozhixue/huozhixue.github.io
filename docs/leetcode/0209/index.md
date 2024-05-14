# 0209：长度最小的子数组（★）


> <u>**[力扣第 209 题](https://leetcode.cn/problems/minimum-size-subarray-sum/)**</u>

## 题目

<p>给定一个含有 <code>n</code><strong> </strong>个正整数的数组和一个正整数 <code>target</code><strong> 。</strong></p>

<p>找出该数组中满足其和<strong> </strong><code>≥ target</code><strong> </strong>的长度最小的 <strong>连续子数组</strong> <code>[nums<sub>l</sub>, nums<sub>l+1</sub>, ..., nums<sub>r-1</sub>, nums<sub>r</sub>]</code> ，并返回其长度<strong>。</strong>如果不存在符合条件的子数组，返回 <code>0</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>target = 7, nums = [2,3,1,2,4,3]
<strong>输出：</strong>2
<strong>解释：</strong>子数组 <code>[4,3]</code> 是该条件下的长度最小的子数组。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>target = 4, nums = [1,4,4]
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>target = 11, nums = [1,1,1,1,1,1,1,1]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= target <= 10<sup>9</sup></code></li>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>1 <= nums[i] <= 10<sup>5</sup></code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>如果你已经实现<em> </em><code>O(n)</code> 时间复杂度的解法, 请尝试设计一个 <code>O(n log(n))</code> 时间复杂度的解法。</li>
</ul>


## 分析

遍历每个位置 j 作为结尾，找符合条件的最短子串 [i, j] ，发现是滑动窗口。

## 解答

```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        res = inf
        s,i = 0,0
        for j,x in enumerate(nums):
            s += x
            while s>=target:
                res = min(res,j-i+1)
                s -= nums[i]
                i += 1
        return res if res<inf else 0
```
49 ms


