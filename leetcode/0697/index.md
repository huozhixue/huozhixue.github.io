# 0697：数组的度（★）


## 题目

给定一个非空且只包含非负数的整数数组 nums，数组的度的定义是指数组里任一元素出现频数的最大值。

你的任务是在 nums 中找到与 nums 拥有相同大小的度的最短连续子数组，返回其长度。


 <!--more--> 
 
示例 1：

	输入：[1, 2, 2, 3, 1]
	输出：2
	解释：
	输入数组的度是2，因为元素1和2的出现频数最大，均为2.
	连续子数组里面拥有相同度的有如下所示:
	[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
	最短连续子数组[2, 2]的长度为2，所以返回2.
	
示例 2：

	输入：[1,2,2,3,1,4,2]
	输出：6

 
## 分析

找到频数等于度的元素后，对应的子数组就是元素首次出现位置 i 和末次出现位置 j 之间 nums[i:j+1]。

因此可以先遍历得到每个元素的频数、首次出现位置、末次出现位置，再遍历找到结果。

## 解答

```python
def findShortestSubArray(self, nums: List[int]) -> int:
	d_first, d_last, d_cnt = {}, {}, Counter(nums)
	for i, num in enumerate(nums):
		d_first[num] = d_first.get(num, i)
		d_last[num] = i
	degree = max(d_cnt.values())
	res = min(d_last[num]-d_first[num]+1 for num, cnt in d_cnt.items() if cnt==degree)
	return res
```

64 ms

