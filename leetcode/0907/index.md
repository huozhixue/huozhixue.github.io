# 0907：子数组的最小值之和（★★★）



## 题目

给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。

由于答案可能很大，因此 返回答案模 10^9 + 7 。

提示：

- 1 <= arr.length <= 3 * 10^4
- 1 <= arr[i] <= 3 * 10^4
 

 <!--more--> 
 
示例 1：

	输入：arr = [3,1,2,4]
	输出：17
	解释：
	子数组为 [3]，[1]，[2]，[4]，[3,1]，[1,2]，[2,4]，[3,1,2]，[1,2,4]，[3,1,2,4]。 
	最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。

示例 2：

	输入：arr = [11,81,94,43,3]
	输出：444

 
## 分析

### #1

直接遍历所有区间会超时，有个巧妙的想法是遍历可能的最小值，计算其个数。
显然最小值只可能是 arr 的元素，而对应的个数可以根据左右最大能覆盖的区间来计算。

为了避免重复计算，假如区间有多个最小元素，令该区间属于最右边的那个。
那么，对于 arr[i]，找到左边第一个小于 arr[i] 的位置 left，找到右边第一个小于等于 arr[i] 的位置 right。
arr[i] 覆盖的区间个数就是 （i-left) * (right-i)。

找上一个更小元素和下一个更小元素，容易想到单调栈，类似 {{< lc "0084">}}。

```python
def sumSubarrayMins(self, arr: List[int]) -> int:
	n = len(arr)
	left, stack = [-1] * n, []
	for i in range(n):
		while stack and arr[stack[-1]] >= arr[i]:
			stack.pop()
		left[i] = stack[-1] if stack else -1
		stack.append(i)
	right, stack = [n] * n, []
	for i in range(n):
		while stack and arr[stack[-1]] >= arr[i]:
			right[stack.pop()] = i
		stack.append(i)
	res, M = 0, 10 ** 9 + 7
	for i in range(n):
		res += arr[i] * (i - left[i]) * (right[i] - i)
		res %= M
	return res
```

248 ms

### #2

类似 {{< lc "0084">}}，可以一趟解决。

令栈中严格递增（也就是计算 left 的过程），遍历到位置 i 时，对于栈中满足 arr[j] >= arr[i] 的位置 j 来说，
j 的上一个更小元素就是 stack[-1]，而 j 的下一个小于等于 arr[j] 的元素就是 arr[i]。因此，直接就能得到 arr[j] 覆盖的区间个数。

注意最后栈中可能还剩余元素，需要遍历计算。一个更简单的做法是在 arr 末尾加一个极小值，让所有元素都出栈。

## 解答

```python
def sumSubarrayMins(self, arr: List[int]) -> int:
	res, stack, M = 0, [], 10 ** 9 + 7
	arr += [0]
	for i in range(len(arr)):
		while stack and arr[stack[-1]] >= arr[i]:
			j = stack.pop()
			left = stack[-1] if stack else -1
			res += arr[j] * (j-left) * (i-j)
			res %= M
		stack.append(i)
	return res
```

172 ms

