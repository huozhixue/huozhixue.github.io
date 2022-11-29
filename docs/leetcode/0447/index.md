# 0447：回旋镖的数量（★）


> **第  场周赛第  题**

## 题目

给定平面上 n 对 互不相同 的点 points ，其中 points[i] = [xi, yi] 。
回旋镖 是由点 (i, j, k) 表示的元组 ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。

返回平面上所有回旋镖的数量。

提示：
- n == points.length
- 1 <= n <= 500
- points[i].length == 2
- -10^4 <= xi, yi <= 10^4
- 所有点都 互不相同

 
示例 1：

	输入：points = [[0,0],[1,0],[2,0]]
	输出：2
	解释：两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]

示例 2：

	输入：points = [[1,1],[2,2],[3,3]]
	输出：2

示例 3：

	输入：points = [[1,1]]
	输出：0
 


## 分析

n 个点各不相同，因此可以遍历 n 个点，作为回旋镖的中心，计算能构成多少回旋镖。

具体的，可以统计每个点到该点的距离。假设有 v 个点到该点的距离都为 dis，那么对应的回旋镖数量即为 v*(v-1)。

## 解答

```python
def numberOfBoomerangs(self, points: List[List[int]]) -> int:
	res = 0
	for x in points:
		ct = Counter((x[0]-y[0])**2+(x[1]-y[1])**2 for y in points)
		res += sum(v*(v-1) for v in ct.values())
	return res
```
1292 ms


