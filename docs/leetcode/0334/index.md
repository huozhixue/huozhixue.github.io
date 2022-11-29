# 0334：递增的三元子序列（★★）


## 题目

给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。

如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，
使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。

示例 1：

	输入：nums = [1,2,3,4,5]
	输出：true
	解释：任何 i < j < k 的三元组都满足题意
	
示例 2：

	输入：nums = [5,4,3,2,1]
	输出：false
	解释：不存在满足题意的三元组
	
示例 3：

	输入：nums = [2,1,5,0,4,6]
	输出：true
	解释：三元组 (3, 4, 5) 满足题意，因为 
	nums[3] == 0 < nums[4] == 4 < nums[5] == 6

提示：
- 1 <= nums.length <= 10^5
- -2^31 <= nums[i] <= 2^31 - 1

进阶：你能实现时间复杂度为 O(n) ，空间复杂度为 O(1) 的解决方案吗？

## 分析

{{< lc "0300" >}} 简化版，当最长递增子序列的长度大于 2 时，即可返回 True。

## 解答

```python
def increasingTriplet(self, nums: List[int]) -> bool:
    A = []
    for num in nums:
        j = bisect_left(A, num)
        A[j:j + 1] = [num]
        if len(A) > 2:
            return True
    return False
```
132 ms

