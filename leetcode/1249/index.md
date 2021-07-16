# 1249：移除无效的括号（★★）


## 题目

给你一个由 '('、')' 和小写字母组成的字符串 s。

你需要从字符串中删除最少数目的 '(' 或者 ')' （可以删除任意位置的括号)，使得剩下的「括号字符串」有效。

请返回任意一个合法字符串。

有效「括号字符串」应当符合以下 任意一条 要求：

- 空字符串或只包含小写字母的字符串
- 可以被写作 AB（A 连接 B）的字符串，其中 A 和 B 都是有效「括号字符串」
- 可以被写作 (A) 的字符串，其中 A 是一个有效的「括号字符串」



<!--more--> 

示例 1：

	输入：s = "lee(t(c)o)de)"
	输出："lee(t(c)o)de"
	解释："lee(t(co)de)" , "lee(t(c)ode)" 也是一个可行答案。
	
示例 2：

	输入：s = "a)b(c)d"
	输出："ab(c)d"
	
示例 3：

	输入：s = "))(("
	输出：""
	解释：空字符串也是有效的
	
示例 4：

	输入：s = "(a(b(c)d)"
	输出："a(b(c)d)"

## 分析

先想想怎么判断有效括号的。一种方法是借助栈，左括号就入栈，右括号就出栈栈顶的左括号，没有就返回 False，最终再看栈是否为空。

对于本题，可以采用类似的操作，过程中匹配不了的右括号和最后栈里多余的左括号就是应该删除的。

所以第一次遍历记录下应该删除的括号的位置，第二次遍历将剩下位置拼接即可。

## 解答

```python
def minRemoveToMakeValid(self, s: str) -> str:
	stack, extra = [], []
	for i, char in enumerate(s):
		if char == '(':
			stack.append(i)
		elif char == ')':
			if not stack:
				extra.append(i)
			else:
				stack.pop()
	res, extra = '', set(extra+stack)
	for i, char in enumerate(s):
		if i not in extra:
			res += char
	return res
```

124 ms

