# 0052：N 皇后 II（★★）


## 题目

n 皇后问题 研究的是如何将 n 个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。

示例 1:

![img](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)

	输入：n = 4
	输出：2
	解释：如上图所示，4 皇后问题存在两个不同的解法。

示例 2：

    输入：n = 1
    输出：1

提示：
- 1 <= n <= 9

	
## 分析

类似 {{< lc "0051" >}} ，还更简单一点。

## 解答

```python
def totalNQueens(self, n: int) -> int:
    def dfs(i):
        if i == n:
            return 1
        res = 0
        for j in range(n):
            if col[j] == dia1[i + j] == dia2[i - j] == 0:
                col[j] = dia1[i + j] = dia2[i - j] = 1
                res += dfs(i + 1)
                col[j] = dia1[i + j] = dia2[i - j] = 0
        return res

    col, dia1, dia2 = (defaultdict(int) for _ in range(3))
    return dfs(0)
```
44 ms
