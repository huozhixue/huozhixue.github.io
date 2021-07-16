# 0385：迷你语法分析器（★★★）


## 题目

给定一个用字符串表示的整数的嵌套列表，实现一个解析它的语法分析器。

列表中的每个元素只可能是整数或整数嵌套列表

提示：你可以假定这些字符串都是格式良好的：

- 字符串非空
- 字符串不包含空格
- 字符串只包含数字0-9、[、-、,、]
 
 <!--more--> 
 
示例 1：

	给定 s = "324",

	你应该返回一个 NestedInteger 对象，其中只包含整数值 324。

示例 2：

	给定 s = "[123,[456,[789]]]",

	返回一个 NestedInteger 对象包含一个有两个元素的嵌套列表：

	1. 一个 integer 包含值 123
	2. 一个包含两个元素的嵌套列表：
		i.  一个 integer 包含值 456
		ii. 一个包含一个元素的嵌套列表
			 a. 一个 integer 包含值 789
 
## 分析

### #1

先试试递归。如果 s[0] 不是左括号，那么结果就是一个整数值，否则，可以将 s 按元素拆分，转为递归子问题。

具体拆分时，用 mark 代表左右括号个数之差，只有当 mark 为 0 且下一个字符是 ',' 或过界时，才是元素末尾。

```python
def deserialize(self, s: str) -> NestedInteger:
	if s[0] != '[':
		return NestedInteger(int(s))
	res, s = NestedInteger(), s[1:-1]
	mark, i = 0, 0
	for j, char in enumerate(s):
		if char == '[':
			mark += 1
		elif char == ']':
			mark -= 1
		if mark==0 and (j==len(s)-1 or s[j+1] == ','):
			res.add(self.deserialize(s[i:j+1]))
			i = j + 2
	return res
```

76 ms

### #2

本题更适合用栈来解决。有点类似 {{< lc "0341" >}} ，保存每一层的元素，遇到左括号就入栈一个列表保存下一层的元素，
遇到右括号则将当前层出栈，添加到上一层即可。比如示例 2，先去掉最外层括号，然后：

	123,				[[123]]
	123,[				[[123], []]
	123,[456,			[[123], [456]]
	123,[456,[			[[123], [456], []]
	123,[456,[789		[[123], [456], [789]]
	123,[456,[789]		[[123], [456, [789]]]
	123,[456,[789]]		[[123, [456, [789]]]]

最终的 stack[0] 即为所求。

## 解答

```python
def deserialize(self, s: str) -> NestedInteger:
	if s[0] != '[':
		return NestedInteger(int(s))
	stack, s = [NestedInteger()], s[1:-1]
	i = 0
	while i < len(s):
		if s[i] in '-0123456789':
			j = i + 1
			while j < len(s) and s[j] in '0123456789':
				j += 1
			stack[-1].add(NestedInteger(int(s[i:j])))
			i = j - 1
		elif s[i] == '[':
			stack.append(NestedInteger())
		elif s[i] == ']':
			tmp = stack.pop()
			stack[-1].add(tmp)
		i += 1
	return stack[0]
```

60 ms



