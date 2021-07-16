# 0349：两个数组的交集


## 题目

给定两个数组，编写一个函数来计算它们的交集。

输出结果中的每个元素一定是唯一的。

可以不考虑输出结果的顺序。

<!--more--> 

示例 1：

	输入：nums1 = [1,2,2,1], nums2 = [2,2]
	输出：[2,2]
	
示例 2:

	输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
	输出：[4,9]

## 分析

python 可以直接调用 set 计算。

## 解答

```python
def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
	return list(set(nums1)&set(nums2))
```

44 ms

