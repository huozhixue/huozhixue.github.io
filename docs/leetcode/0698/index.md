# 0698：划分为k个相等的子集（★★★）


## 题目

给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。

 
示例 1：

    输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
    输出： True
    说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
示例 2:

    输入: nums = [1,2,3,4], k = 3
    输出: false
 

提示：
- 1 <= k <= len(nums) <= 16
- 0 < nums[i] < 10000
- 每个元素的频率在 [1,4] 范围内


 
## 分析

{{< lc "0473" >}} 升级版，将 4 改为 k 即可。

## 解答

```python
def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
    s = sum(nums)
    if s%k:
        return False
    n, t = len(nums), s//k
    dp = [0]+[-1]*((1<<n)-1)
    for st in range(1<<n):
        if dp[st]>=0:
            for i in range(n):
                if not st&(1<<i) and dp[st]+nums[i]<=t:
                    dp[st|(1<<i)] = (dp[st]+nums[i])%t
    return dp[-1]==0
```
1572 ms

