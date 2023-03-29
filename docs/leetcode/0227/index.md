# 0227：基本计算器 II（★）


> <u>**[力扣第 227 题](https://leetcode.cn/problems/basic-calculator-ii/)**</u>

## 题目

<p>给你一个字符串表达式 <code>s</code> ，请你实现一个基本计算器来计算并返回它的值。</p>

<p>整数除法仅保留整数部分。</p>

<p>你可以假设给定的表达式总是有效的。所有中间结果将在 <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code> 的范围内。</p>

<p><strong>注意：</strong>不允许使用任何将字符串作为数学表达式计算的内置函数，比如 <code>eval()</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "3+2*2"
<strong>输出：</strong>7
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = " 3/2 "
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = " 3+5 / 2 "
<strong>输出：</strong>5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 3 * 10<sup>5</sup></code></li>
<li><code>s</code> 由整数和算符 <code>('+', '-', '*', '/')</code> 组成，中间由一些空格隔开</li>
<li><code>s</code> 表示一个 <strong>有效表达式</strong></li>
<li>表达式中的所有整数都是非负整数，且在范围 <code>[0, 2<sup>31</sup> - 1]</code> 内</li>
<li>题目数据保证答案是一个 <strong>32-bit 整数</strong></li>
</ul>


## 分析

### #1

本题不含括号和符号位，所以将 '/' 替换为 '//' 就可以直接调用 eval 了。

```python
def calculate(self, s: str) -> int:
    return eval(s.replace('/', '//'))
```
64 ms

### #2

也可以自己实现 eval，有个通用的方法：
- 用一个栈 stack 维护数字，一个栈 op 维护运算符
- 遍历到某个运算符时，将前面优先级更高的运算符从 op 弹出，先运算了
- 比如遇到 '+-' 时，可以将 op 栈顶的 '+-*/' 先运算了


> 注意最终栈 op 非空时，还需要弹出运算。
> 更方便的方法是末尾添加优先级最低的运算符，让所有运算符都出栈。

## 解答

```python
def calculate(self, s: str) -> int:
    func = {'+': int.__add__, '-': int.__sub__, '*': int.__mul__, '/': lambda x, y: x//y}
    pro = dict(zip('+-*/', [1, 1, 2, 2]))
    stack, ops = [], []
    for num, op in re.findall(r'(\d+)|([-+/*])', s+'+'):
        if num:
            stack.append(int(num))
        else:
            while ops and pro[ops[-1]] >= pro[op]:
                b, a = stack.pop(), stack.pop()
                stack.append(func[ops.pop()](a, b))
            ops.append(op)
    return stack[0]
```
100 ms
