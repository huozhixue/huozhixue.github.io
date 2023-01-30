# 0576：出界的路径数（★★）



## 题目

给你一个大小为 m x n 的网格和一个球。球的起始坐标为 [startRow, startColumn] 。
你可以将球移到在四个方向上相邻的单元格内（可以穿过网格边界到达网格之外）。
你 最多 可以移动 maxMove 次球。

给你五个整数 m、n、maxMove、startRow 以及 startColumn ，找出并返回可以将球移出边界的路径数量。
因为答案可能非常大，返回对 10^9 + 7 取余 后的结果。

 
示例 1：

![img](https://assets.leetcode.com/uploads/2021/04/28/out_of_boundary_paths_1.png)
    
    输入：m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
    输出：6
示例 2：

![img](https://assets.leetcode.com/uploads/2021/04/28/out_of_boundary_paths_2.png)
    
    输入：m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
    输出：12
     

提示：
- 1 <= m, n <= 50
- 0 <= maxMove <= 50
- 0 <= startRow < m
- 0 <= startColumn < n


## 分析

按第一步的移动方向即可转为递归子问题。

## 解答

```python
def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
    @lru_cache(None)
    def dfs(i, j, k):
        if not 0<=i<m or not 0<=j<n:
            return 1
        if k==0:
            return 0
        return sum(dfs(x, y, k-1) for x,y in [(i+1, j),(i-1,j),(i,j+1),(i,j-1)])%mod
    
    mod = 10**9+7
    return dfs(startRow, startColumn, maxMove)
```
148 ms

