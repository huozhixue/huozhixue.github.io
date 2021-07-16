# 0224：基本计算器（★★★）


## 题目

实现一个基本的计算器来计算一个简单的字符串表达式 s 的值。

s 由数字、'+'、'-'、'('、')'、和 ' ' 组成。s 表示一个有效的表达式。

<!--more--> 

示例 1：

	输入：s = "1 + 1"
	输出：2
	
示例 2：

	输入：s = " 2-1 + 2 "
	输出：3
	
示例 3：

	输入：s = "(1+(4+5+2)-3)+(6+8)"
	输出：23

## 分析

计算表达式的一个通用解法是遍历时将前面能够计算的先计算了。具体实现：

	用一个栈 stack 维护还剩下的数字，一个栈 ops 维护还剩下的运算符。
	
	遇到数字		入栈 stack

	遇到运算符 op	ops 中到上一个 '(' 之前且优先级大于等于 op 的运算符应该先计算。
					每次计算时出栈运算符 ops[-1]，出栈两个数字 stack[-2:]，计算后再入栈 stack。
					最后再将 op 入栈 ops。
	
	遇到 '(' 		入栈 ops
	
	遇到 ')' 		ops 中到上一个 '(' 之前的运算符应该先运算。
					每次计算时出栈运算符 ops[-1]，出栈两个数字 stack[-2:]，计算后再入栈 stack。
					最后再出栈 '('。
	
为了方便，可以在 s 后面添加一个优先级最低的运算符（这里用的加号），保证所有运算符都出栈。最终 stack[-1] 即为结果。

注意还有个特殊情况，式子中 '+-' 可能代表正负而不是计算符号，比如 '-2+1'、'+1+1' 。
因为正负号只会出现在开头或 '(' 之后，所以预先处理下，在所有正负号前加 '0' 即可。

## 解答

```python
def calculate(self, s: str) -> int:
	func = {'+': int.__radd__, '-': int.__rsub__, '*': int.__rmul__, '/': lambda x, y: int(y / x)}
	s = s.replace(' ', '').replace('(-', '(0-').replace('(+', '(0+')
	s = '0' + s if s[0] in '-+' else s
	pro = dict(zip('(+-*/', [0, 1, 1, 2, 2]))
	stack, ops = [], []
	for token in re.findall(r'\d+|[-+/*()]', s + '+'):
		if token in '+-*/':
			while ops and pro[ops[-1]] >= pro[token]:
				stack.append(func[ops.pop()](stack.pop(), stack.pop()))
			ops.append(token)
		elif token == '(':
			ops.append(token)
		elif token == ')':
			while ops[-1] != '(':
				stack.append(func[ops.pop()](stack.pop(), stack.pop()))
			ops.pop()
		else:
			stack.append(int(token))
	return stack[0]
```

120 ms
