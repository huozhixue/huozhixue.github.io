# 1004：最大连续1的个数 III（★）


> <u>**[力扣第 126 场周赛第 3 题](https://leetcode.cn/problems/max-consecutive-ones-iii/)**</u>

## 题目

<p>给定一个二进制数组 <code>nums</code> 和一个整数 <code>k</code>，如果可以翻转最多 <code>k</code> 个 <code>0</code> ，则返回 <em>数组中连续 <code>1</code> 的最大个数</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
<strong>输出：</strong>6
<strong>解释：</strong>[1,1,1,0,0,<strong>1</strong>,1,1,1,1,<strong>1</strong>]
粗体数字从 0 翻转到 1，最长的子数组长度为 6。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
<strong>输出：</strong>10
<strong>解释：</strong>[0,0,1,1,<strong>1</strong>,<strong>1</strong>,1,1,1,<strong>1</strong>,1,1,0,0,0,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 10。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>nums[i]</code> 不是 <code>0</code> 就是 <code>1</code></li>
<li><code>0 &lt;= k &lt;= nums.length</code></li>
</ul>


## 分析

和 0424 类似，还要更简单一些。

## 解答

```python
def longestOnes(self, A: List[int], K: int) -> int:
	i = 0
	for j, num in enumerate(A):
		if num==0:
			K -= 1
		if K < 0:
			if A[i] == 0:
				K += 1       
			i += 1
	return j-i+1
```

588 ms
