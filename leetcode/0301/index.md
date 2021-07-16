# 0301：删除无效的括号（★★）


## 题目

删除最小数量的无效括号，使得输入的字符串有效，返回所有可能的结果。

说明: 输入可能包含了除 ( 和 ) 以外的字符。


<!--more--> 

示例 1:

	输入: "()())()"
	输出: ["()()()", "(())()"]
	
示例 2:

	输入: "(a)())()"
	输出: ["(a)()()", "(a())()"]
	
示例 3:

	输入: ")("
	输出: [""]



## 分析

### #1

最简单的就是先判断 s 是否有效，再遍历所有删除一个括号后的子序列 s1，若存在有效的，就返回所有有效的。

否则继续遍历所有删除两个括号后的子序列 s2。依此类推。

判断有效括号就简单了。令 diff 代表当前左右括号个数之差，只要遍历过程中 diff>=0 且最终 diff==0 即可。
				
```python
def removeInvalidParentheses(self, s: str) -> List[str]:
	def isValid(s):
		diff, d = 0, {'(': 1, ')': -1}
		for char in s:
			diff += d.get(char, 0)
			if diff < 0:
				return False
		return diff == 0

	tmp = [s]
	while True:
		valid = list(filter(isValid, tmp))
		if valid:
			return valid
		tmp = set(t[:i]+t[i+1:] for t in tmp for i,char in enumerate(t) if char in '()')
```

160 ms

### #2

类似 0921 ，可以先得出最少应删除的括号个数 k。

然后遍历所有删除 k 个括号的子序列，返回所有有效的。


## 解答

```python
def removeInvalidParentheses(self, s: str) -> List[str]:
	def help(s):
		res, diff, d = 0, 0, {'(': 1, ')': -1}
		for char in s:
			diff += d.get(char, 0)
			if diff == -1:
				res += 1
				diff += 1
		return res+diff

	tmp = [s]
	for _ in range(help(s)):
		tmp = set(t[:i]+t[i+1:] for t in tmp for i,char in enumerate(t) if char in '()')
	return [t for t in tmp if help(t)==0]
```

148 ms

