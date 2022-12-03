# 0377：组合总和 Ⅳ（★★）



## 题目

给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。
请你从 nums 中找出并返回总和为 target 的元素组合的个数。

题目数据保证答案符合 32 位整数范围。


示例 1：

    输入：nums = [1,2,3], target = 4
    输出：7
    解释：
    所有可能的组合为：
    (1, 1, 1, 1)
    (1, 1, 2)
    (1, 2, 1)
    (1, 3)
    (2, 1, 1)
    (2, 2)
    (3, 1)
    请注意，顺序不同的序列被视作不同的组合。

示例 2：

    输入：nums = [9], target = 3
    输出：0

提示：
- 1 <= nums.length <= 200
- 1 <= nums[i] <= 1000
- nums 中的所有元素 互不相同
- 1 <= target <= 1000
    
## 分析

典型的线性 dp，按最后一个数即可递归。

## 解答

```python
def combinationSum4(self, nums: List[int], target: int) -> int:
    dp = [1] * (target+1)
    for i in range(1, target+1):
        dp[i] = sum(dp[i-x] for x in nums if x<=i)
    return dp[-1]
```
44 ms
