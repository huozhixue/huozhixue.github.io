# 0726：原子的数量（★★★）


## 题目

给定一个化学式formula（作为字符串），返回每种原子的数量。

原子总是以一个大写字母开始，接着跟随0个或任意个小写字母，表示原子的名字。

如果数量大于 1，原子后会跟着数字表示原子的数量。如果数量等于 1 则不会跟数字。
例如，H2O 和 H2O2 是可行的，但 H1O2 这个表达是不可行的。

两个化学式连在一起是新的化学式。例如 H2O2He3Mg4 也是化学式。

一个括号中的化学式和数字（可选择性添加）也是化学式。例如 (H2O2) 和 (H2O2)3 是化学式。

给定一个化学式，输出所有原子的数量。格式为：第一个（按字典序）原子的名子，跟着它的数量（如果数量大于 1），
然后是第二个原子的名字（按字典序），跟着它的数量（如果数量大于 1），以此类推。

注意:

- 所有原子的第一个字母为大写，剩余字母都是小写。
- formula的长度在[1, 1000]之间。
- formula只包含字母、数字和圆括号，并且题目中给定的是合法的化学式。

 <!--more--> 
 
示例 1:

	输入: 
	formula = "H2O"
	输出: "H2O"
	解释: 
	原子的数量是 {'H': 2, 'O': 1}。

示例 2:

	输入: 
	formula = "Mg(OH)2"
	输出: "H2MgO2"
	解释: 
	原子的数量是 {'H': 2, 'Mg': 1, 'O': 2}。

示例 3:

	输入: 
	formula = "K4(ON(SO3)2)2"
	输出: "K4N2O14S4"
	解释: 
	原子的数量是 {'K': 4, 'N': 2, 'O': 14, 'S': 4}。


## 分析

### #1

典型的栈问题。数量可能很大，所以考虑栈中不保存字符，而是保存计数字典 Counter()。

先考虑没有括号的情况。遇到大写字母时，向后提取出原子的名字，再向后提取出数量，累加到 stack[-1] 中即可。

再考虑有括号的情况。遇到左括号就新加一个 Counter()，用来保存括号内的结果。遇到右括号时就弹出栈顶的 ct，
然后向后提取出数字 cnt，将 ct 的每个原子数量乘以 cnt，累加到 stack[-1] 中即可。

```python
def countOfAtoms(self, formula: str) -> str:
	stack, i, n = [Counter()], 0, len(formula)
	while i < n:
		if formula[i].isupper():
			j = i
			i += 1
			while i < n and formula[i].islower():
				i += 1
			atom = formula[j:i]
			j = i
			while i < n and formula[i].isdigit():
				i += 1
			cnt = int(formula[j:i] or 1)
			stack[-1][atom] += cnt
		elif formula[i] == '(':
			stack.append(Counter())
			i += 1
		else:
			ct = stack.pop()
			i += 1
			j = i
			while i < n and formula[i].isdigit():
				i += 1
			cnt = int(formula[j:i] or 1)
			for k, v in ct.items():
				stack[-1][k] += v*cnt
	res, ct = '', stack.pop()
	for atom in sorted(ct):
		cnt = ct[atom]
		res += atom + str(cnt if cnt > 1 else '')
	return res
```

36 ms

### #2

可以用正则来节省代码。每轮提取 "原子名字+数量" 或 "(" 或 ")+数量"，其它的流程一样。 

## 解答

```python
def countOfAtoms(self, formula: str) -> str:
	stack, regex = [Counter()], r"([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)"
	for atom, cnt, left, right, cnt2 in re.findall(regex, formula):
		if atom:
		  stack[-1][atom] += int(cnt or 1)
		elif left:
		  stack.append(Counter())
		elif right:
			ct = stack.pop()
			for k, v in ct.items():
			  stack[-1][k] += v * int(cnt2 or 1)

	res, ct = '', stack.pop()
	for atom in sorted(ct):
		cnt = ct[atom]
		res += atom + str(cnt if cnt > 1 else '')
	return res
```

28 ms

