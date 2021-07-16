# 0084：柱状图中最大的矩形（★★★）


## 题目

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

<!--more--> 

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/histogram.png)

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/histogram_area.png)

图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。


示例:

	输入: [2,1,5,6,2,3]
	输出: 10



## 分析

### #1

直接遍历矩形的底会超时，有个巧妙的想法是遍历矩形的高。显然最大矩形的高度必然是某个柱子的高度。
因此遍历柱子，然后找左右能延伸的最大宽度即可。

对于 heights[i]，找到左边第一个小于 heights[i] 的位置 left，找到右边第一个小于 heights[i] 的位置 right，
heights[i] 对应的最大宽度即为 right-left-1。

找上一个更小元素和下一个更小元素，容易想到单调栈，类似 {{< lc "0739">}}。

```python
def largestRectangleArea(self, heights: List[int]) -> int:
	n = len(heights)
	left, stack = [-1] * n, []
	for i in range(n):
		while stack and heights[stack[-1]] >= heights[i]:
			stack.pop()
		left[i] = stack[-1] if stack else -1
		stack.append(i)
	right, stack = [n] * n, []
	for i in range(n):
		while stack and heights[stack[-1]] > heights[i]:
			right[stack.pop()] = i
		stack.append(i)
	return max(heights[i] * (right[i] - left[i] - 1) for i in range(n))
```

336 ms

### #2

其实可以一趟解决。

令栈中严格递增（也就是计算 left 的过程）。遍历到位置 i 时，对于栈中满足 heights[j] >= heights[i] 的位置 j 来说，
j 的上一个更小元素就是 stack[-1]，而 j 的下一个小于等于 heights[j] 的元素就是 heights[i]。

- 如果 heights[i]<heights[j]，直接得到 heights[j] 对应的最大宽度。
- 如果 heights[i]==heights[j]，那么 heights[j] 和 heights[i] 对应的最大宽度相同，可以留给 heights[i] 来计算。

注意最后栈中可能还剩余元素，需要遍历计算。一个更简单的做法是在 heights 末尾加一个极小值，让所有元素都出栈。


## 解答

```python
def largestRectangleArea(self, heights: List[int]) -> int:
	res, stack = 0, []
	heights += [0]
	for i in range(len(heights)):
		while stack and heights[stack[-1]] >= heights[i]:
			j = stack.pop()
			left = stack[-1] if stack else -1
			res = max(res, heights[j] * (i - left - 1))
		stack.append(i)
	return res
```

284 ms
