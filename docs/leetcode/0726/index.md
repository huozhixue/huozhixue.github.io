# 0726：原子的数量（★★）


> <u>**[力扣第 726 题](https://leetcode.cn/problems/number-of-atoms/)**</u>

## 题目

<p>给你一个字符串化学式 <code>formula</code> ，返回 <strong>每种原子的数量</strong> 。</p>

<p>原子总是以一个大写字母开始，接着跟随 0 个或任意个小写字母，表示原子的名字。</p>

<p>如果数量大于 1，原子后会跟着数字表示原子的数量。如果数量等于 1 则不会跟数字。</p>

<ul>
<li>例如，<code>"H2O"</code> 和 <code>"H2O2"</code> 是可行的，但 <code>"H1O2"</code> 这个表达是不可行的。</li>
</ul>

<p>两个化学式连在一起可以构成新的化学式。</p>

<ul>
<li>例如 <code>"H2O2He3Mg4"</code> 也是化学式。</li>
</ul>

<p>由括号括起的化学式并佐以数字（可选择性添加）也是化学式。</p>

<ul>
<li>例如 <code>"(H2O2)"</code> 和 <code>"(H2O2)3"</code> 是化学式。</li>
</ul>

<p>返回所有原子的数量，格式为：第一个（按字典序）原子的名字，跟着它的数量（如果数量大于 1），然后是第二个原子的名字（按字典序），跟着它的数量（如果数量大于 1），以此类推。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>formula = "H2O"
<strong>输出：</strong>"H2O"
<strong>解释：</strong>原子的数量是 {'H': 2, 'O': 1}。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>formula = "Mg(OH)2"
<strong>输出：</strong>"H2MgO2"
<strong>解释：</strong>原子的数量是 {'H': 2, 'Mg': 1, 'O': 2}。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>formula = "K4(ON(SO3)2)2"
<strong>输出：</strong>"K4N2O14S4"
<strong>解释：</strong>原子的数量是 {'K': 4, 'N': 2, 'O': 14, 'S': 4}。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= formula.length &lt;= 1000</code></li>
<li><code>formula</code> 由英文字母、数字、<code>'('</code> 和 <code>')'</code> 组成</li>
<li><code>formula</code> 总是有效的化学式</li>
</ul>


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

