# 0456：132模式（★★）


## 题目

给定一个整数序列：$a_1, a_2, ..., a_n$，一个132模式的子序列 $a_i, a_j, a_k$ 被定义为：当 i < j < k 时，$a_i < a_k < a_j$。
设计一个算法，当给定有 n 个数字的序列时，验证这个序列中是否含有132模式的子序列。


 <!--more--> 
 
示例1:

	输入: [1, 2, 3, 4]

	输出: False

	解释: 序列中不存在132模式的子序列。
	
示例 2:

	输入: [3, 1, 4, 2]

	输出: True

	解释: 序列中有 1 个132模式的子序列： [1, 4, 2].
	
示例 3:

	输入: [-1, 3, 2, 0]

	输出: True

	解释: 序列中有 3 个132模式的的子序列: [-1, 3, 2], [-1, 3, 0] 和 [-1, 2, 0].



## 分析

### #1

遍历 b=nums[j]，那么 a 取 min(nums[:j])，在 nums[j+1:] 中找 c 使得 a < c < b 即可。

min(nums[:j]) 可以递推得到。而 nums[j+1:] 可以维护一个排序的子数组，然后二分查找。

```python
def find132pattern(self, nums: List[int]) -> bool:
	a, tmp = float('inf'), sorted(nums)
	for b in nums:
		tmp.pop(bisect_left(tmp, b))
		if a < b:
			k = bisect_right(tmp, a)
			if k < len(tmp) and tmp[k] < b:
				return True
		a = min(a, b)
	return False
```

时间复杂度 O(N*log N)，76 ms

### #2

还有个巧妙的单调栈解法。从右往左遍历，维护一个 max_c 代表满足 32 模式的最大的 2 ，维护一个 stack 保存比 max_c 大的所有数。
遍历到 num 时：

	如果 num < max_c					显然 num 可以作为 132 模式的 1，返回 True
	如果 num == max_c					不影响，可以直接跳过
	如果 max_c < num < min(stack)		将 num 添加到 stack 中
	如果 num == min(stack)				不影响，可以直接跳过
	如果 num > min(stack)				min(stack) 可以作为新的 max_c，将其删除。循环操作直到转为其它情况。

注意到添加 num 时会将 stack 中小于 num 的值删除，因此 stack 是单调递减的，每次删除操作在结尾。所以 stack 是一个单调栈。


## 解答

```python
def find132pattern(self, nums: List[int]) -> bool:
	stack, max_c = [], float('-inf')
	for num in nums[::-1]:
		if num < max_c:
			return True
		while stack and num > stack[-1]:
			max_c = stack.pop()
		if num > max_c:
			stack.append(num)
	return False
```

时间复杂度 O(N)，44 ms
