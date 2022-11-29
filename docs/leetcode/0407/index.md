# 0407：接雨水 II（★★★）


> **第 6 场周赛第 4 题**

## 题目

给你一个 m x n 的矩阵，其中的值均为非负整数，代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。

示例 1:

![img](https://assets.leetcode.com/uploads/2021/04/08/trap1-3d.jpg)

    输入: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
    输出: 4
    解释: 下雨后，雨水将会被上图蓝色的方块中。总的接雨水量为1+2+1=4。

示例 2:

![img](https://assets.leetcode.com/uploads/2021/04/08/trap2-3d.jpg)

    输入: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
    输出: 10
 
提示:
- m == heightMap.length
- n == heightMap[i].length
- 1 <= m, n <= 200
- 0 <= heightMap[i][j] <= 2 * 10^4



## 分析

对于每个位置，如果有一外圈的柱子都更高，那么该位置就能接到雨水，并且至少接到
（该外圈的最矮柱子高度 H - 当前高度 h）的雨水。
找到使 H 最大的外圈，就得到该位置总共能接到的雨水 maxH - h。

显然遍历所有外圈太耗时了，有个巧妙的想法是从最外圈开始，假设最矮柱子 A 高度 H，
那么相邻内侧位置 B 能接到的雨水就是 max(0, H - B的高度)。
然后可以将位置 A 替换成位置 B，并更新 B 的高度为 max(H, h)，得到一个缩小一格的新外圈，
显然不影响里面位置的结果。

这样遍历逐步缩小的外圈即可得到所有位置能接到的雨水。

具体实现可以用小顶堆维护外圈的高度集合，每轮弹出堆顶即为最矮柱子的高度。
另外，为了方便遍历，可以把经过的柱子高度都置 -1。

## 解答

```python
def trapRainWater(self, heightMap: List[List[int]]) -> int:
    pq, H = [], heightMap
    m, n = len(H), len(H[0])
    for i, j in product(range(m), range(n)):
        if i in [0, m-1] or j in [0, n-1]:
            heappush(pq, [H[i][j], i, j])
            H[i][j] = -1
    res = 0
    while pq:
        h, i, j = heappop(pq)
        for x, y in [(i+1, j), (i-1, j), (i, j-1), (i, j+1)]:
            if 0<=x<m and 0<=y<n and H[x][y]>=0:
                res += max(0, h-H[x][y])
                heappush(pq, [max(h, H[x][y]), x, y])
                H[x][y] = -1
    return res
```
268 ms

## *附加

还有个巧妙的并查集做法。

先考虑简化问题：有哪些格子能接到高度为 1 的雨水？
将高度小于 1 的格子标记为 'O'，其它格子都看作 'X'，显然只有被 'X' 围绕的 'O' 才能接到高度 1 的雨水。

这类似于问题 {{< lc "0130" >}}，可以用并查集解决。将边界上的 'O' 都与一个哑节点 dummy 连通，
再将所有相邻的 'O' 连通。最终所有与 dummy 连通的即是不被围绕的 'O'。

同理，对于高度 2，将高度小于 2 的格子标记为 'O'，即可求出哪些格子能接到高度为 2 的雨水。
注意到前一步被标记为 'O' 的格子无需改变，只需要将高度为 1 的格子标记为 'O' 即可。

因此遍历高度 h，每轮将高度为 h-1 的格子标记为 'O'，并与相邻的 'O' 连通，边界上的 'O' 与 dummy 连通。
依然被围绕的 'O' 个数即是高度为 h 的雨水数量。所有高度的雨水总和即为所求。

而计算被围绕的 'O' 个数可以由 'O' 总数减去与 dummy 连通的 'O' 个数得到。
因此再用 sz 维护并查集每个连通块的大小即可。

```python
def trapRainWater(self, heightMap: List[List[int]]) -> int:
    def find(x):
        if f.setdefault(x, x) != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        root1, root2 = find(x), find(y)
        sz[root2] += sz[root1] * int(root1 != root2)
        f[root1] = root2

    H, m, n = defaultdict(list), len(heightMap), len(heightMap[0])
    for i, j in product(range(m), range(n)):
        H[heightMap[i][j]].append((i, j))
    f, sz, dummy = {}, defaultdict(lambda: 1), (-1, -1)
    res, total = 0, 0
    for h in range(min(H)+1, max(H)+1):
        for i, j in H[h-1]:
            heightMap[i][j] = 'O'
            if i in [0, m - 1] or j in [0, n - 1]:
                union((i, j), dummy)
            for x, y in [(i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)]:
                if 0 <= x < m and 0 <= y < n and heightMap[x][y] == 'O':
                    union((x, y), (i, j))
            total += 1
        res += total - sz[find(dummy)] + 1
    return res
```
672 ms

