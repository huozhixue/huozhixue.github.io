# 0149：直线上最多的点数（★★）


## 题目

给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。
求最多有多少个点在同一条直线上。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg)

    输入：points = [[1,1],[2,2],[3,3]]
    输出：3

示例 2：

![img](https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg)   
    
    输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
    输出：4

提示：
- 1 <= points.length <= 300
- points[i].length == 2
- -10^4 <= xi, yi <= 10^4
- points 中的所有点 互不相同
     
	 
## 分析

本题可能有重复点，因此不能按直线遍历，考虑按点来遍历：
- 对于点 i，首先统计重复个数 same
- 然后将其它点可以按斜率分组
- 最大的组大小加上 same 即可

考虑到精度问题，可以用最简分数来表示斜率，注意下不存在斜率的特殊情况即可。

## 解答

```python
def maxPoints(self, points: List[List[int]]) -> int:
    from fractions import Fraction
    res = 0
    for p in points:
        d, same = defaultdict(int), 0
        for q in points:
            if p==q:
                same += 1
            else:
                key = str(Fraction(q[1]-p[1], q[0]-p[0])) if q[0]!=p[0] else '1/0'
                d[key] += 1
        res = max(res, same+max(d.values(), default=0))
    return res
```
212 ms

