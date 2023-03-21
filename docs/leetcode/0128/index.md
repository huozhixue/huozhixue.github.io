# 0128：最长连续序列（★）


> <u>**[力扣第 128 题](https://leetcode.cn/problems/longest-consecutive-sequence/)**</u>

## 题目

<p>给定一个未排序的整数数组 <code>nums</code> ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。</p>

<p>请你设计并实现时间复杂度为 <code>O(n)</code><em> </em>的算法解决此问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [100,4,200,1,3,2]
<strong>输出：</strong>4
<strong>解释：</strong>最长数字连续序列是 <code>[1, 2, 3, 4]。它的长度为 4。</code></pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,3,7,2,5,8,4,6,0,1]
<strong>输出：</strong>9
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>
</ul>


## 分析

### #1

最简单的就是去重排序，然后遍历比较每条数字连续的序列即可。

```python
def longestConsecutive(self, nums: List[int]) -> int:
	nums = sorted(set(nums))
	res, i = 0, 0
	for j, num in enumerate(nums):
		if j == len(nums)-1 or num+1 != nums[j+1]:
			res = max(res, j-i+1)
			i = j+1
	return res
```
32 ms

### #2

要求时间复杂度 O(n)，考虑找到每条序列的起点开始遍历。

有个巧妙的方法判断起点：
- 如果 x-1 在 nums 中，x 不是起点
- 如果 x-1 不在 nums 中，x 是起点

## 解答

```python
def longestConsecutive(self, nums: List[int]) -> int:
	res, nums = 0, set(nums)
	for num in nums:
		if num-1 not in nums:
			cnt = 0
			while num in nums:
				num += 1
				cnt += 1
			res = max(res, cnt) 
	return res
```
44 ms



