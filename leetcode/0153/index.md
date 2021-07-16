# 0153：寻找旋转排序数组中的最小值（★★）


## 题目

假设按照升序排序的数组在预先未知的某个点上进行了旋转。例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] 。

请找出其中最小的元素。

nums 中的所有整数都是 唯一 的。

<!--more--> 

示例 1：

	输入：nums = [3,4,5,1,2]
	输出：1
	
示例 2：

	输入：nums = [4,5,6,7,0,1,2]
	输出：0
	
示例 3：

	输入：nums = [1]
	输出：1



## 分析

### #1

类似 0033 ，考虑二分查找。

	区间 [i,mid] 和 [mid,j] 至少有一边是有序的
	
	如果 [mid, j] 有序，可以排除掉 [mid+1, j]，所以更新 j = mid
	
	否则，[i, mid] 有序而 [mid, j] 无序，可以排除掉 [i, mid]，所以更新 i = mid+1

```python
def findMin(self, nums: List[int]) -> int:
	i, j = 0, len(nums) - 1
	while i < j:
		mid = i + (j-i) // 2
		if nums[mid] < nums[j]:
			j = mid
		else:
			i = mid + 1
	return nums[i]
```

40 ms

### #2

还有个巧妙的想法，以最小值位置 i 为界，nums[:i] 都大于 nums[-1]，nums[i:] 都小于等于 nums[-1]。
因此二分查找第一个小于等于 nums[-1] 的数即可。

借助 python 的魔法方法可以节省代码。

## 解答

```python
def findMin(self, nums: List[int]) -> int:
	self.__class__.__getitem__ = lambda self, i: nums[i]<=nums[-1]
	return nums[bisect_left(self, True, 0, len(nums))]
```

32 ms

