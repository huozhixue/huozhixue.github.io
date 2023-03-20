# 0361：轰炸敌人（★★）


## 题目

给你一个大小为 m x n 的矩阵 grid ，其中每个单元格都放置有一个字符：
- 'W' 表示一堵墙
- 'E' 表示一个敌人
- '0'（数字 0）表示一个空位

返回你使用 一颗炸弹 可以击杀的最大敌人数目。你只能把炸弹放在一个空位里。

由于炸弹的威力不足以穿透墙体，炸弹只能击杀同一行和同一列没被墙体挡住的敌人。


示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/27/bomb1-grid.jpg)

	输入：grid = [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]
	输出：3

示例 2：

![img](https://assets.leetcode.com/uploads/2021/03/27/bomb2-grid.jpg)

	输入：grid = [["W","W","W"],["0","0","0"],["E","E","E"]]
	输出：1
	 

提示：
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 500
- grid[i][j] 可以是 'W'、'E' 或 '0'



## 分析

可以一趟递推求出每个格子的左边有多少个不隔墙的敌人。

同理，可以递推求出右/上/下边有多少个不隔墙的敌人。

统计哪个空位的四个方向的总数最大即可。


## 解答

```python
def maxKilledEnemies(self, grid: List[List[str]]) -> int:
    _key = lambda x,y: 0 if y=='W' else x+(y=='E')
    cal = lambda row: list(accumulate(row, _key, initial=0))[1:]
    L = [cal(row) for row in grid]
    R = [cal(row[::-1])[::-1] for row in grid] 
    U = list(zip(*[cal(col) for col in zip(*grid)]))
    D = list(zip(*[cal(col[::-1])[::-1] for col in zip(*grid)]))
    m, n = len(grid), len(grid[0])
    return max(L[i][j]+R[i][j]+U[i][j]+D[i][j] if grid[i][j]=='0' else 0 for i in range(m) for j in range(n))
```
300 ms

