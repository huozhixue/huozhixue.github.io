# 0494：目标和（★★）


## 题目

给你一个整数数组 nums 和一个整数 target 。

向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
- 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。

返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

 

示例 1：

    输入：nums = [1,1,1,1,1], target = 3
    输出：5
    解释：一共有 5 种方法让最终目标和为 3 。
    -1 + 1 + 1 + 1 + 1 = 3
    +1 - 1 + 1 + 1 + 1 = 3
    +1 + 1 - 1 + 1 + 1 = 3
    +1 + 1 + 1 - 1 + 1 = 3
    +1 + 1 + 1 + 1 - 1 = 3
示例 2：

    输入：nums = [1], target = 1
    输出：1
     

提示：
- 1 <= nums.length <= 20
- 0 <= nums[i] <= 1000
- 0 <= sum(nums[i]) <= 1000
- -1000 <= target <= 1000



## 分析
  
注意到 sum(nums)<=1000，因此考虑直接递推表达式的和与对应的个数。

令 dp[i] 代表 nums[:i] 得到的计数器，key 为表达式的和，即可递推。

## 解答

```python
def findTargetSumWays(self, nums: List[int], target: int) -> int:
    ct = Counter({0: 1})
    for num in nums:
        ct2 = Counter()
        for k in ct:
            ct2[k+num] += ct[k]
            ct2[k-num] += ct[k]
        ct = ct2
    return ct[target]
```
260 ms
