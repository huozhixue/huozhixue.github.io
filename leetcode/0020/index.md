# 0020：有效的括号


## 题目

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。
- 注意空字符串可被认为是有效字符串。


<!--more--> 

示例 1:

	输入: "()"
	输出: true
	
示例 2:

	输入: "()[]{}"
	输出: true
	
示例 3:

	输入: "(]"
	输出: false
	
示例 4:

	输入: "([)]"
	输出: false
	
示例 5:

	输入: "{[]}"
	输出: true


## 分析

自然的想法就是顺序遍历，左括号就不管，右括号就看是否能和左边相邻的匹配，能匹配就把两个都消除掉。中途匹配失败或者最终还剩下没匹配的就不是有效的。

这个过程其实就是栈。

## 解答

```python
def isValid(self, s: str) -> bool:
	stack, d = [], dict(zip(')]}', '([{'))
	for char in s:
		if char in d:
			if not stack or stack[-1] != d[char]:
				return False
			stack.pop()
		else:
			stack.append(char)
	return not stack
```

时间复杂度 O(N)，36 ms
