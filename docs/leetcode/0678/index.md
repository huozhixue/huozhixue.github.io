# 0678：有效的括号字符串（★）


> <u>**[力扣第 678 题](https://leetcode.cn/problems/valid-parenthesis-string/)**</u>

## 题目

<p>给你一个只包含三种字符的字符串，支持的字符类型分别是 <code>'('</code>、<code>')'</code> 和 <code>'*'</code>。请你检验这个字符串是否为有效字符串，如果是 <strong>有效</strong> 字符串返回 <code>true</code> 。</p>

<p><strong>有效</strong> 字符串符合如下规则：</p>

<ul>
<li>任何左括号 <code>'('</code> 必须有相应的右括号 <code>')'</code>。</li>
<li>任何右括号 <code>')'</code> 必须有相应的左括号 <code>'('</code> 。</li>
<li>左括号 <code>'('</code> 必须在对应的右括号之前 <code>')'</code>。</li>
<li><code>'*'</code> 可以被视为单个右括号 <code>')'</code> ，或单个左括号 <code>'('</code> ，或一个空字符串 <code>""</code>。</li>
</ul>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "()"
<strong>输出：</strong>true
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "(*)"
<strong>输出：</strong>true
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "(*))"
<strong>输出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 100</code></li>
<li><code>s[i]</code> 为 <code>'('</code>、<code>')'</code> 或 <code>'*'</code></li>
</ul>


**相似问题：**
- [0761：特殊的二进制序列（2292 分）](/leetcode/0761)
- [2116：判断一个括号字符串是否有效（2037 分）](/leetcode/2116)


## 分析

先不考虑星号，那么类似 {{< lc "0032" >}}，可以得到不属于有效子串的括号的位置。

再考虑星号，要使得字符串变为有效，那么无效 ')' 的左边必然有星号作为 '('，无效 '(' 的右边必然有星号作为 ')'。

因此再用一个栈维护星号的位置，遇到无效 ')' 时弹出一个星号。最终判断栈里的无效 '(' 是否都能分配一个处于右边的星号即可。
	

## 解答

```python
def checkValidString(self, s: str) -> bool:
    stack, stack2 = [], []
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        elif char == '*':
            stack2.append(i)
        elif stack:
            stack.pop()
        elif stack2:
            stack2.pop()
        else:
            return False
    while stack:
        if not stack2 or stack.pop() > stack2.pop():
            return False
    return True
```
28 ms

