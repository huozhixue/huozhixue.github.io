# 0844：比较含退格的字符串


> <u>**[力扣第 87 场周赛第 1 题](https://leetcode.cn/problems/backspace-string-compare/)**</u>

## 题目

<p>给定 <code>s</code> 和 <code>t</code> 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 <code>true</code> 。<code>#</code> 代表退格字符。</p>

<p><strong>注意：</strong>如果对空文本输入退格字符，文本继续为空。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "ab#c", t = "ad#c"
<strong>输出：</strong>true
<strong>解释：</strong>s 和 t 都会变成 "ac"。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "ab##", t = "c#d#"
<strong>输出：</strong>true
<strong>解释：</strong>s 和 t 都会变成 ""。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "a#c", t = "b"
<strong>输出：</strong>false
<strong>解释：</strong>s 会变成 "c"，但 t 仍然是 "b"。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length, t.length &lt;= 200</code></li>
<li><code>s</code> 和 <code>t</code> 只含有小写字母以及字符 <code>'#'</code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>你可以用 <code>O(n)</code> 的时间复杂度和 <code>O(1)</code> 的空间复杂度解决该问题吗？</li>
</ul>


## 分析

### #1

最简单的就是用栈模拟，然后比较即可。

```python
def backspaceCompare(self, s: str, t: str) -> bool:
	def help(s):
		stack = []
		for char in s:
			if char != '#':
				stack.append(char)
			elif stack:
				stack.pop()
		return stack
	return help(s) == help(t)
```

52 ms

### #2

题目要求空间复杂度 O(1)。考虑用双指针反向遍历，遇到 '#' 时用 cnt 记录，并跳过相应个数的普通字符，找到下一个有效字符，再进行比较即可。

具体实现时，用辅助函数 nxt(i, s) 表示从当前的有效字符位置 i，反向遍历找到 s 中的下一个有效字符位置。那么初始令 i=len(s), j=len(t),
然后不断调用 nxt(i, s) 和 nxt(j, t) 并比较即可。


## 解答

```python
def backspaceCompare(self, s: str, t: str) -> bool:
	def nxt(i, s):
		i, cnt = i-1, 0
		while i >= 0:
			if s[i] != '#' and cnt == 0:
				break
			cnt += 1 if s[i] == '#' else -1
			i -= 1
		return i

	i, j = len(s), len(t)
	while i >= 0 and j >= 0:
		i, j = nxt(i, s), nxt(j, t)
		if not (i >= 0 and j >= 0 and s[i] == t[j] or (i == j == -1)):
			return False
	return True
```

32 ms

