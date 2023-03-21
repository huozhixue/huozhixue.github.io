# 1190：反转每对括号间的子串（★）


> <u>**[力扣第 154 场周赛第 2 题](https://leetcode.cn/problems/reverse-substrings-between-each-pair-of-parentheses/)**</u>

## 题目

<p>给出一个字符串 <code>s</code>（仅含有小写英文字母和括号）。</p>

<p>请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。</p>

<p>注意，您的结果中 <strong>不应</strong> 包含任何括号。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "(abcd)"
<strong>输出：</strong>"dcba"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "(u(love)i)"
<strong>输出：</strong>"iloveu"
<strong>解释：</strong>先反转子字符串 "love" ，然后反转整个字符串。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "(ed(et(oc))el)"
<strong>输出：</strong>"leetcode"
<strong>解释：</strong>先反转子字符串 "oc" ，接着反转 "etco" ，然后反转整个字符串。</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>s = "a(bcdefghijkl(mno)p)q"
<strong>输出：</strong>"apmnolkjihgfedcbq"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 2000</code></li>
<li><code>s</code> 中只有小写英文字母和括号</li>
<li>题目测试用例确保所有括号都是成对出现的</li>
</ul>


## 分析

### #1

显然 s 递归地由子串反转后得到。可以用栈模拟这个过程，一趟解决。

```python
def reverseParentheses(self, s: str) -> str:
    stack = ['']
    for char in s:
        if char == '(':
            stack.append('')
        elif char == ')':
            x = stack.pop()
            stack[-1] += x[::-1]
        else:
            stack[-1] += char
    return stack[0]
```
36 ms

### #2

上面的解法每次出栈时有反转操作，最坏时间复杂度为 O(N^2)。有个巧妙的想法能优化至 O(N)。

假如知道了每对 '()' 的位置，那么就可以按最后的顺序依次访问字符。比如示例 2：

    初始 s[0]='('，对应的')'位置为 9	跳到位置 9-1，开始反向遍历
    s[8]='i'                        添加到结果中
	s[7]=')'，对应的'('位置为2         跳到位置 2+1，再次反转方向
	s[3:7]='love'                   添加到结果中
	s[7]=')'，对应的'('位置为2  		跳到位置 2-1，再次反转方向
	s[1]=='u'		                添加到结果中
	s[0]='('，对应的')'位置为 9		跳到位置 9+1，再次反转方向
	位置 10 溢出，终止

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

