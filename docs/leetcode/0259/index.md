# 0259：较小的三数之和（★★）


## 题目

给定一个长度为 n 的整数数组和一个目标值 target ，寻找能够使条件 nums[i] + nums[j] + nums[k] < target 
成立的三元组  i, j, k 个数（0 <= i < j < k < n）。

示例 1：

	输入: nums = [-2,0,1,3], target = 2
	输出: 2 
	解释: 因为一共有两个三元组满足累加和小于 2:
	     [-2,0,1]
		 [-2,0,3]

示例 2：

	输入: nums = [], target = 0
	输出: 0 

示例 3：

	输入: nums = [0], target = 0
	输出: 0 
 

提示:
- n == nums.length
- 0 <= n <= 3500
- -100 <= nums[i] <= 100
- -100 <= target <= 100

## 分析

注意到数的范围很小，因此考虑递推出 所有可能的三元组之和及其个数。

令 dp[i][j] 代表 nums[:i] 所有可能的 j 元组之和及其个数，即可递推。

因为 dp[i] 只依赖于 dp[i-1]，所以可以优化为 3 个计数器。

## 解答

```python
def threeSumSmaller(self, nums: List[int], target: int) -> int:
    d1, d2, d3 = [defaultdict(int) for _ in range(3)]
    for x in nums:
        for y in d2:
            d3[x+y] += d2[y]
        for y in d1:
            d2[x+y] += d1[y]
        d1[x] += 1
    return sum(d3[x] for x in d3 if x<target)
```
116 ms
