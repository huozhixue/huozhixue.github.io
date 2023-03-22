# 1673：找出最具竞争力的子序列（★★）


> <u>**[力扣第 217 场周赛第 2 题](https://leetcode.cn/problems/find-the-most-competitive-subsequence/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个正整数 <code>k</code> ，返回长度为 <code>k</code> 且最具 <strong>竞争力</strong> 的<em> </em><code>nums</code> 子序列。</p>

<p>数组的子序列是从数组中删除一些元素（可能不删除元素）得到的序列。</p>

<p>在子序列 <code>a</code> 和子序列 <code>b</code> 第一个不相同的位置上，如果 <code>a</code> 中的数字小于 <code>b</code> 中对应的数字，那么我们称子序列 <code>a</code> 比子序列 <code>b</code>（相同长度下）更具 <strong>竞争力</strong> 。 例如，<code>[1,3,4]</code> 比 <code>[1,3,5]</code> 更具竞争力，在第一个不相同的位置，也就是最后一个位置上， <code>4</code> 小于 <code>5</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,5,2,6], k = 2
<strong>输出：</strong>[2,6]
<strong>解释：</strong>在所有可能的子序列集合 {[3,5], [3,2], [3,6], [5,2], [5,6], [2,6]} 中，[2,6] 最具竞争力。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,4,3,3,5,4,9,6], k = 4
<strong>输出：</strong>[2,3,3,4]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>0 <= nums[i] <= 10<sup>9</sup></code></li>
<li><code>1 <= k <= nums.length</code></li>
</ul>


## 分析

类似 {{< lc "0402" >}} ，只是从字符串变成了数组。

## 解答

```python
def mostCompetitive(self, nums: List[int], k: int) -> List[int]:
	stack, k = [], len(nums) - k
	for num in nums:
		while k and stack and stack[-1] > num:
			stack.pop()
			k -= 1
		stack.append(num)
	return stack[:-k] if k else stack
```

276 ms


