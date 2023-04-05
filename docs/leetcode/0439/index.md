# 0439：三元表达式解析器（★）


> <u>**[力扣第 439 题](https://leetcode.cn/problems/ternary-expression-parser/)**</u>

## 题目

<p>给定一个表示任意嵌套三元表达式的字符串 <code>expression</code> ，求值并返回其结果。</p>

<p>你可以总是假设给定的表达式是有效的，并且只包含数字， <code>'?'</code> ，  <code>':'</code> ，  <code>'T'</code> 和 <code>'F'</code> ，其中 <code>'T'</code> 为真， <code>'F'</code> 为假。表达式中的所有数字都是 <strong>一位</strong> 数(即在 <strong>[0,9] </strong>范围内)。</p>

<p>条件表达式从右到左分组(大多数语言中都是这样)，表达式的结果总是为数字 <code>'T'</code> 或 <code>'F'</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong> expression = "T?2:3"
<strong>输出：</strong> "2"
<strong>解释：</strong> 如果条件为真，结果为 2；否则，结果为 3。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong> expression = "F?1:T?4:5"
<strong>输出：</strong> "4"
<strong>解释：</strong> 条件表达式自右向左结合。使用括号的话，相当于：
"(F ? 1 : (T ? 4 : 5))" --&gt; "(F ? 1 : 4)" --&gt; "4"
or "(F ? 1 : (T ? 4 : 5))" --&gt; "(T ? 4 : 5)" --&gt; "4"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong> expression = "T?T?F:5:3"
<strong>输出：</strong> "F"
<strong>解释：</strong> 条件表达式自右向左结合。使用括号的话，相当于：
"(T ? (T ? F : 5) : 3)" --&gt; "(T ? F : 3)" --&gt; "F"
"(T ? (T ? F : 5) : 3)" --&gt; "(T ? F : 5)" --&gt; "F"</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>5 &lt;= expression.length &lt;= 10<sup>4</sup></code></li>
<li><code>expression</code> 由数字, <code>'T'</code>, <code>'F'</code>, <code>'?'</code> 和 <code>':'</code> 组成</li>
<li><strong>保证 </strong>了表达式是一个有效的三元表达式，并且每个数字都是 <strong>一位数</strong> </li>
</ul>


## 分析

题目提示从右向左结合。故倒序遍历，用栈维护每一层即可。

## 解答

```python
def parseTernary(self, expression: str) -> str:
	stack, n = [expression[-1]], len(expression)
	for i in range(n-3, -1, -2):
		if expression[i+1] == ':':
			stack.append(expression[i])
		else:
			a = stack.pop()
			stack[-1] = a if expression[i]=='T' else stack[-1]
	return stack.pop()
```

36 ms
