# 0456：132 模式（★）


> <u>**[力扣第 456 题](https://leetcode.cn/problems/132-pattern/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，数组中共有 <code>n</code> 个整数。<strong>132 模式的子序列</strong> 由三个整数 <code>nums[i]</code>、<code>nums[j]</code> 和 <code>nums[k]</code> 组成，并同时满足：<code>i < j < k</code> 和 <code>nums[i] < nums[k] < nums[j]</code> 。</p>

<p>如果 <code>nums</code> 中存在 <strong>132 模式的子序列</strong> ，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4]
<strong>输出：</strong>false
<strong>解释：</strong>序列中不存在 132 模式的子序列。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,1,4,2]
<strong>输出：</strong>true
<strong>解释：</strong>序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1,3,2,0]
<strong>输出：</strong>true
<strong>解释：</strong>序列中有 3 个 132 模式的的子序列：[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 <= n <= 2 * 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>
</ul>


## 分析

### #1

考虑遍历中间的 nums[j]
-  往 j 左侧找到最小的数 nums[i]，然后在 j 右侧找介于两者之间的数 nums[k] 即可
- 左侧最小值在遍历中即可维护
- 右侧需要维护一个有序集合，然后二分查找。

```python
def find132pattern(self, nums: List[int]) -> bool:
	from sortedcontainers import SortedList
	a, sl = inf, SortedList(nums)
	for b in nums:
		sl.remove(b)
		if a < b:
			pos = sl.bisect_right(a)
			if pos < len(sl) and sl[pos] < b:
				return True
		a = min(a, b)
	return False
```

时间 $O(N \ log N)$，772 ms

### #2

还可以考虑遍历右边的 nums[k]：
- 往 k 左侧找到第一个更大的数 nums[j]，然后在 j 左侧找最小的数 nums[i] 即可
- 前缀最小值可以在遍历时维护
- 找上一个最大元素即是典型的单调栈问题

## 解答

```python
def find132pattern(self, nums: List[int]) -> bool:
	dp, stack = [inf], []
	for i,c in enumerate(nums):
		while stack and stack[-1][1]<=c:
			stack.pop()
		if stack and dp[stack[-1][0]]<c:
			return True
		stack.append((i,c))
		dp.append(min(dp[-1],c))
	return False
```

时间 $O(N)$，216 ms
