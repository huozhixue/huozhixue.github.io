# 0136：只出现一次的数字（★）


## 题目

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

<!--more--> 

示例 1:

	输入: [2,2,1]
	输出: 1

示例 2:

	输入: [4,1,2,1,2]
	输出: 4
	

## 分析

### #1

最简单的就是哈希表。

```python
def singleNumber(self, nums: List[int]) -> int:
	ct = Counter(nums)
	for num in nums:
		if ct[num] == 1:
			return num
```

时间复杂度 O(N)，60 ms

### #2

要不用额外空间实现，有个非常巧妙的思路，利用了异或运算的特性。

- 异或运算满足交换律和结合律
- 任何数和其自身做异或运算，结果是 0
- 任何数和 00 做异或运算，结果仍然是原来的数

由上面三点可以推出：数组中全部数字的异或结果即为只出现一次的数字


## 解答

```python
def singleNumber(self, nums: List[int]) -> int:
	return reduce(lambda x,y: x^y, nums)
```

时间复杂度 O(N)，56 ms

