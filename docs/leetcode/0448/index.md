# 0448：找到所有数组中消失的数字（★）


> **第  场周赛第  题**

## 题目

给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。
请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

提示：
- n == nums.length
- 1 <= n <= 10^5
- 1 <= nums[i] <= n

进阶：你能在不使用额外空间且时间复杂度为 O(n) 的情况下解决这个问题吗? 
你可以假定返回的数组不算在额外空间内。

示例 1：

    输入：nums = [4,3,2,7,8,2,3,1]
    输出：[5,6]

示例 2：

    输入：nums = [1,1]
    输出：[2]

## 分析

没说不能修改 nums，因此可以用 nums 来保存信息。遍历到 num 时，将对应的位置 num-1 取负数。
最后还为正数的位置 i，其对应的数 i+1 即是没有出现过的数字。

## 解答

```python
def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
	for num in nums:
		i = abs(num)-1
		nums[i] = -abs(nums[i])
	return [i+1 for i, num in enumerate(nums) if num>0]
```
124 ms


