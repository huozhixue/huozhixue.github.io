# 0327：区间和的个数（★★★）


## 题目

给你一个整数数组 nums 以及两个整数 lower 和 upper 。求数组中，值位于范围 [lower, upper] 
（包含 lower 和 upper）之内的 区间和的个数 。

区间和 S(i, j) 表示在 nums 中，位置从 i 到 j 的元素之和，包含 i 和 j (i ≤ j)。


示例 1：

    输入：nums = [-2,5,-1], lower = -2, upper = 2
    输出：3
    解释：存在三个区间：[0,0]、[2,2] 和 [0,2] ，对应的区间和分别是：-2 、-1 、2 。

示例 2：

    输入：nums = [0], lower = 0, upper = 0
    输出：1
	
提示：
- 1 <= nums.length <= 10^5
- -2^31 <= nums[i] <= 2^31 - 1
- -10^5 <= lower <= upper <= 10^5
- 题目数据保证答案是一个 32 位 的整数
     

## 分析

区间和容易想到前缀和，于是先得到前缀和数组 pre，pre[i]=sum(nums[:i])。

遍历位置 j，求满足 i<j, lower<=pre[j]-pre[i]<=upper 的 i 个数即可。

于是考虑维护 pre[:j] 的有序集合，即可二分查找 i 的个数。

要进行插入、查找的操作，考虑用 SortedList，都能在 O(logN) 时间内完成。

## 解答

```python
def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
    from sortedcontainers import SortedList
    res, sl = 0, SortedList()
    for x in accumulate([0]+nums):
        res += sl.bisect_right(x-lower)-sl.bisect_left(x-upper)
        sl.add(x)
    return res
```
时间复杂度 O(N*logN)，1492 ms

