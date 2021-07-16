# 0081：搜索旋转排序数组 II（★★）


## 题目

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。

编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。

<!--more--> 

示例 1:

	输入: nums = [2,5,6,0,0,1,2], target = 0
	输出: true
	
示例 2:

	输入: nums = [2,5,6,0,0,1,2], target = 3
	输出: false



## 分析

直接套用 {{< lc "0033" >}} 的二分查找会出错，因为 nums[i] <= nums[mid] 不代表中间有序了，有可能两端相等，而拐点在中间。

因此需要特殊处理 nums[i] == nums[mid] 的情况，可以直接增大 i 跳过特殊情形。

## 解答

```python
def search(self, nums: List[int], target: int) -> bool:
	i, j = 0, len(nums) - 1
	while i <= j:
		mid = i+(j-i)//2
		if nums[mid] == target:
			return True
		if nums[i] == nums[mid]:
			i += 1
			continue
		if nums[i] < nums[mid]:
			if nums[i] <= target < nums[mid]:
				j = mid - 1
			else:
				i = mid + 1
		else:
			if nums[mid] < target <= nums[j]:
				i = mid + 1
			else:
				j = mid - 1
	return False
```

40 ms
