# 0368：最大整除子集（★★★）



## 题目

给你一个由 无重复 正整数组成的集合 nums ，请你找出并返回其中最大的整除子集 answer ，
子集中每一元素对 (answer[i], answer[j]) 都应当满足：
- answer[i] % answer[j] == 0 ，或
- answer[j] % answer[i] == 0

如果存在多个有效解子集，返回其中任何一个均可。

示例 1：

    输入：nums = [1,2,3]
    输出：[1,2]
    解释：[1,3] 也会被视为正确答案。

示例 2：
    
    输入：nums = [1,2,4,8]
    输出：[1,2,4,8]
	
提示：
- 1 <= nums.length <= 1000
- 1 <= nums[i] <= 2 * 10^9
- nums 中的所有整数 互不相同
 
 
## 分析

典型的子序列 dp。先将 nums 排序后得到数组 A。

令 dp[i] 代表以 A[i] 结尾的最大整除子集的长度，
按整除子集的倒数第二个数的位置即可递推。

本题要求给出一个最大整除子集，考虑从递推的路径反推：
- 先找到终点，即是 max(dp) 的位置 i
- 当 A[i]%A[j]==0 且 dp[j]==dp[i]-1，那么可以经过 j 得到最长路径
- 依此类推，当 dp[i]==1 时，即得到一条最长路径

## 解答

```python
def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
    A, n = sorted(nums), len(nums)
    dp = [1]*n
    for i in range(n):
        dp[i] = 1+max([dp[j] for j in range(i) if A[i]%A[j]==0], default=0)
    i = dp.index(max(dp))
    res = [A[i]]
    while dp[i] != 1:
        for j in range(i):
            if dp[j]==dp[i]-1 and A[i]%A[j]==0:
                i = j
                break
        res.append(A[i])
    return res[::-1]
```
时间复杂度 O(N^2)，308 ms

