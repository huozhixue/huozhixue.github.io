# 0162：寻找峰值（★★）


## 题目

峰值元素是指其值严格大于左右相邻值的元素。

给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，
在这种情况下，返回 任何一个峰值 所在位置即可。

你可以假设 nums[-1] = nums[n] = -∞ 。

你必须实现时间复杂度为 O(log n) 的算法来解决此问题。

示例 1：

	输入：nums = [1,2,3,1]
	输出：2
	解释：3 是峰值元素，你的函数应该返回其索引 2。

示例 2：

	输入：nums = [1,2,1,3,5,6,4]
	输出：1 或 5 
	解释：你的函数可以返回索引 1，其峰值元素为 2；
	     或者返回索引 5， 其峰值元素为 6。
 
提示：
- 1 <= nums.length <= 1000
- -2^31 <= nums[i] <= 2^31 - 1
- 对于所有有效的 i 都有 nums[i] != nums[i + 1]

     
## 分析

显然最大值即是一个峰值。但要求时间复杂度 O(log N)，考虑二分查找。
- nums[mid] > max(nums[mid-1], nums[mid+1])，mid 即为所求
- nums[mid] < nums[mid+1]，[mid+1, n-1] 范围内必然有一个峰值
- nums[mid] < nums[mid-1]，[0, mid-1] 范围内必然有一个峰值

 
## 解答

```python
def findPeakElement(self, nums: List[int]) -> int:
    n = len(nums)
    i, j = 0, n - 1
    while i <= j:
        mid = i + (j - i) // 2
        if (mid == 0 or nums[mid] > nums[mid-1]) and (mid == n-1 or nums[mid] > nums[mid+1]):
            return mid
        if nums[mid] < nums[mid+1]:
            i = mid + 1
        else:
            j = mid - 1
```
32 ms



