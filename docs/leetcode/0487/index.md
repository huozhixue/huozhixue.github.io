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

用滑动窗口维护最多包含一个 0 的区间即可。

不过本题要求无限流，考虑用递推的方法：
- 令 dp[i][0] 代表以 i 结尾的最大连续 1 长度，dp[i][1] 代表以 i 结尾的最多包含一个 0 的最大连续长度
- dp[i] 只和 dp[i-1] 的状态有关，可以优化为两个参数

## 解答


```python
def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
	res, a, b = 0, 0, 0
	for x in nums:
		a, b = (a+1,b+1) if x else (0, a+1)
		res = max(res, b)
	return res
```
80 ms

