# 0137：只出现一次的数字 II（★★★）


## 题目

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

<!--more--> 

示例 1:

	输入: [2,2,3,2]
	输出: 3

示例 2:

	输入: [0,1,0,1,0,1,99]
	输出: 99
		

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

44 ms

### #2

要不用额外空间实现，有个非常巧妙的位运算方法：
{{< link "逻辑电路角度详细分析该题思路" 
"https://leetcode-cn.com/problems/single-number-ii/solution/luo-ji-dian-lu-jiao-du-xiang-xi-fen-xi-gai-ti-si-l/" >}}。

## 解答

```python
def singleNumber(self, nums: List[int]) -> int:
	X, Y = 0, 0
	for Z in nums:
		Y = Y^Z & ~X
		X = X^Z & ~Y
	return Y
```

44 ms

