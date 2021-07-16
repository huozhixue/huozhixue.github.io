# 0494：目标和（★★）


## 题目

给你一个整数数组 nums 和一个整数 target 。

向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：

例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

提示：

- 1 <= nums.length <= 20
- 0 <= nums[i] <= 1000
- 0 <= sum(nums[i]) <= 1000
- -1000 <= target <= 100


 <!--more--> 
 
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


## 分析
  
可以直接递归。用辅助函数 help(i, target) 表示用 nums[i:] 能构造的等于 target 的表达式数目。
显然有 help(i, target) = help(i+1, target-nums[i])+help(i+1, target+nums[i])。

## 解答

```python
def findTargetSumWays(self, nums: List[int], target: int) -> int:
    @lru_cache(None)
    def help(i, target):
        if i == len(nums):
            return int(target==0)
        return help(i+1, target-nums[i]) + help(i+1, target+nums[i])
    return help(0, target)
```

300 ms
