# 0034：在排序数组中查找元素的第一个和最后一个位置（★）


## 题目

给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

进阶： 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？


示例 1：

    输入：nums = [5,7,7,8,8,10], target = 8
    输出：[3,4]

示例 2：

    输入：nums = [5,7,7,8,8,10], target = 6
    输出：[-1,-1]

示例 3：
    
    输入：nums = [], target = 0
    输出：[-1,-1]
 
提示：
- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- nums 是一个非递减数组
- -10^9 <= target <= 10^9

## 分析 

二分查找的典型应用。分别对应 bisect_left 和 bisect_right。

## 解答

```python
def searchRange(self, nums: List[int], target: int) -> List[int]:
    i, j = bisect_left(nums, target), bisect_right(nums, target) - 1
    return [i, j] if i <= j else [-1, -1]
```
24 ms
