# 0084：柱状图中最大的矩形（★★）


> <u>**[力扣第 84 题](https://leetcode.cn/problems/largest-rectangle-in-histogram/)**</u>

## 题目

<p>给定 <em>n</em> 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。</p>

<p>求在该柱状图中，能够勾勒出来的矩形的最大面积。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg" /></p>

<pre>
<strong>输入：</strong>heights = [2,1,5,6,2,3]
<strong>输出：</strong>10
<strong>解释：</strong>最大的矩形为图中红色区域，面积为 10
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg" /></p>

<pre>
<strong>输入：</strong> heights = [2,4]
<b>输出：</b> 4</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= heights.length <=10<sup>5</sup></code></li>
<li><code>0 <= heights[i] <= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0085：最大矩形](/leetcode/0085)
- [1793：好子数组的最大分数（1945 分）](/leetcode/1793)


## 分析

- 遍历矩形的底太费时，有个巧妙的想法是遍历矩形的高
- 最大矩形的高度必然是某个柱子的高度
- 于是遍历每根柱子作为高，找左右能延伸的最大宽度即可
- 找左右第一根更矮的柱子，容易想到单调栈
	- 栈 sk 严格递增
	- 遍历到位置 j 且出栈位置 i 时，i 的上一个更小元素即为 sk[-1]
	- 如果 heights[i]>heights[j]，i 的下一个更小元素即为 j，即得到 i 对应的最大宽度
	- 如果 heights[i]==heights[j]，i 和 j 对应的最大宽度相同，可以留给 j 来计算

> 注意最后栈中可能还有剩余元素，需要遍历计算。一个更简单的做法是在 heights 末尾加一个极小值，让所有元素都出栈。

## 解答

```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        res,sk = 0, []
        for j,h in enumerate(heights+[0]):
            while sk and sk[-1][1]>=h:
                _,x = sk.pop()
                i = sk[-1][0] if sk else -1
                res = max(res,x*(j-i-1))
            sk.append((j,h))
        return res
```
233 ms
