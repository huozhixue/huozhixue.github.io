# 0051：N 皇后（★★）


## 题目

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例 1:

![img](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)

	输入：n = 4
	输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
	解释：如上图所示，4 皇后问题存在两个不同的解法。

示例 2:

	输入：n = 1
	输出：[["Q"]]

提示：
- 1 <= n <= 9

	
## 分析

回溯法的典型应用。每一行只能有一个棋子，所以可以直接按行放，节省时间。

## 解答

```python
def solveNQueens(self, n: int) -> List[List[str]]:
    def dfs(i):
        if i == n:
            res.append(['.'*j+'Q'+'.'*(n-j-1) for j in path])
            return
        for j in range(n):
            if col[j] == dia1[i+j] == dia2[i-j] == 0:
                col[j] = dia1[i+j] = dia2[i-j] = 1
                path.append(j)
                dfs(i + 1)
                path.pop()
                col[j] = dia1[i+j] = dia2[i-j] = 0

    res, path = [], []
    col, dia1, dia2 = (defaultdict(int) for _ in range(3))
    dfs(0)
    return res
```
44 ms
