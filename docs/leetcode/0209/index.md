# 0209：长度最小的子数组（★）


## 题目

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 
[numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。
如果不存在符合条件的子数组，返回 0 。


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

提示：

- 1 <= target <= 10^9
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^5

进阶：如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。

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
36 ms

## *附加

有个巧妙的二分查找方法：
- 以答案 x 为界，长度小于 x 的子数组必然都不符合，长度 >= x 的子数组中必然有一个符合
- 因此可以二分查找第一个 y 使得存在长度 y 的子数组符合
- 判断是否存在长度 y 的子数组符合，可以用滑动窗口在 O(N) 内实现
- y 的取值范围是 [1,n]，所以最终的时间复杂度为 O(N log N)

```python
def minSubArrayLen(self, target: int, nums: List[int]) -> int:
    def check(x):
        s = 0
        for j, num in enumerate(nums):
            s += num
            if j >= x:
                s -= nums[j-x]
            if j >= x-1 and s >= target:
                return True
        return False

    self.__class__.__getitem__ = lambda self, x: check(x)
    return 0 if sum(nums)<target else bisect_left(self, True, 0, len(nums))
```
76 ms
