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

遍历 b=nums[j]，那么 a 取 min(nums[:j])，在 nums[j+1:] 中找 c 使得 a < c < b 即可。

min(nums[:j]) 可以递推得到。而 nums[j+1:] 可以维护一个排序的子数组，然后二分查找。

```python
def find132pattern(self, nums: List[int]) -> bool:
	a, tmp = float('inf'), sorted(nums)
	for b in nums:
		tmp.pop(bisect_left(tmp, b))
		if a < b:
			k = bisect_right(tmp, a)
			if k < len(tmp) and tmp[k] < b:
				return True
		a = min(a, b)
	return False
```

时间复杂度 O(N*log N)，76 ms

### #2

还有个巧妙的单调栈解法。从右往左遍历，维护一个 max_c 代表满足 32 模式的最大的 2 ，维护一个 stack 保存比 max_c 大的所有数。
遍历到 num 时：

	如果 num < max_c					显然 num 可以作为 132 模式的 1，返回 True
	如果 num == max_c					不影响，可以直接跳过
	如果 max_c < num < min(stack)		将 num 添加到 stack 中
	如果 num == min(stack)				不影响，可以直接跳过
	如果 num > min(stack)				min(stack) 可以作为新的 max_c，将其删除。循环操作直到转为其它情况。

注意到添加 num 时会将 stack 中小于 num 的值删除，因此 stack 是单调递减的，每次删除操作在结尾。所以 stack 是一个单调栈。


## 解答

```python
def find132pattern(self, nums: List[int]) -> bool:
	stack, max_c = [], float('-inf')
	for num in nums[::-1]:
		if num < max_c:
			return True
		while stack and num > stack[-1]:
			max_c = stack.pop()
		if num > max_c:
			stack.append(num)
	return False
```

时间复杂度 O(N)，44 ms
