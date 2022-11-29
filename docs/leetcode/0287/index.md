# 0287：寻找重复数（★★★）


## 题目

给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。

假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。

你设计的解决方案必须不修改数组 nums 且只用常量级 O(1) 的额外空间。

示例 1：

	输入：nums = [1,3,4,2,2]
	输出：2
	
示例 2：

	输入：nums = [3,1,3,4,2]
	输出：3
	
示例 3：

	输入：nums = [1,1]
	输出：1
	
示例 4：

	输入：nums = [1,1,2]
	输出：1

提示：
- 1 <= n <= 10^5
- nums.length == n + 1
- 1 <= nums[i] <= n
- nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次

进阶：
- 如何证明 nums 中至少存在一个重复的数字?
- 你可以设计一个线性级时间复杂度 O(n) 的解决方案吗？

## 分析

### #1

以重复的数 x 为界，任意 y<x 必然满足 [1,y] 范围内的个数 <= y，任意 y>=x 则反之。

因此二分查找第一个满足 [1,y] 范围内的个数 > y 的 y 即可。

```python
def findDuplicate(self, nums: List[int]) -> int:
    self.__class__.__getitem__ = lambda self, x: sum(num<=x for num in nums)>x
    return bisect_left(self, True, 1, len(nums)-1)
```
时间复杂度 O(N*logN)，384 ms

### #2

要求 O(N)，有个非常巧妙的方法：
- 将 nums 看作是链表，nums[i] 表示节点 i 指向节点 nums[i]
- 那么从节点 0 出发的链表必然存在一个环，入环的节点即是所求
- 问题便等价于 {{< lc "0142" >}} 了

## 解答

```python
def findDuplicate(self, nums: List[int]) -> int:
	slow = fast = 0
	while True:
		slow, fast = nums[slow], nums[nums[fast]]
		if slow == fast:
			break
	slow = 0
	while slow != fast:
		slow, fast = nums[slow], nums[fast]
	return slow
```
时间复杂度 O(N)，108 ms

## *附加

如果可以修改数组，那么还有种时间 O(N)，空间 O(1) 的做法：
- 遍历到值 x 时，将位置 abs(x) 的值标记为负数
- 若位置 abs(x) 的值已经被标记为负数，abs(x) 即为所求

```python
def findDuplicate(self, nums: List[int]) -> int:
    for x in nums:
        if nums[abs(x)]<0:
            return abs(x)
        nums[abs(x)] *= -1
```
120 ms

