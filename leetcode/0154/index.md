# 0154：寻找旋转排序数组中的最小值 II（★★）


## 题目

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

请找出其中最小的元素。

注意数组中可能存在重复的元素。

<!--more--> 

示例 1：

	输入: [1,3,5]
	输出: 1
	
示例 2：

	输入: [2,2,2,0,1]
	输出: 0

## 分析

### #1

类似 0081 基于 0033 的修改，本题基于 0153 跳过 nums[mid]==nums[j] 的情况即可。

```python
def findMin(self, nums: List[int]) -> int:
	i, j = 0, len(nums) - 1
	while i < j:
		mid = i + (j-i) // 2
		if nums[mid] == nums[j]:
			j -= 1
		elif nums[mid] < nums[j]:
			j = mid
		else:
			i = mid + 1
	return nums[i]
```

40 ms

### #2

也可以用 0153 的第二种方法，只不过要先排除特殊情况。

先将等于 nums[0] 的末尾元素都去掉(注意不要让 nums 为空)。

那么以最小值位置 i 为界，nums[:i] 都大于 nums[-1]，nums[i:] 都小于等于 nums[-1]。

因此二分查找第一个小于等于 nums[-1] 的数即可。

## 解答

```python
def findMin(self, nums: List[int]) -> int:
	while len(nums) > 1 and nums[-1] == nums[0]:
		nums.pop()
	self.__class__.__getitem__ = lambda self, i: nums[i]<=nums[-1]
	return nums[bisect_left(self, True, 0, len(nums))]
```

36 ms


