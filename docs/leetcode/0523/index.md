# 0523：连续的子数组和（★）


> <u>**[力扣第 523 题](https://leetcode.cn/problems/continuous-subarray-sum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，编写一个函数来判断该数组是否含有同时满足下述条件的连续子数组：</p>

<ul>
<li>子数组大小 <strong>至少为 2</strong> ，且</li>
<li>子数组元素总和为 <code>k</code> 的倍数。</li>
</ul>

<p>如果存在，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p>如果存在一个整数 <code>n</code> ，令整数 <code>x</code> 符合 <code>x = n * k</code> ，则称 <code>x</code> 是 <code>k</code> 的一个倍数。<code>0</code> 始终视为 <code>k</code> 的一个倍数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [23<u>,2,4</u>,6,7], k = 6
<strong>输出：</strong>true
<strong>解释：</strong>[2,4] 是一个大小为 2 的子数组，并且和为 6 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [<u>23,2,6,4,7</u>], k = 6
<strong>输出：</strong>true
<strong>解释：</strong>[23, 2, 6, 4, 7] 是大小为 5 的子数组，并且和为 42 。
42 是 6 的倍数，因为 42 = 7 * 6 且 7 是一个整数。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [23,2,6,4,7], k = 13
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>0 <= nums[i] <= 10<sup>9</sup></code></li>
<li><code>0 <= sum(nums[i]) <= 2<sup>31</sup> - 1</code></li>
<li><code>1 <= k <= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

类似 0560 ，不过改成了总和为 k 的倍数。那么前缀和改为模 k 的余数即可。

注意 k 为 0 的特殊情况。


## 解答

```python
def checkSubarraySum(self, nums: List[int], k: int) -> bool:
	s, d = 0, {}
	for i, num in enumerate(nums):
		d[s] = d.get(s, i)
		s = (s+num) % k if k else s+num
		if s in d and d[s] < i:
			return True
	return False
```

时间复杂度 O(N)，44 ms

