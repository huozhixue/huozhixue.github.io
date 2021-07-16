# 0051：N 皇后（★★）


## 题目

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。


<!--more--> 

示例 1:

![img](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)

	输入：n = 4
	输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
	解释：如上图所示，4 皇后问题存在两个不同的解法。


示例 2:

	输入：n = 1
	输出：[["Q"]]

	
## 分析

很自然的想法就是依次放棋子，如果无解了就倒退回上一步，这个过程就是回溯法，用 dfs 解决。

根据限制条件，放置方案中必然每一行有一个棋子，所以可以按行数依次放棋子，简化过程。


## 解答

```python
def solveNQueens(self, n: int) -> List[List[str]]:
	def dfs(i, tmp):
		if i == n:
			res.append(['.'*j+'Q'+'.'*(n-j-1) for j in tmp])
			return
		for j in range(n):
			if mark_c[j] == mark_d1[i+j] == mark_d2[i-j] == False:
				mark_c[j] = mark_d1[i+j] = mark_d2[i-j] = True
				dfs(i+1, tmp+[j])
				mark_c[j] = mark_d1[i+j] = mark_d2[i-j] = False

	res = []
	mark_c = [False for _ in range(n)]
	mark_d1 = [False for _ in range(2*n-1)]
	mark_d2 = [False for _ in range(2*n-1)]
	dfs(0, [])
	return res
```

40 ms
