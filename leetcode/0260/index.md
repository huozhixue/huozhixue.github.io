# 0260：只出现一次的数字 III（★★）


## 题目

给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 
找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。

你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？

<!--more--> 

示例 1：

	输入：nums = [1,2,1,3,2,5]
	输出：[3,5]
	解释：[5, 3] 也是有效的答案。

示例 2：

	输入：nums = [-1,0]
	输出：[-1,0]

示例 3：

	输入：nums = [0,1]
	输出：[1,0]

## 分析

### #1

最简单的就是哈希表。

```python
def singleNumber(self, nums: List[int]) -> List[int]:
	ct = Counter(nums)
	return [num for num in nums if ct[num]==1]
```

44 ms

### #2

要不用额外空间实现，有个非常巧妙的位运算方法。

先将所有数字异或得到 x，显然 x = a^b。在 x 的二进制表示中，任选一个为 1 的位置 i。
那么按二进制的位置 i 是否为 1 可以将 nums 分为两组。

显然 a、b 必然在不同的组，而相同的数必然在同一组。因此每一组就转为问题 0136 。


## 解答

```python
def singleNumber(self, nums: List[int]) -> List[int]:
	x = reduce(lambda x, y: x ^ y, nums)
	i = 1
	while i & x == 0:
		i <<= 1
	a, b = 0, 0
	for num in nums:
		if num & i:
			a ^= num
		else:
			b ^= num
	return [a, b]
```

52 ms
