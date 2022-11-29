# 0001：两数之和（★）


## 题目

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，
并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：
    
    输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：

    输入：nums = [3,2,4], target = 6
    输出：[1,2]

示例 3：

    输入：nums = [3,3], target = 6
    输出：[0,1]

提示：
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- 只会存在一个有效答案

## 分析

### #1

最直接的就是是两次遍历，找出答案。

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
	for i in range(len(nums)):
		for j in range(i+1, len(nums)):
			if nums[i] + nums[j] == target:
				return [i, j]
```

时间复杂度 O(N^2)，2860 ms

### #2

注意到第二层遍历等价于查询一个数，所以可以用哈希表节省时间。

边遍历边用哈希存储元素位置，每轮查询前面是否有对应的数即可。
 
## 解答

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    d = {}
    for j, num in enumerate(nums):
        if target-num in d:
            return [d[target-num], j]
        d[num] = j
```
时间复杂度 O(N)，28 ms
