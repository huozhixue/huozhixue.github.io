# 0128：最长连续序列(★★)


## 题目

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

进阶：你可以设计并实现时间复杂度为 O(n) 的解决方案吗？


<!--more--> 

示例 1：

	输入：nums = [100,4,200,1,3,2]
	输出：4
	解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

示例 2：

	输入：nums = [0,3,7,2,5,8,4,6,0,1]
	输出：9


## 分析

### #1

最简单的就是去重排序，然后遍历比较每条数字连续的序列即可。

```python
def longestConsecutive(self, nums: List[int]) -> int:
	nums = sorted(set(nums))
	res, i = 0, 0
	for j, num in enumerate(nums):
		if j == len(nums)-1 or num+1 != nums[j+1]:
			res = max(res, j-i+1)
			i = j+1
	return res
```

32 ms

### #2

要求时间复杂度 O(n)，考虑找到每条数字连续的序列的起点，然后循环判断加 1 的数是否在 nums 中即可。

有个巧妙的方法找到每个起点，判断减 1 的数是否在 nums 中即可。


## 解答

```python
def longestConsecutive(self, nums: List[int]) -> int:
	res, nums = 0, set(nums)
	for num in nums:
		if num-1 not in nums:
			cnt = 0
			while num in nums:
				num += 1
				cnt += 1
			res = max(res, cnt) 
	return res
```

44 ms



