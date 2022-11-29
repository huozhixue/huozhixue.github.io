# 0053：最大子数组和（★）


## 题目

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

 
示例 1：

    输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
    输出：6
    解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

示例 2：

    输入：nums = [1]
    输出：1

示例 3：

    输入：nums = [5,4,-1,7,8]
    输出：23
 

提示：
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

 

## 分析 

令 dp[j] 表示以位置 j 结尾的最大和，则

	dp[j] = max(0, dp[j-1]) + nums[j]。

最后 max(dp) 即为所求。还可以优化为一个参数。

## 解答

```python
def maxSubArray(self, nums: List[int]) -> int:
    res = dp = float('-inf')
    for num in nums:
        dp = max(0, dp) + num
        res = max(res, dp)
    return res
```
140 ms

