# 0772：基本计算器 III（★★）


> <u>**[力扣第 772 题](https://leetcode.cn/problems/basic-calculator-iii/)**</u>

## 题目

<p>实现一个基本的计算器来计算简单的表达式字符串。</p>

<p>表达式字符串只包含非负整数，算符 <code>+</code>、<code>-</code>、<code>*</code>、<code>/</code> ，左括号 <code>(</code> 和右括号 <code>)</code> 。整数除法需要 <strong>向下截断</strong> 。</p>

<p>你可以假定给定的表达式总是有效的。所有的中间结果的范围均满足 <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code> 。</p>

<p><strong>注意：</strong>你不能使用任何将字符串作为表达式求值的内置函数，比如 <code>eval()</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "1+1"
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "6-4/2"
<strong>输出：</strong>4
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "2*(5+5*2)/3+(6/2+8)"
<strong>输出：</strong>21
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 由整数、<code>'+'</code>、<code>'-'</code>、<code>'*'</code>、<code>'/'</code>、<code>'('</code> 和 <code>')'</code> 组成</li>
<li><code>s</code> 是一个 <strong>有效的</strong> 表达式</li>
</ul>


## 分析

- {{< lc "0224" >}} 升级版，用双栈+优先级运算即可

## 解答

```python
class Solution:
    def calculate(self, s: str) -> int:
        func = {'+': int.__add__, '-': int.__sub__, '*': int.__mul__, '/': lambda x, y: int(x/y)}
        pro =  dict(zip('(+-*/', [0, 1, 1, 2, 2]))
        stack, ops = [], []
        for left, num, op, right in re.findall(r'(\()|(\d+)|([-+*/])|(\))', s + '+'):
            if left:
                ops.append(left)
            elif num:
                stack.append(int(num))
            elif op:
                while ops and pro[ops[-1]] >= pro[op]:
                    b, a = stack.pop(), stack.pop()
                    stack.append(func[ops.pop()](a, b))
                ops.append(op)
            else:
                while ops[-1] != '(':
                    b, a = stack.pop(), stack.pop()
                    stack.append(func[ops.pop()](a, b))
                ops.pop()
        return stack[0]
```

48 ms
