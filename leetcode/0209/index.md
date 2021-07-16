# 0209：长度最小的子数组（★）


## 题目

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 
[numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。
如果不存在符合条件的子数组，返回 0 。

提示：

- 1 <= target <= 10^9
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^5


<!--more--> 


示例 1：

    输入：target = 7, nums = [2,3,1,2,4,3]
    输出：2
    解释：子数组 [4,3] 是该条件下的长度最小的子数组。

示例 2：

    输入：target = 4, nums = [1,4,4]
    输出：1

示例 3：

    输入：target = 11, nums = [1,1,1,1,1,1,1,1]
    输出：0


## 分析

遍历每个位置 j 作为结尾，找符合条件的最短子串 [i, j] 即可。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口。

## 解答

```python
def minSubArrayLen(self, target: int, nums: List[int]) -> int:
    res, i, s = float('inf'), 0, 0
    for j, num in enumerate(nums):
        s += num
        while s >= target:
            res = min(res, j-i+1)
            s -= nums[i]
            i += 1
    return res if res < float('inf') else 0
```

56 ms

