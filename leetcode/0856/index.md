# 0856：括号的分数（★★）



## 题目

给定一个平衡括号字符串 S，按下述规则计算该字符串的分数：

- () 得 1 分。
- AB 得 A + B 分，其中 A 和 B 是平衡括号字符串。
- (A) 得 2 * A 分，其中 A 是平衡括号字符串。

 <!--more--> 
 
示例 1：

	输入： "()"
	输出： 1
	
示例 2：

	输入： "(())"
	输出： 2
	
示例 3：

	输入： "()()"
	输出： 2
	
示例 4：

	输入： "(()(()))"
	输出： 6

 
## 分析

### #1

比较直接的想法就是遍历 S，遇到右括号时，找到对应的左括号，计算这一段代表的值，并保存。某一段的值可以根据之前保存的值递推得到。

具体可以用栈实现，比如示例 4 的过程：

	(				[(]
	((				[(, (]
	(()				[(, 1]
	(()(			[(, 1, (]
	(()((			[(, 1, (, (]
	(()(()			[(, 1, (, 1]
	(()(())			[(, 1, 2]
	(()(()))		[6]
	
```python
def scoreOfParentheses(self, S: str) -> int:
	stack = []
	for char in S:
		if char == '(':
			stack.append(char)
		else:
			tmp = 0
			while stack[-1] != '(':
				tmp += stack.pop()
			stack.pop()
			stack.append(max(1, 2*tmp))
	return sum(stack)
```

40 ms

### #2

还有种很巧妙的想法，观察示例 4 的计算过程

	(()(())) 是 (A) 形式		分数是 2*()(()) 的分数
	()(()) 是 A+B 形式			分数是 () + (()) 的分数
	所以 (()(())) = 2*() + 2*(()) = (()) + ((()))
	
利用乘法分配律拆分后，分数可以表示成 $2^a+2^b+...$ 的形式，而 a、b 其实就是最里面的 () 的嵌套深度减一

因此遍历 s，找到所有的 () 及对应的嵌套深度即可
	

## 解答

```python
def scoreOfParentheses(self, S: str) -> int:
	res, diff = 0, 0
	for i, char in enumerate(S):
		if char == '(':
			diff += 1
		else:
			diff -= 1
			if S[i-1] == '(':
				res += (1<<diff)
	return res
```

36 ms

