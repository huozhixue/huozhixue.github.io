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


**相似问题：**
- [0278：第一个错误的版本](/leetcode/0278)
- [2055：蜡烛之间的盘子（1819 分）](/leetcode/2055)
- [2089：找出数组排序后的目标下标（1152 分）](/leetcode/2089)


## 分析 

分别调用 bisect_left 和 bisect_right 即可。

## 解答

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        i = bisect_left(nums,target)
        j = bisect_right(nums,target)
        return [i,j-1] if i<j else [-1,-1]
```
24 ms
