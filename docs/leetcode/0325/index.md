# 0325：和等于 k 的最长子数组长度（★★）


## 题目

给定一个数组 nums 和一个目标值 k，找到和等于 k 的最长连续子数组长度。
如果不存在任意一个符合要求的子数组，则返回 0。

 
示例 1:

	输入: nums = [1,-1,5,-2,3], k = 3
	输出: 4 
	解释: 子数组 [1, -1, 5, -2] 和等于 3，且长度最长。

示例 2:

	输入: nums = [-2,-1,2,1], k = 1
	输出: 2 
	解释: 子数组 [-1, 2] 和等于 1，且长度最长。

提示：
- 1 <= nums.length <= 2 * 10^5
- -10^4 <= nums[i] <= 10^4
- -10^9 <= k <= 10^9


## 分析

区间和容易想到前缀和。

先得到前缀和数组 pre，问题转为求 pre 最远的两个元素，其差为 k。

容易想到用哈希表解决。

## 解答

```python
def maxSubArrayLen(self, nums: List[int], k: int) -> int:
    res, d = 0, {}
    for i, x in enumerate(accumulate([0]+nums)):
        res = max(res, i-d.get(x-k, i))
        d.setdefault(x, i)
    return res
```
224 ms



