# 0052：N 皇后 II（★★）


## 题目

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。


<!--more--> 

示例 1:

![img](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)

	输入：n = 4
	输出：2
	解释：如上图所示，4 皇后问题存在两个不同的解法。


	
## 分析

和 0051 差不多，还更简单一点。


## 解答

```python
def totalNQueens(self, n: int) -> int:
	def dfs(i):
		if i == n:
			self.res += 1
			return
		for j in range(n):
			if mark_c[j] == mark_d1[i+j] == mark_d2[i-j] == False:
				mark_c[j] = mark_d1[i+j] = mark_d2[i-j] = True
				dfs(i+1)
				mark_c[j] = mark_d1[i+j] = mark_d2[i-j] = False
	
	self.res = 0
	mark_c = [False for _ in range(n)]
	mark_d1 = [False for _ in range(2*n-1)]
	mark_d2 = [False for _ in range(2*n-1)]
	dfs(0)
	return self.res
```

48 ms
