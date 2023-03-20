# 0356：直线镜像（★★）


## 题目

在一个二维平面空间中，给你 n 个点的坐标。问，是否能找出一条平行于 y 轴的直线，
让这些点关于这条直线成镜像排布？

注意：题目数据中可能有重复的点。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/04/23/356_example_1.PNG)

	输入：points = [[1,1],[-1,1]]
	输出：true
	解释：可以找出 x = 0 这条线。

示例 2：

![img](https://assets.leetcode.com/uploads/2020/04/23/356_example_2.PNG)

	输入：points = [[1,1],[-1,-1]]
	输出：false
	解释：无法找出这样一条线。
	 

提示：
- n == points.length
- 1 <= n <= 10^4
- -10^8 <= points[i][j] <= 10^8
 

进阶：你能找到比 O(n^2) 更优的解法吗?


## 分析

如果可行，那么该直线必然是 x=(min(points)[0]+max(points)[0])/2。

然后遍历每个点，判断其关于该直线的镜像点是否存在即可。

注意：看起来是镜像排布的即可，不一定要两两配对。因此可以直接去重。

## 解答

```python
def isReflected(self, points: List[List[int]]) -> bool:
    s = min(points)[0] + max(points)[0]
    vis = {(x, y) for x, y in points}
    return all((s-x, y) in vis for x, y in vis)
```
40 ms



