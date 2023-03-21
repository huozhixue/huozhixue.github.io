# 0503：下一个更大元素 II（★）


> <u>**[力扣第 503 题](https://leetcode.cn/problems/next-greater-element-ii/)**</u>

## 题目

<p>给定一个循环数组 <code>nums</code> （ <code>nums[nums.length - 1]</code> 的下一个元素是 <code>nums[0]</code> ），返回 <em><code>nums</code> 中每个元素的 <strong>下一个更大元素</strong></em> 。</p>

<p>数字 <code>x</code> 的 <strong>下一个更大的元素</strong> 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 <code>-1</code> 。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,1]
<strong>输出:</strong> [2,-1,2]
<strong>解释:</strong> 第一个 1 的下一个更大的数是 2；
数字 2 找不到下一个更大的数；
第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,3,4,3]
<strong>输出:</strong> [2,3,4,-1,4]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

### #1
  
类似 0739 ，只不过可以循环搜索了。因此要遍历两趟。

```python
def nextGreaterElements(self, nums: List[int]) -> List[int]:
	n = len(nums)
	res, stack = [-1]*n, []
	for i in range(n):
		while stack and nums[stack[-1]] < nums[i]:
			res[stack.pop()] = nums[i]
		stack.append(i)
	for i in range(n-1):
		while stack and nums[stack[-1]] < nums[i]:
			res[stack.pop()] = nums[i]
		stack.append(i)
	return res
```

212 ms

### #2

可以利用模运算简化代码。

## 解答

```python
def nextGreaterElements(self, nums: List[int]) -> List[int]:
	n = len(nums)
	res, stack = [-1]*n, []
	for i in range(2*n-1):
		i %= n
		while stack and nums[stack[-1]] < nums[i]:
			res[stack.pop()] = nums[i]
		stack.append(i)
	return res
```

220 ms
