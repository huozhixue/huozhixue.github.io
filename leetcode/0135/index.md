# 0135：分发糖果（★★）


## 题目

老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

- 每个孩子至少分配到 1 个糖果。
- 评分更高的孩子必须比他两侧的邻位孩子获得更多的糖果。

那么这样下来，老师至少需要准备多少颗糖果呢？

<!--more--> 

示例 1：

	输入：[1,0,2]
	输出：5
	解释：你可以分别给这三个孩子分发 2、1、2 颗糖果。

示例 2：

	输入：[1,2,2]
	输出：4
	解释：你可以分别给这三个孩子分发 1、2、1 颗糖果。
		 第三个孩子只得到 1 颗糖果，这已满足上述两个条件。

## 分析


对于每个孩子 i，找到以 i 结尾的最长严格递增子数组长度 left[i]，以 i 开始的最长严格递减子数组长度 right[i]，
那么该孩子最少应该有 max(left[i], right[i]) 个糖果。

left 和 right 数组可以分别一次遍历得到。


## 解答


```python
def candy(self, ratings: List[int]) -> int:
	n = len(ratings)
	left, right = [1]*n, [1]*n
	for i in range(1, n):
		left[i] = left[i-1] + 1 if ratings[i] > ratings[i-1] else 1
	for i in range(n-2, -1, -1):
		right[i] = right[i+1] + 1 if ratings[i] > ratings[i+1] else 1
	return sum(max(l, r) for l, r in zip(left, right))
```

80 ms

