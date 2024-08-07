# 1807：替换字符串中的括号内容（1481 分）


> <u>**[力扣第 234 场周赛第 3 题](https://leetcode.cn/problems/evaluate-the-bracket-pairs-of-a-string/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，它包含一些括号对，每个括号中包含一个 <strong>非空</strong> 的键。</p>

<ul>
<li>比方说，字符串 <code>"(name)is(age)yearsold"</code> 中，有 <strong>两个</strong> 括号对，分别包含键 <code>"name"</code> 和 <code>"age"</code> 。</li>
</ul>

<p>你知道许多键对应的值，这些关系由二维字符串数组 <code>knowledge</code> 表示，其中 <code>knowledge[i] = [key<sub>i</sub>, value<sub>i</sub>]</code> ，表示键 <code>key<sub>i</sub></code> 对应的值为 <code>value<sub>i</sub></code><sub> </sub>。</p>

<p>你需要替换 <strong>所有</strong> 的括号对。当你替换一个括号对，且它包含的键为 <code>key<sub>i</sub></code> 时，你需要：</p>

<ul>
<li>将 <code>key<sub>i</sub></code> 和括号用对应的值 <code>value<sub>i</sub></code> 替换。</li>
<li>如果从 <code>knowledge</code> 中无法得知某个键对应的值，你需要将 <code>key<sub>i</sub></code> 和括号用问号 <code>"?"</code> 替换（不需要引号）。</li>
</ul>

<p><code>knowledge</code> 中每个键最多只会出现一次。<code>s</code> 中不会有嵌套的括号。</p>

<p>请你返回替换 <strong>所有</strong> 括号对后的结果字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>s = "(name)is(age)yearsold", knowledge = [["name","bob"],["age","two"]]
<b>输出：</b>"bobistwoyearsold"
<strong>解释：</strong>
键 "name" 对应的值为 "bob" ，所以将 "(name)" 替换为 "bob" 。
键 "age" 对应的值为 "two" ，所以将 "(age)" 替换为 "two" 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>s = "hi(name)", knowledge = [["a","b"]]
<b>输出：</b>"hi?"
<b>解释：</b>由于不知道键 "name" 对应的值，所以用 "?" 替换 "(name)" 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>s = "(a)(a)(a)aaa", knowledge = [["a","yes"]]
<b>输出：</b>"yesyesyesaaa"
<b>解释：</b>相同的键在 s 中可能会出现多次。
键 "a" 对应的值为 "yes" ，所以将所有的 "(a)" 替换为 "yes" 。
注意，不在括号里的 "a" 不需要被替换。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= knowledge.length &lt;= 10<sup>5</sup></code></li>
<li><code>knowledge[i].length == 2</code></li>
<li><code>1 &lt;= key<sub>i</sub>.length, value<sub>i</sub>.length &lt;= 10</code></li>
<li><code>s</code> 只包含小写英文字母和圆括号 <code>'('</code> 和 <code>')'</code> 。</li>
<li><code>s</code> 中每一个左圆括号 <code>'('</code> 都有对应的右圆括号 <code>')'</code> 。</li>
<li><code>s</code> 中每对括号内的键都不会为空。</li>
<li><code>s</code> 中不会有嵌套括号对。</li>
<li><code>key<sub>i</sub></code> 和 <code>value<sub>i</sub></code> 只包含小写英文字母。</li>
<li><code>knowledge</code> 中的 <code>key<sub>i</sub></code> 不会重复。</li>
</ul>




## 分析

将每个括号里的子串替换即可，可以用栈一趟实现。

## 解答

```python
def evaluate(self, s: str, knowledge: List[List[str]]) -> str:
    stack, d = [''], {k: v for k, v in knowledge}
    for char in s:
        if char == '(':
            stack.append('')
        elif char == ')':
            k = stack.pop()
            stack[-1] += d.get(k, '?')
        else:
            stack[-1] += char
    return stack[0]
```
216 ms

