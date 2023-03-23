# 0487：最大连续1的个数 II（★）


> <u>**[力扣第 487 题](https://leetcode.cn/problems/max-consecutive-ones-ii/)**</u>

## 题目

<p>给定一个二进制数组 <code>nums</code> ，如果最多可以翻转一个 <code>0</code> ，则返回数组中连续 <code>1</code> 的最大个数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,0,1,1,0]
<strong>输出：</strong>4
<strong>解释：</strong>翻转第一个 0 可以得到最长的连续 1。
当翻转以后，最大连续 1 的个数为 4。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>nums = [1,0,1,1,0,1]
<b>输出：</b>4
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>nums[i]</code> 不是 <code>0</code> 就是 <code>1</code>.</li>
</ul>



<p><strong>进阶：</strong>如果输入的数字是作为<strong> 无限流 </strong>逐个输入如何处理？换句话说，内存不能存储下所有从流中输入的数字。您可以有效地解决吗？</p>


## 分析

## 解答


```python
def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
	res, i, ct = 0, 0, Counter()
	for j, num in enumerate(nums):
		ct[num] += 1
		while ct[0] > 1:
			ct[nums[i]] -= 1
			i += 1
		res = max(res, j-i+1)
	return res
```

160 ms
