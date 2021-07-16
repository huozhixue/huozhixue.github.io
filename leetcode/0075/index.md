# 0075：颜色分类（★★）


## 题目

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

你能想出一个仅使用常数空间的一趟扫描算法吗？


<!--more--> 

示例 1：

	输入：nums = [2,0,2,1,1,0]
	输出：[0,0,1,1,2,2]
	
示例 2：

	输入：nums = [2,0,1]
	输出：[0,1,2]

示例 3：

	输入：nums = [0]
	输出：[0]

示例 4：

	输入：nums = [1]
	输出：[1]



## 分析

### #1

最简单的就是直接排序。

```python
def sortColors(self, nums: List[int]) -> None:
	"""
	Do not return anything, modify nums in-place instead.
	"""
	nums.sort()
```

时间复杂度 O(N*log N)，36 ms

### #2

数据范围很窄，所以很适合用计数排序。

```python
def sortColors(self, nums: List[int]) -> None:
	"""
	Do not return anything, modify nums in-place instead.
	"""
	d, cur = Counter(nums), 0
	for i in range(3):
		nums[cur:cur+d[i]] = [i] * (d[i])
		cur += d[i]
```

时间复杂度 O(N)，44 ms

### #3

题目要求常数空间，先想想更简单的情形即只含两种颜色怎么实现。
遍历时将所有 0 交换到数组头部即可。

现在三种颜色，先将所有 0 交换到数组头部，剩下的等价于两种颜色的情形了。所以两趟即可完成。

要合并为一趟，可以将所有 0 交换到数组头部，同时将所有 2 交换到数组尾部。

注意到交换过来的可能也是 0 或 2，所以要循环操作。

## 解答

```python
def sortColors(self, nums: List[int]) -> None:
	"""
	Do not return anything, modify nums in-place instead.
	"""
	i, l, r = 0, 0, len(nums)-1
	while i <= r:
		if nums[i] == 0 and i > l:
			nums[l], nums[i] = nums[i], nums[l]
			l += 1
		elif nums[i] == 2 and i < r:
			nums[i], nums[r] = nums[r], nums[i]
			r -= 1
		else:
			i += 1
```

时间复杂度 O(N)，28 ms
