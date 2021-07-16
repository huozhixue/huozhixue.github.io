# 0287：寻找重复数（★★★）


## 题目

给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。

假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。

nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次。

你可以设计一个时间复杂度 O(n) ，常量级 O(1) 的额外空间，且不修改数组 nums 的解决方案吗？

<!--more--> 

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


## 分析

### #1

显然用哈希的时间复杂度 O(N)，不修改 nums，但空间复杂度 O(N)。

用二分法空间复杂度 O(1)，不修改 nums，但时间复杂度 O(N*logN)。

还可以用类似 {{< lc "0041" >}} 的方法，遍历到 num 时，将对应的 num 位置标记下，
若再次遇到已标记的位置，即为所求。
为了方便，这里直接取负数，方便恢复值。

```python
def findDuplicate(self, nums: List[int]) -> int:
	for num in nums:
		if nums[abs(num)] < 0:
			return abs(num)
		nums[abs(num)] *= -1
```

44 ms

时间复杂度 O(N)，空间复杂度 O(1)，但修改了 nums

### #2

本题还有个很巧妙的方法同时满足三个条件。

将 nums 看作是链表，nums[i] 表示位置 i 的节点指向位置为 nums[i] 的节点。

那么从位置 0 出发的链表必然存在一个环，入环的节点位置即是所求。

问题便等价于 0142 环形链表 II 了。

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

40 ms

