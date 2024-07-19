# 0856：括号的分数（1562 分）

> <u>**[力扣第 90 场周赛第 2 题](https://leetcode.cn/problems/score-of-parentheses/)**</u>

## 题目

<p>给定一个平衡括号字符串 <code>S</code>，按下述规则计算该字符串的分数：</p>

<ul>
<li><code>()</code> 得 1 分。</li>
<li><code>AB</code> 得 <code>A + B</code> 分，其中 A 和 B 是平衡括号字符串。</li>
<li><code>(A)</code> 得 <code>2 * A</code> 分，其中 A 是平衡括号字符串。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre><strong>输入： </strong>&quot;()&quot;
<strong>输出： </strong>1
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入： </strong>&quot;(())&quot;
<strong>输出： </strong>2
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入： </strong>&quot;()()&quot;
<strong>输出： </strong>2
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入： </strong>&quot;(()(()))&quot;
<strong>输出： </strong>6
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>S</code> 是平衡括号字符串，且只含有 <code>(</code> 和 <code>)</code> 。</li>
<li><code>2 &lt;= S.length &lt;= 50</code></li>
</ol>




## 分析

显然 s 递归地等于子串的和或 2 倍。可以用栈模拟这个过程，一趟解决。

遇到 '(' 时入栈 0，代表下一层的初始分数，遇到 ')' 出栈当前层的分数添加到上一层即可。
注意按规则，若当前层是最简单的 '()'，应该为 1 分而不是 0 分。

## 解答

```python
def scoreOfParentheses(self, s: str) -> int:
    stack = [0]
    for char in s:
        if char == '(':
            stack.append(0)
        else:
            x = stack.pop()
            stack[-1] += max(2*x, 1)
    return stack[0]
```
24 ms
