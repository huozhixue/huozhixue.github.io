# 0227：基本计算器 II（★★）


## 题目

实现一个基本的计算器来计算一个简单的字符串表达式的值。

字符串表达式仅包含非负整数，+， - ，*，/ 四种运算符和空格  。 整数除法仅保留整数部分。

你可以假设所给定的表达式都是有效的

<!--more--> 

示例 1:

	输入: "3+2*2"
	输出: 7
	
示例 2:

	输入: " 3/2 "
	输出: 1
	
示例 3:

	输入: " 3+5 / 2 "
	输出: 5


## 分析

### #1

类似 {{< lc "0224" >}}，可以用通用解法。

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

112 ms

### #2

本题不含括号，所以可以简化一下。


## 解答

```python
def calculate(self, s: str) -> int:
	func = {'+': int.__radd__, '-': int.__rsub__, '*': int.__rmul__, '/': lambda x, y: int(y / x)}
	pro = dict(zip('(+-*/', [0, 1, 1, 2, 2]))
	stack, ops = [], []
	for token in re.findall(r'\d+|[-+/*]', '0' + s.replace(' ', '') + '+'):
		if token in '+-*/':
			while ops and pro[ops[-1]] >= pro[token]:
				stack.append(func[ops.pop()](stack.pop(), stack.pop()))
			ops.append(token)
		else:
			stack.append(int(token))
	return stack[0]
```
100 ms
