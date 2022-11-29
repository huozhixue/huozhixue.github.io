# 0075：颜色分类（★★）


## 题目

给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，
使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库的sort函数的情况下解决这个问题。
 
示例 1：

	输入：nums = [2,0,2,1,1,0]
	输出：[0,0,1,1,2,2]

示例 2：

	输入：nums = [2,0,1]
	输出：[0,1,2]
	 

提示：
- n == nums.length
- 1 <= n <= 300
- nums[i] 为 0、1 或 2
 


## 分析

### #1

最简单的就是直接排序。

```python
def sortColors(self, nums: List[int]) -> None:
	nums.sort()
```
时间复杂度 O(N*log N)，36 ms

### #2

题目要求 O(1) 空间，只能考虑交换或赋值了。
- 有个巧妙的想法是将所有 0 放到头部，所有 2 放到尾部，剩下部分即为 1
- 本题不能直接赋值，可能会覆盖掉有用信息，所以考虑交换
- 特别注意，如果交换过来还是 0 或 2，应该循环操作

## 解答

```python
def sortColors(self, nums: List[int]) -> None:
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
