# 1584：连接所有点的最小费用（★★）


> **第 206 场周赛第 3 题**


## 题目

给你一个points 数组，表示 2D 平面上的一些点，其中 points[i] = [xi, yi] 。

连接点 [xi, yi] 和点 [xj, yj] 的费用为它们之间的 曼哈顿距离 ：|xi - xj| + |yi - yj| ，其中 |val| 表示 val 的绝对值。

请你返回将所有点连接的最小总费用。只有任意两点之间 有且仅有 一条简单路径时，才认为所有点都已连接。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/08/26/d.png)

    输入：points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
    输出：20
    解释：
   
![img](https://assets.leetcode.com/uploads/2020/08/26/c.png)

    我们可以按照上图所示连接所有点得到最小总费用，总费用为 20 。
    注意到任意两个点之间只有唯一一条路径互相到达。

示例 2：

    输入：points = [[3,12],[-2,5],[-4,1]]
    输出：18

示例 3：

    输入：points = [[0,0],[1,1],[1,0],[-1,1]]
    输出：4

示例 4：

    输入：points = [[-1000000,-1000000],[1000000,1000000]]
    输出：4000000

示例 5：

    输入：points = [[0,0]]
    输出：0

提示：
- 1 <= points.length <= 1000
- -10^6 <= xi, yi <= 10^6
- 所有点 (xi, yi) 两两不同。



## 分析

典型的最小生成树问题，按费用排序，依次判断是否添加边即可。

## 解答

```python
def minCostConnectPoints(self, points: List[List[int]]) -> int:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)
    
    def cal(p1, p2):
        return abs(p1[0]-p2[0])+abs(p1[1]-p2[1])

    n = len(points)
    A = [[cal(points[i], points[j]), i, j] for i in range(n) for j in range(i+1, n)]
    res, f = 0, list(range(n))
    for w, i, j in sorted(A):
        if find(i) != find(j):
            union(i, j)
            res += w
    return res
```
2516 ms


