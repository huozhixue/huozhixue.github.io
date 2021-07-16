# 0033：搜索旋转排序数组（★★）


## 题目

升序排列的整数数组 nums 在预先未知的某个点上进行了旋转（例如， [0,1,2,4,5,6,7] 经旋转后可能变为 [4,5,6,7,0,1,2] ）。

请你在数组中搜索 target ，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

- nums 中的每个值都 独一无二
- nums 肯定会在某个点上旋转

 
<!--more--> 

示例 1：

	输入：nums = [4,5,6,7,0,1,2], target = 0
	输出：4
	
示例 2：

	输入：nums = [4,5,6,7,0,1,2], target = 3
	输出：-1

示例 3：

	输入：nums = [1], target = 0
	输出：-1
 

## 分析 

将数组二分后，显然至少有一边是有序的，那么可以判断目标数是否在这一边。

## 解答

```python
def search(self, nums: List[int], target: int) -> int:
	i, j = 0, len(nums) - 1
	while i <= j:
		mid = i+(j-i)//2
		if nums[mid] == target:
			return mid
		if nums[i] <= nums[mid]:
			if nums[i] <= target < nums[mid]:
				j = mid - 1
			else:
				i = mid + 1
		else:
			if nums[mid] < target <= nums[j]:
				i = mid + 1
			else:
				j = mid - 1
	return -1
```

52 ms
