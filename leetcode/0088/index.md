# 0088：合并两个有序数组（★）


## 题目

给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，
这样它就有足够的空间保存来自 nums2 的元素。


<!--more--> 
示例 1：

	输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
	输出：[1,2,2,3,5,6]
	
示例 2：

	输入：nums1 = [1], m = 1, nums2 = [], n = 0
	输出：[1]
 


## 分析

如果合并到新数组的话，遍历归并即可。

这里合并到 nums1 中，要对相应位置赋值，但是直接赋值可能会覆盖 nums1 的元素，丢失信息。

有个巧妙的想法是倒序遍历，nums1 前面的位置最后才赋值，所以不会丢失信息。

## 解答

```python
def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
	"""
	Do not return anything, modify nums1 in-place instead.
	"""
	i, j, k = m-1, n-1, m+n-1
	while j >= 0 and k >= 0:
		if i < 0 or nums1[i] <= nums2[j]:
			nums1[k] = nums2[j]
			j -= 1
		else:
			nums1[k] = nums1[i]
			i -= 1
		k -= 1
```

32 ms


