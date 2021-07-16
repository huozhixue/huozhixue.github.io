# 0053：最大子序和（★）


## 题目

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

提示：

- 1 <= nums.length <= 3 * 10^4
- -10^5 <= nums[i] <= 10^5

<!--more--> 

示例 1：
    
    输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
    输出：6
    解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

示例 2：

    输入：nums = [1]
    输出：1

示例 3：
    
    输入：nums = [0]
    输出：0

示例 4：

    输入：nums = [-1]
    输出：-1

示例 5：

    输入：nums = [-100000]
    输出：-100000
 


## 分析 

遍历每个位置 j 作为结尾，找和最大的子数组 [i, j] 即可。

发现遍历中 i 必然是不动或者直接移到 j，因此是滑动窗口。相邻的子数组之和可以递推得到。


## 解答

```python
def maxSubArray(self, nums: List[int]) -> int:
    res = tmp = float('-inf')
    for num in nums:
        tmp = max(tmp+num, num)
        res = max(res, tmp)
    return res
```

28 ms

