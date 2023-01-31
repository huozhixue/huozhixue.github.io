# 0959：由斜杠划分区域（★★）


> **第 115 场周赛第 3 题**

## 题目

在由 1 x 1 方格组成的 n x n 网格 grid 中，每个 1 x 1 方块由 '/'、'\' 或空格构成。
这些字符会将方块划分为一些共边的区域。

给定网格 grid 表示为一个字符串数组，返回 区域的数量 。

请注意，反斜杠字符是转义的，因此 '\' 用 '\\' 表示。

示例 1：

![img](https://assets.leetcode.com/uploads/2018/12/15/1.png)

    输入：grid = [" /","/ "]
    输出：2

示例 2：

![img](https://assets.leetcode.com/uploads/2018/12/15/2.png)

    输入：grid = [" /","  "]
    输出：1

示例 3：

![img](https://assets.leetcode.com/uploads/2018/12/15/4.png)

    输入：grid = ["/\\","\\/"]
    输出：5
    解释：回想一下，因为 \ 字符是转义的，所以 "/\\" 表示 /\，而 "\\/" 表示 \/。
 

提示：
- n == grid.length == grid[i].length
- 1 <= n <= 30
- grid[i][j] 是 '/'、'\'、或 ' '


## 分析

区域数量其实就是连通块的数量，考虑用并查集。

'/' 和 '\' 将方格分为四小块，遍历并连通即可。

注意方格 (i, j) 左小块和 (i, j-1) 右小块必然连通，
方格 (i, j) 上小块和 (i-1, j) 下小块必然连通。

## 解答

```python
def regionsBySlashes(self, grid: List[str]) -> int:
    def find(x):
        if f.setdefault(x, x) != x:
            f[x] = find(f[x])
        return f[x]
    
    def union(x, y):
        f[find(x)] = find(y)
    
    n, f = len(grid), {}
    for i, j in product(range(n), range(n)):
        if i:
            union((i, j, 0), (i-1, j, 2))
        if j:
            union((i, j, 3), (i, j-1, 1))
        if grid[i][j] != '/':
            union((i, j, 0), (i, j, 1))
            union((i, j, 2), (i, j, 3))
        if grid[i][j] != '\\':
            union((i, j, 0), (i, j, 3))
            union((i, j, 1), (i, j, 2))
    return sum(find(x)==x for x in f)
```
228 ms
