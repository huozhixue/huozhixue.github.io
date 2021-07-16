# 0152：乘积最大子数组（★）


## 题目

给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

<!--more--> 

示例 1:

	输入: [2,3,-2,4]
	输出: 6
	解释: 子数组 [2,3] 有最大乘积 6。
	
示例 2:

	输入: [-2,0,-1]
	输出: 0
	解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。



## 分析

类似 0053，可以遍历位置 j，求以位置 j 结尾的子数组的最大乘积 Max[j]。

但 nums 里可能有负数，若 nums[j] < 0，Max[j] 应该等于以位置 j-1 结尾的子数组的最小乘积再乘以 nums[j]。

因此，应该维护两个数 Max，Min，分别表示当前位置结尾的子数组的最大乘积和最小乘积。

## 解答

```python
def maxProduct(self, nums: List[int]) -> int:
	res, Min, Max = float('-inf'), 1, 1
	for num in nums:
		Min, Max = min(num, num*Min, num*Max), max(num, num*Min, num*Max)
		res = max(res, Max)
	return res
```

44 ms

