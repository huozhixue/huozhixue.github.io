# 1249：移除无效的括号（1657 分）


> <u>**[力扣第 161 场周赛第 3 题](https://leetcode.cn/problems/minimum-remove-to-make-valid-parentheses/)**</u>

## 题目

<p>给你一个由 <code>'('</code>、<code>')'</code> 和小写字母组成的字符串 <code>s</code>。</p>

<p>你需要从字符串中删除最少数目的 <code>'('</code> 或者 <code>')'</code> （可以删除任意位置的括号)，使得剩下的「括号字符串」有效。</p>

<p>请返回任意一个合法字符串。</p>

<p>有效「括号字符串」应当符合以下 <strong>任意一条 </strong>要求：</p>

<ul>
<li>空字符串或只包含小写字母的字符串</li>
<li>可以被写作 <code>AB</code>（<code>A</code> 连接 <code>B</code>）的字符串，其中 <code>A</code> 和 <code>B</code> 都是有效「括号字符串」</li>
<li>可以被写作 <code>(A)</code> 的字符串，其中 <code>A</code> 是一个有效的「括号字符串」</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "lee(t(c)o)de)"
<strong>输出：</strong>"lee(t(c)o)de"
<strong>解释：</strong>"lee(t(co)de)" , "lee(t(c)ode)" 也是一个可行答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "a)b(c)d"
<strong>输出：</strong>"ab(c)d"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "))(("
<strong>输出：</strong>""
<strong>解释：</strong>空字符串也是有效的
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s[i]</code> 可能是 <code>'('</code>、<code>')'</code> 或英文小写字母</li>
</ul>


**相似问题：**
- [1963：使字符串平衡的最小交换次数（1688 分）](/leetcode/1963)
- [2116：判断一个括号字符串是否有效（2037 分）](/leetcode/2116)


## 分析

借助栈可以一趟得到不属于有效子串的括号的位置：

    遇到 '(' 入栈，遇到 ')' 弹出栈顶的 '('，若栈空则该 ')' 是无效的。
    若最后栈非空，还剩下的 '(' 也是无效的。
    无效的 '(' 必然在无效的 ')' 后面，因此无需再排序。
    
显然每次遇到无效括号时，必须执行一次删除操作（不一定是当前的括号），最后才可能变为有效。
    
那么直接将这些无效括号去掉，即是一种最少删除数的方案。

## 解答

```python
def minRemoveToMakeValid(self, s: str) -> str:
    stack, invalid = [], set()
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        elif char == ')':
            if stack:
                stack.pop()
            else:
                invalid.add(i)
    invalid |= set(stack)
    return ''.join(char for i, char in enumerate(s) if i not in invalid)
```
88 ms

