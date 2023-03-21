# 0034：在排序数组中查找元素的第一个和最后一个位置（★）


> <u>**[力扣第 34 题](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)**</u>

## 题目

<p>给你一个按照非递减顺序排列的整数数组 <code>nums</code>，和一个目标值 <code>target</code>。请你找出给定目标值在数组中的开始位置和结束位置。</p>

<p>如果数组中不存在目标值 <code>target</code>，返回 <code>[-1, -1]</code>。</p>

<p>你必须设计并实现时间复杂度为 <code>O(log n)</code> 的算法解决此问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [<code>5,7,7,8,8,10]</code>, target = 8
<strong>输出：</strong>[3,4]</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [<code>5,7,7,8,8,10]</code>, target = 6
<strong>输出：</strong>[-1,-1]</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [], target = 0
<strong>输出：</strong>[-1,-1]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>nums</code> 是一个非递减数组</li>
<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析 

二分查找的典型应用。分别对应 bisect_left 和 bisect_right。

## 解答

```python
def searchRange(self, nums: List[int], target: int) -> List[int]:
    i, j = bisect_left(nums, target), bisect_right(nums, target) - 1
    return [i, j] if i <= j else [-1, -1]
```
24 ms
