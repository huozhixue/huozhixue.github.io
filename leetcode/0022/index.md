# 0022：括号生成（★★）


## 题目

数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

<!--more--> 

示例 1：

	输入：n = 3
	输出：["((()))","(()())","(())()","()(())","()()()"]
	
示例 2：

	输入：n = 1
	输出：["()"]

## 分析

可以一步步添加 '(' 或 ')'，若无效则回到上一步。所以可以用 dfs。


## 解答

```python
def generateParenthesis(self, n: int) -> List[str]:
	def dfs(l, r, tmp):
		if l + r == 2*n:
			res.append(tmp)
			return
		if l < n:
			dfs(l+1, r, tmp+'(')
		if r < l:
			dfs(l, r+1, tmp+')')
			
	res = []
	dfs(0, 0, '')
	return res
```

时间复杂度 O(N)，36 ms
