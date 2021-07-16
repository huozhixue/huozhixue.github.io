# 0219：存在重复元素 II（★）


## 题目

给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。


<!--more--> 

示例 1:

	输入: nums = [1,2,3,1], k = 3
	输出: true

示例 2:

	输入: nums = [1,0,1,1], k = 1
	输出: true

示例 3:

	输入: nums = [1,2,3,1,2,3], k = 2
	输出: false



## 分析

典型的哈希应用，边遍历边用哈希存储元素位置，然后每轮判断上一个相同元素的位置是否在范围内即可。

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


