# 1614：括号的最大嵌套深度（1322 分）


> <u>**[力扣第 210 场周赛第 1 题](https://leetcode.cn/problems/maximum-nesting-depth-of-the-parentheses/)**</u>

## 题目

<p>给定 <strong>有效括号字符串</strong> <code>s</code>，返回 <code>s</code> 的 <strong>嵌套深度</strong>。嵌套深度是嵌套括号的 <strong>最大</strong> 数量。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong>s = "(1+(2*3)+((<strong>8</strong>)/4))+1"</p>

<p><strong>输出：</strong>3</p>

<p><strong>解释：</strong>数字 8 在嵌套的 3 层括号中。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong>s = "(1)+((2))+(((<strong>3</strong>)))"</p>

<p><strong>输出：</strong>3</p>

<p><strong>解释：</strong>数字 3 在嵌套的 3 层括号中。</p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">s = "()(())((()()))"</span></p>

<p><strong>输出：</strong><span class="example-io">3</span></p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 100</code></li>
<li><code>s</code> 由数字 <code>0-9</code> 和字符 <code>'+'</code>、<code>'-'</code>、<code>'*'</code>、<code>'/'</code>、<code>'('</code>、<code>')'</code> 组成</li>
<li>题目数据保证括号字符串 <code>s</code> 是 <strong>有效的括号字符串</strong></li>
</ul>


**相似问题：**
- [1111：有效括号的嵌套深度（1749 分）](/leetcode/1111)


## 分析

### #1

用栈判断有效括号时，根据栈的长度即可得到每个括号所处的深度。最大的即是 s 的嵌套深度。

```python
def maxDepth(self, s: str) -> int:
    res, stack = 0, []
    for char in s:
        if char == '(':
            stack.append(char)
            res = max(res, len(stack))
        elif char == ')':
            stack.pop()
    return res
```
24 ms

### #2

注意到过程中其实只关心栈的长度。所以可以用一个变量来维护，而无需真正地进行栈操作。

## 解答

```python
def maxDepth(self, s: str) -> int:
    res, size = 0, 0
    for char in s:
        size += 1 if char == '(' else -1 if char == ')' else 0
        res = max(res, size)
    return res
```
32 ms


