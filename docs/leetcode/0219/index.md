# 0219：存在重复元素 II（★）


## 题目

给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，
满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。

示例 1：

	输入：nums = [1,2,3,1], k = 3
	输出：true

示例 2：

	输入：nums = [1,0,1,1], k = 1
	输出：true

示例 3：

	输入：nums = [1,2,3,1,2,3], k = 2
	输出：false

提示：

- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- 0 <= k <= 10^5


## 分析

典型的哈希表，边遍历边存储元素位置，并判断上一个位置是否在范围内即可。

## 解答

```python
def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
	d = {}
	for i, num in enumerate(nums):
		if num in d and i-d[num] <= k:
			return True
		d[num] = i
	return False
```
40 ms


