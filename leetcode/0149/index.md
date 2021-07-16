# 0149：直线上最多的点数（★★）



## 题目

给定一个二维平面，平面上有 n 个点，求最多有多少个点在同一条直线上。

<!--more--> 

示例 1:

	输入: [[1,1],[2,2],[3,3]]
	输出: 3
	解释:
	^
	|
	|        o
	|     o
	|  o  
	+------------->
	0  1  2  3  4

示例 2:

	输入: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
	输出: 4
	解释:
	^
	|
	|  o
	|     o        o
	|        o
	|  o        o
	+------------------->
	0  1  2  3  4  5  6

## 分析

本题可能有重复点，因此直接遍历任两点决定的直线的方法是不行的。考虑按点来遍历。

对于某点 i，首先统计出重复点个数 same，然后其它点可以按斜率分组。最终最多的一组个数加上 same，即是经过点 i 的有最多点的直线。

注意斜率是 float，存在精度问题，因此考虑用分数的形式来代替。为了保证相同斜率在同一组，将分数约分，并保证分母为正即可。
再考虑下不存在斜率的特殊情况即可。

## 解答

```python
def maxPoints(self, points: List[List[int]]) -> int:
	def gen_key(p1, p2):
		dx, dy = p2[0] - p1[0], p2[1] - p1[1]
		if dx == 0:
			return 0, 1
		a = math.gcd(dx, dy)
		dx, dy = dx // a, dy // a
		return (dx, dy) if dx > 0 else (-dx, -dy)

	res, n = 0, len(points)
	for i in range(n):
		d, same = defaultdict(int), 1
		for j in range(i + 1, n):
			if points[j] == points[i]:
				same += 1
			else:
				key = gen_key(points[i], points[j])
				d[key] += 1
		res = max(res, same + (max(d.values() or [0])))
	return res
```

52 ms

