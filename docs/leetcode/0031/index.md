# 0031：下一个排列（★★）


## 题目

整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
- 例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。

整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，
如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 
就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，
那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。
- 例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
- 类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
- 而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。

给你一个整数数组 nums ，找出 nums 的下一个排列。

必须 原地 修改，只允许使用额外常数空间。

 

示例 1：

	输入：nums = [1,2,3]
	输出：[1,3,2]

示例 2：

	输入：nums = [3,2,1]
	输出：[1,2,3]

示例 3：

	输入：nums = [1,1,5]
	输出：[1,5,1]
 

提示：
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100


## 分析 

### #1

下一个更大的排列就是增加得最小的排列。
- 若后缀 nums[i:] 能够增大，nums[:i] 就应该保持不变
- 从后往前，找到第一个能增大的后缀 nums[i:]，问题转为求 nums[i:] 的下一个排列
- 要让 nums[i] 增加得最小，应该从 nums[i+1:] 中找到比 nums[i] 大的最小数 nums[j]，替换到 nums[i]
- 然后重新排列 nums[i+1:] 使其最小即可

```python
def nextPermutation(self, nums: List[int]) -> None:
    n = len(nums)
    i = n-2
    while i >= 0 and nums[i] >= nums[i+1]:
        i -= 1
    if i >= 0:
        j = min((nums[j]-nums[i], j) for j in range(i+1, n) if nums[j]>nums[i])[1]
        nums[i], nums[j] = nums[j], nums[i]
    nums[i+1:] = sorted(nums[i+1:])
```
时间复杂度 O(N*logN)，36 ms

### #2

观察发现：
- nums[i+1:] 不能增大，故 nums[i+1:] 单调递减
- 因此从后往前遍历，找到第一个满足 nums[j]>nums[i] 的 j 即可
- 替换后 nums[i+1:] 依然单调递减，因此反转即可

## 解答

```python
def nextPermutation(self, nums: List[int]) -> None:
	n = len(nums)
	i = n-2
	while i >= 0 and nums[i] >= nums[i+1]:
		i -= 1
	if i >= 0:
		j = n-1
		while nums[j] <= nums[i]:
			j -= 1
		nums[i], nums[j] = nums[j], nums[i]
	l, r = i+1, n-1
	while l < r:
		nums[l], nums[r] = nums[r], nums[l]
		l += 1
		r -= 1
```
时间复杂度 O(N)，24 ms
