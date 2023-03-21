# 0448：找到所有数组中消失的数字


> <u>**[力扣第 448 题](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)**</u>

## 题目

<p>给你一个含 <code>n</code> 个整数的数组 <code>nums</code> ，其中 <code>nums[i]</code> 在区间 <code>[1, n]</code> 内。请你找出所有在 <code>[1, n]</code> 范围内但没有出现在 <code>nums</code> 中的数字，并以数组的形式返回结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,3,2,7,8,2,3,1]
<strong>输出：</strong>[5,6]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1]
<strong>输出：</strong>[2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 <= n <= 10<sup>5</sup></code></li>
<li><code>1 <= nums[i] <= n</code></li>
</ul>

<p><strong>进阶：</strong>你能在不使用额外空间且时间复杂度为<em> </em><code>O(n)</code><em> </em>的情况下解决这个问题吗? 你可以假定返回的数组不算在额外空间内。</p>


## 分析

没说不能修改 nums，因此可以用 nums 来保存信息。遍历到 num 时，将对应的位置 num-1 取负数。
最后还为正数的位置 i，其对应的数 i+1 即是没有出现过的数字。

## 解答

```python
def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
	for num in nums:
		i = abs(num)-1
		nums[i] = -abs(nums[i])
	return [i+1 for i, num in enumerate(nums) if num>0]
```
124 ms


