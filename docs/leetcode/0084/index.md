# 0084：柱状图中最大的矩形（★★★）


## 题目

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

示例 1:

![img](https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg)

    输入：heights = [2,1,5,6,2,3]
    输出：10
    解释：最大的矩形为图中红色区域，面积为 10

示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg)

    输入： heights = [2,4]
    输出： 4
 
提示：
- 1 <= heights.length <=10^5
- 0 <= heights[i] <= 10^4

## 分析

### #1

直接遍历矩形的底会超时，有个巧妙的想法是遍历矩形的高，因为最大矩形的高度必然是某个柱子的高度。

遍历每根柱子作为高，找左右能延伸的最大宽度即可，即找左右第一根更矮的柱子。

找每个位置的上/下一个更小元素，容易想到单调栈。

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
    for j in range(n):
        while stack and heights[stack[-1]] > heights[j]:
            right[stack.pop()] = j
        stack.append(j)
    return max(heights[i] * (right[i] - left[i] - 1) for i in range(n))
```
420 ms

### #2

其实可以一趟解决：
- 令栈中严格递增
- 遍历到位置 j 且出栈位置 i 时，i 的上一个更小元素即为 stack[-1]
- 如果 heights[i]>heights[j]，i 的下一个更小元素即为 j，即得到 i 对应的最大宽度
- 如果 heights[i]==heights[j]，i 和 j 对应的最大宽度相同，可以留给 j 来计算

> 注意最后栈中可能还有剩余元素，需要遍历计算。一个更简单的做法是在 heights 末尾加一个极小值，让所有元素都出栈。

## 解答

```python
def largestRectangleArea(self, heights: List[int]) -> int:
    res, stack = 0, []
    for j, y in enumerate(heights+[0]):
        while stack and stack[-1][1] >= y:
            i, x = stack.pop()
            left = stack[-1][0] if stack else -1
            res = max(res, x*(j-left-1))
        stack.append((j, y))
    return res
```
308 ms