# 0224：基本计算器（★★）


> <u>**[力扣第 224 题](https://leetcode.cn/problems/basic-calculator/)**</u>

## 题目

<p>给你一个字符串表达式 <code>s</code> ，请你实现一个基本计算器来计算并返回它的值。</p>

<p>注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 <code>eval()</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "1 + 1"
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = " 2-1 + 2 "
<strong>输出：</strong>3
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "(1+(4+5+2)-3)+(6+8)"
<strong>输出：</strong>23
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>
<li><code>s</code> 由数字、<code>'+'</code>、<code>'-'</code>、<code>'('</code>、<code>')'</code>、和 <code>' '</code> 组成</li>
<li><code>s</code> 表示一个有效的表达式</li>
<li><font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">'+'</span></span></font></font> 不能用作一元运算(例如， <font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">"+1"</span></span></font></font> 和 <code>"+(2 + 3)"</code> 无效)</li>
<li><font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">'-'</span></span></font></font> 可以用作一元运算(即 <font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">"-1"</span></span></font></font> 和 <code>"-(2 + 3)"</code> 是有效的)</li>
<li>输入中不存在两个连续的操作符</li>
<li>每个数字和运行的计算将适合于一个有符号的 32位 整数</li>
</ul>


## 分析

### #1

python 的 eval 最多只能处理 200 层括号，因此考虑用栈模拟递归过程，
先处理括号内并转为一个值。括号内的计算就可以直接用 eval 了。

```python
def calculate(self, s: str) -> int:
    stack = ['']
    for char in s:
        if char == '(':
            stack.append('')
        elif char == ')':
            x = eval(stack.pop())
            stack[-1] += str(x)
        elif char:
            stack[-1] += char
    return eval(stack[0])
```
100 ms

### #2

也可以自己实现 eval。
本题只有加减号，看作是带正负号的数之和即可。

> 注意当括号内结果为负数，且括号前为负号时，会出现 '- -' 的情况，提前替换为 '+' 即可。

## 解答

```python
def calculate(self, s: str) -> int:
    def cal(ss):
        return sum(map(int, re.findall('[-+]?\d+', ss.replace('--', '+'))))

    stack = ['']
    for char in s:
        if char == '(':
            stack.append('')
        elif char == ')':
            x = cal(stack.pop())
            stack[-1] += str(x)
        elif char != ' ':
            stack[-1] += char
    return cal(stack[0])
```
84 ms
