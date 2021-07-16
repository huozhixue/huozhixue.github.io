# 0238：除自身以外数组的乘积（★）


## 题目

给你一个长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

请不要使用除法，且在 O(n) 时间复杂度内完成此题。

你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）

<!--more--> 

示例:

	输入: [1,2,3,4]
	输出: [24,12,8,6]


## 分析

### #1

ouput[i] 等价于 nums[:i] 的连乘再乘以 nums[i+1:] 的连乘，所以可以先遍历得到前缀乘和后缀乘，再计算。

```python
def productExceptSelf(self, nums: List[int]) -> List[int]:
	n = len(nums)
	pre, post = [1]*(n+1), [1]*(n+1)
	for i in range(n):
		pre[i+1] = nums[i] * pre[i]
	for i in range(n-1, -1, -1):
		post[i] = nums[i] * post[i+1]
	return [pre[i]*post[i+1] for i in range(n)]
```

76 ms

### #2

要求常数空间，可以用结果数组 res 先保存前缀乘的信息，然后再遍历后缀乘并修改 res。

## 解答

```python
def productExceptSelf(self, nums: List[int]) -> List[int]:
	n = len(nums)
	res, pre, post = [], 1, 1
	for i in range(n):
		res.append(pre)
		pre *= nums[i]
	for i in range(n-1, -1, -1):
		res[i] *= post
		post *= nums[i]
	return res
```

60 ms
