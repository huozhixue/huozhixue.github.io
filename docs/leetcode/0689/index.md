# 0689：三个无重叠子数组的最大和（★★）


## 题目

给你一个整数数组 nums 和一个整数 k ，找出三个长度为 k 、互不重叠、
且全部数字和（3 * k 项）最大的子数组，并返回这三个子数组。

以下标的数组形式返回结果，数组中的每一项分别指示每个子数组的起始位置（下标从 0 开始）。
如果有多个结果，返回字典序最小的一个。

 

示例 1：

    输入：nums = [1,2,1,2,6,7,5,1], k = 2
    输出：[0,3,5]
    解释：子数组 [1, 2], [2, 6], [7, 5] 对应的起始下标为 [0, 3, 5]。
    也可以取 [2, 1], 但是结果 [1, 3, 5] 在字典序上更大。
示例 2：

    输入：nums = [1,2,1,2,1,2,1,2,1], k = 2
    输出：[0,2,4]
 

提示：
- 1 <= nums.length <= 2 * 10^4
- 1 <= nums[i] < 2^16
- 1 <= k <= floor(nums.length / 3)

 
## 分析

令 A[i] 代表 sum(nums[i:i+k])，问题转为求满足 x+k<=y<=z-k 的最大的 A[x]+A[y]+A[z]。

那么遍历 y，求 max(A[:y-k+1])+y+max(A[y+k:]) 即可。

令 left[i] 代表 max(A[:i+1])，right[i] 代表 max(A[i:])，都可以 O(N) 递推得到。

因为要返回下标位置，所以修改下，令 left 和 right 返回最大值对应的最小下标即可。

## 解答

```python
def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
    pre = list(accumulate([0]+nums))
    A = [pre[i+k]-pre[i] for i in range(len(pre)-k)]
    n = len(A)
    left, right = list(range(n)), list(range(n))
    for i in range(1, n):
        left[i] = i if A[i]>A[left[i-1]] else left[i-1]
    for i in range(n-2, -1, -1):
        right[i] = i if A[i]>=A[right[i+1]] else right[i+1]
    i = max(range(k, n-k), key=lambda i: A[left[i-k]]+A[i]+A[right[i+k]])
    return [left[i-k], i, right[i+k]]
```
80 ms

