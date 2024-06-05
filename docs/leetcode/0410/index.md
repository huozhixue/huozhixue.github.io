# 0410：分割数组的最大值（★★）


> <u>**[力扣第 410 题](https://leetcode.cn/problems/split-array-largest-sum/)**</u>

## 题目

<p>给定一个非负整数数组 <code>nums</code> 和一个整数 <code>k</code> ，你需要将这个数组分成 <code>k</code><em> </em>个非空的连续子数组。</p>

<p>设计一个算法使得这 <code>k</code><em> </em>个子数组各自和的最大值最小。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [7,2,5,10,8], k = 2
<strong>输出：</strong>18
<strong>解释：</strong>
一共有四种方法将 nums 分割为 2 个子数组。
其中最好的方式是将其分为 [7,2,5] 和 [10,8] 。
因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4,5], k = 2
<strong>输出：</strong>9
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,4,4], k = 3
<strong>输出：</strong>4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
<li><code>1 &lt;= k &lt;= min(50, nums.length)</code></li>
</ul>


## 分析

直接分割很难入手，一个想法是假如给定和的限制，那么贪心地选择分割点即可。

因此想到对解用二分查找。假如最后的解是 x：
- 针对所有 y<x，无法将数组分成 m 个和 <=y 的子数组
- 针对所有 y>=x，可以将数组分成 m 个和 <=y 的子数组

因此可以对解用二分查找。

## 解答


```python
def splitArray(self, nums: List[int], k: int) -> int:
	def check(x):
		s, cnt = 0, 1
		for num in nums:
			s += num
			if s > x:
				cnt += 1
				s = num
		return cnt <= k

	self.__class__.__getitem__ = lambda self, x: check(x)
	return bisect_left(self, True, max(nums), sum(nums))
```
32 ms
