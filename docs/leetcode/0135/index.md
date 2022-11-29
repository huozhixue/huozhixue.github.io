# 0135：分发糖果（★★）


## 题目

n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：
- 每个孩子至少分配到 1 个糖果。
- 相邻两个孩子评分更高的孩子会获得更多的糖果。

请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

 

示例 1：

	输入：ratings = [1,0,2]
	输出：5
	解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。

示例 2：

	输入：ratings = [1,2,2]
	输出：4
	解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
		 第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
 

提示：
- n == ratings.length
- 1 <= n <= 2 * 10^4
- 0 <= ratings[i] <= 2 * 10^4


## 分析

考虑每个孩子最少多少颗：
- 对于孩子 i，假如左侧的严格递减序列长度为 left[i]，那么 i 至少 left[i] 颗
- 同理，假如右侧的严格递减序列长度为 right[i]，那么 i 至少 right[i] 颗
- 孩子 i 发 max(left[i],right[i]) 颗即可
- left 和 right 数组可以一趟递推求出

## 解答

```python
def candy(self, ratings: List[int]) -> int:
    n = len(ratings)
    left, right = [1] * n, [1] * n
    for i in range(1, n):
        left[i] = left[i-1] + 1 if ratings[i] > ratings[i-1] else 1
    for i in range(n-2, -1, -1):
        right[i] = right[i+1] + 1 if ratings[i] > ratings[i+1] else 1
    return sum(max(l, r) for l, r in zip(left, right))
```
68 ms

