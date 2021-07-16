# 0041：缺失的第一个正数（★★）


## 题目

给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

进阶：你可以实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案吗？

<!--more--> 

示例 1：

	输入：nums = [1,2,0]
	输出：3
	
示例 2：

	输入：nums = [3,4,-1,1]
	输出：2
	
示例 3：

	输入：nums = [7,8,9,11,12]
	输出：1


## 分析 

### #1

最简单地，遍历 1 到 max(nums)+1，没出现就返回，注意排除边界条件。

```python
def firstMissingPositive(self, nums: List[int]) -> int:
	if not nums or max(nums) < 1:
		return 1
	ct = Counter(nums)
	for i in range(1, max(nums)+2):
		if i not in ct:
			return i
```

40 ms

### #2

不过题目要求就地更改，那么只能考虑交换或赋值了。
有个巧妙的想法是把正数都放在对应的位置上，比如 1 放在第 1 位，3 放在第 3 位，那么再遍历就能发现缺的第一个正数了。

这里不能直接赋值，因为对应位置可能还没遍历到，比如 [2, 1, 0]，首位是 2，如果直接赋值到第 2 位，就把 1 的信息丢失了。
所以只能交换，如果交换过来还是范围内的正数，就应该循环操作，为了防止死循环，当要交换的两个数相等时就应跳出。

## 解答

```python
def firstMissingPositive(self, nums: List[int]) -> int:
	for i, x in enumerate(nums):
		while 0 < x <= len(nums) and x != nums[x-1]:
			nums[i], nums[x-1] = nums[x-1], nums[i]
			x = nums[i]
	for i, x in enumerate(nums):
		if x != i+1:
			return i+1
	return len(nums)+1 
```

36 ms
