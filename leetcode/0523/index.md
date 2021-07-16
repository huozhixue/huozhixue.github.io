# 0523：连续的子数组和（★）


## 题目

给定一个包含 非负数 的数组和一个目标 整数 k，编写一个函数来判断该数组是否含有连续的子数组，其大小至少为 2，且总和为 k 的倍数，即总和为 n*k，其中 n 也是一个整数。

 <!--more--> 
 
示例 1：

	输入：[23,2,4,6,7], k = 6
	输出：True
	解释：[2,4] 是一个大小为 2 的子数组，并且和为 6。
	
示例 2：

	输入：[23,2,6,4,7], k = 6
	输出：True
	解释：[23,2,6,4,7]是大小为 5 的子数组，并且和为 42。

	
## 分析

类似 0560 ，不过改成了总和为 k 的倍数。那么前缀和改为模 k 的余数即可。

注意 k 为 0 的特殊情况。


## 解答

```python
def checkSubarraySum(self, nums: List[int], k: int) -> bool:
	s, d = 0, {}
	for i, num in enumerate(nums):
		d[s] = d.get(s, i)
		s = (s+num) % k if k else s+num
		if s in d and d[s] < i:
			return True
	return False
```

时间复杂度 O(N)，44 ms

