# 1190：反转每对括号间的子串（★★）




## 题目

给出一个字符串 s（仅含有小写英文字母和括号）。

请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。

注意，您的结果中 不应 包含任何括号。

 <!--more--> 
 
示例 1：

	输入：s = "(abcd)"
	输出："dcba"
	
示例 2：

	输入：s = "(u(love)i)"
	输出："iloveu"
	
示例 3：

	输入：s = "(ed(et(oc))el)"
	输出："leetcode"
	
示例 4：

	输入：s = "a(bcdefghijkl(mno)p)q"
	输出："apmnolkjihgfedcbq"


## 分析

### #1

有点类似 0856 ，遇到右括号时，找到对应的左括号，反转这一段中的字符串并保存。某一段的字符串可以根据之前保存的字符串递推得到。

可以用栈实现，例如示例 2 的过程：

	(u(love			[(, u, (, l, o, v, e]
	(u(love)		[(, u, evol]
	(u(love)i		[(, u, evol, i]
	(u(love)i)		[iloveu]

```python
def reverseParentheses(self, s: str) -> str:
	stack = []
	for char in s:
		if char != ')':
			stack.append(char)
		else:
			tmp = ''
			while stack[-1] != '(':
				tmp += stack.pop()[::-1]
			stack.pop()
			stack.append(tmp)
	return ''.join(stack)
```

28 ms

### #2

上面的解法有反转操作，最坏时间复杂度为 $O(N^2)$，有个巧妙的想法能优化至 O(N)。

上面的解法其实是从最里面的括号开始，逐层反转，从里到外去掉括号。也可以从外到里去掉括号，比如示例 2：

		(u(love)i)
	->	i(evol)u
	->	iloveu

其实不需要做实际的翻转操作，改变指针和方向即可。设当前指针为 i，遇到括号重设位置和方向，示例 2 的过程为：

	i=0 	s[i]=='('		-> i=对应的 ')' 位置 - 1 = 8，方向改为反向
	i=8		s[i]=='i'		-> 添加到 res，i 前进一步 = 7
	i=7		s[i]==')'		-> i=对应的 '(' 位置 + 1 = 3，方向改为正向
	i=3		s[i]=='l'		-> 添加到 res，i 前进一步 = 4
	...
	i=7		s[i]==')'		-> i=对应的 '(' 位置 - 1 = 1，方向改为反向
	i=1		s[i]=='u'		-> 添加到 res，i 前进一步 = 0
	i=0		s[i]=='('		-> i=对应的 ')' 位置 + 1 = 10，方向改为正向
	i=10 	溢出，终止

每对 '()' 的位置可以用栈一遍得到，因此最坏时间复杂度为线性。


## 解答

```python
def reverseParentheses(self, s: str) -> str:
	stack, d = [], {}
	for j, char in enumerate(s):
		if char == '(':
			stack.append(j)
		elif char == ')':
			i = stack.pop()
			d[i], d[j] = j, i
	res, i, flag = '', 0, 1
	while i < len(s):
		if s[i] in '()':
			flag *= -1
			i = d[i]+flag
		else:
			res += s[i]
			i += flag
	return res
```

时间复杂度 O(N)，40 ms

