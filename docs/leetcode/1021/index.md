# 1021：删除最外层的括号（1311 分）


> <u>**[力扣第 131 场周赛第 1 题](https://leetcode.cn/problems/remove-outermost-parentheses/)**</u>

## 题目

<p>有效括号字符串为空 <code>""</code>、<code>"(" + A + ")"</code> 或 <code>A + B</code> ，其中 <code>A</code> 和 <code>B</code> 都是有效的括号字符串，<code>+</code> 代表字符串的连接。</p>

<ul>
<li>例如，<code>""</code>，<code>"()"</code>，<code>"(())()"</code> 和 <code>"(()(()))"</code> 都是有效的括号字符串。</li>
</ul>

<p>如果有效字符串 <code>s</code> 非空，且不存在将其拆分为 <code>s = A + B</code> 的方法，我们称其为<strong>原语（primitive）</strong>，其中 <code>A</code> 和 <code>B</code> 都是非空有效括号字符串。</p>

<p>给出一个非空有效字符串 <code>s</code>，考虑将其进行原语化分解，使得：<code>s = P_1 + P_2 + ... + P_k</code>，其中 <code>P_i</code> 是有效括号字符串原语。</p>

<p>对 <code>s</code> 进行原语化分解，删除分解中每个原语字符串的最外层括号，返回 <code>s</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "(()())(())"
<strong>输出：</strong>"()()()"
<strong>解释：
</strong>输入字符串为 "(()())(())"，原语化分解得到 "(()())" + "(())"，
删除每个部分中的最外层括号后得到 "()()" + "()" = "()()()"。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "(()())(())(()(()))"
<strong>输出：</strong>"()()()()(())"
<strong>解释：</strong>
输入字符串为 "(()())(())(()(()))"，原语化分解得到 "(()())" + "(())" + "(()(()))"，
删除每个部分中的最外层括号后得到 "()()" + "()" + "()(())" = "()()()()(())"。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "()()"
<strong>输出：</strong>""
<strong>解释：</strong>
输入字符串为 "()()"，原语化分解得到 "()" + "()"，
删除每个部分中的最外层括号后得到 "" + "" = ""。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= s.length <= 10<sup>5</sup></code></li>
<li><code>s[i]</code> 为 <code>'('</code> 或 <code>')'</code></li>
<li><code>s</code> 是一个有效括号字符串</li>
</ul>


## 分析

### #1

用栈判断有效括号时，显然栈空时添加的 '(' 和对应的 ')' 即是原语的最外层括号，不添加到结果即可。

```python
def removeOuterParentheses(self, s: str) -> str:
    res, stack = '', []
    for char in s:
        if char == '(':
            if stack:
                res += char
            stack.append(char)
        else:
            stack.pop()
            if stack:
                res += char
    return res
```
36 ms

### #2

注意到判断时，其实只关心栈的长度。所以可以用一个变量来维护，而无需真正地进行栈操作。

## 解答

```python
def removeOuterParentheses(self, s: str) -> str:
    res, size = '', 0
    for char in s:
        res += char if size > 1 or (size == 1 and char == '(') else ''
        size += 1 if char == '(' else -1
    return res
```
56 ms
