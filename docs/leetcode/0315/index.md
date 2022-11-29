# 0315：计算右侧小于当前元素的个数（★★）


## 题目

给你一个整数数组 nums ，按要求返回一个新数组 counts 。数组 counts 有该性质： 
counts[i] 的值是  nums[i] 右侧小于 nums[i] 的元素的数量。


示例 1：

	输入：nums = [5,2,6,1]
	输出：[2,1,1,0] 
	解释：
	5 的右侧有 2 个更小的元素 (2 和 1)
	2 的右侧仅有 1 个更小的元素 (1)
	6 的右侧有 1 个更小的元素 (1)
	1 的右侧有 0 个更小的元素
	
示例 2：

	输入：nums = [-1]
	输出：[0]
	
示例 3：

	输入：nums = [-1,-1]
	输出：[0,0]
	 

提示：
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

     
 

## 分析

考虑从右往左遍历，并维护一个有序集合。二分查找 nums[i] 的位置即可得到 counts[i]。

要进行插入、查找的操作，考虑用 SortedList 维护，都能在 O(logN) 时间内完成。 

## 解答

```python
def countSmaller(self, nums: List[int]) -> List[int]:
    from sortedcontainers import SortedList
    n = len(nums)
    res, sl = [0]*n, SortedList()
    for i in range(n-1, -1, -1):
        res[i] = sl.bisect_left(nums[i])
        sl.add(nums[i])
    return res
```
时间复杂度 O(N*logN)，1088 ms

