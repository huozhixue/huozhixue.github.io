# 0713：乘积小于K的子数组（★★）


## 题目

给定一个正整数数组 nums。

找出该数组内乘积小于 k 的连续的子数组的个数。

说明:

- 0 < nums.length <= 50000
- 0 < nums[i] < 1000
- 0 <= k < 10^6


 <!--more--> 
 
示例 1:

    输入: nums = [10,5,2,6], k = 100
    输出: 8
    解释: 8个乘积小于100的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。
    需要注意的是 [10,5,2] 并不是乘积小于100的子数组。



## 分析

遍历每个位置 j 作为结尾，找符合条件的最长子数组 [i, j]，即找到 j-i+1 个。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口。

注意排除 k<=1 的特殊情况。


## 解答

```python
def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
    if k <= 1:
        return 0
    res, i, s = 0, 0, 1
    for j, num in enumerate(nums):
        s *= num
        while s >= k:
            s //= nums[i]
            i += 1
        res += j-i+1
    return res
```

200 ms

