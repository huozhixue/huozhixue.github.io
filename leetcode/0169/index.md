# 0169：多数元素（★）


## 题目

给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。

 <!--more--> 

示例 1：

	输入：[3,2,3]
	输出：3
	
示例 2：

	输入：[2,2,1,1,1,2,2]
	输出：2
	 


## 分析

### #1

空间复杂度 O(1) 很简单，直接排序后取第 n//2 个元素即可。

```python
def majorityElement(self, nums: List[int]) -> int:
	return sorted(nums)[len(nums)//2]
```

40 ms

时间复杂度 O(N) 也很简单，直接计数取频数最大的元素即可。

```python
def majorityElement(self, nums: List[int]) -> int:
	ct = Counter(nums)
	return max(ct, key=ct.get)
```

### #2

本题有个经典的摩尔投票法，同时达到时间复杂度 O(N)，空间复杂度 O(1) 。
具体做法是：
	
	初始候选人 					cand = nums[0]，cnt = 1
	
	遍历 nums，如果 cnt==0		从头开始 cand = num，cnt = 1

	如果 cnt!=0					cnt += 1 if num == cand else -1
	
	最终 cand 即为所求

需要证明一下。设 nums 的众数为 a：
	
	情况一: 初始 cand == a 且 cnt 一直大于 0			最终 cand == a，正确
	
	情况二: 初始 cand == a 且在位置 i 处 cnt==0		nums[:i] 中 a 刚好占了一半，nums[i:] 的众数依然为 a
	
	情况三: 初始 cand != a 且 cnt 一直大于 0			这是不可能的
	
	情况四: 初始 cand != a 且在位置 i 处 cnt==0		nums[:i] 中 a 不会超过一半，nums[i:] 的众数依然为 a
	
后面依此类推，最终必然转到情况一。故最终 cand == a。
 
## 解答

```python
def majorityElement(self, nums: List[int]) -> int:
	cand, cnt = None, 0
	for num in nums:
		if cnt == 0:
			cand = num
		cnt += 1 if num==cand else -1
	return cand
```

64 ms


