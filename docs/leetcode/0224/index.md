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


**相似问题：**
- [0150：逆波兰表达式求值](/leetcode/0150)
- [0227：基本计算器 II](/leetcode/0227)
- [0241：为运算表达式设计优先级](/leetcode/0241)
- [0282：给表达式添加运算符](/leetcode/0282)
- [0772：基本计算器 III](/leetcode/0772)
- [2019：解出数学表达式的学生分数（2583 分）](/leetcode/2019)
- [2232：向表达式添加括号后的最小结果（1611 分）](/leetcode/2232)


## 分析

四则运算有个通用的方法：
- 用一个栈 sk 维护数字，一个栈 ops 维护运算符
- 遍历到某个运算符时，将前面优先级更高的运算符从 ops 弹出，先运算
	- 比如遇到 '+-' 时，可以将 ops 栈顶的 '+-*/' 先运算
- 遇到 ')' 时，一直弹出 ops 的运算符，直到栈顶为 '(' 为止 
- 注意 s 末尾添加一个加号，让所有运算符都出栈

> 注意本题的'-'可以用作一元运算，观察发现只有当 '-' 在开头或在 '(' 后面时才是一元运算，所以用 pre 保存上一个遍历元素，特判即可。

## 解答

```python
class Solution:
    def calculate(self, s: str) -> int:
        func = {'+':int.__add__,'-':int.__sub__}
        pro = dict(zip('+-(','113'))
        sk,ops = [],[]
        pre = '('
        for x,op in re.findall('(\d+)|([-+*/()])',s+'+'):
            if x:
                sk.append(int(x))
            elif op=='(':
                ops.append(op)
            elif op==')':
                while ops[-1] != '(':
                    b,a = sk.pop(),sk.pop()
                    sk.append(func[ops.pop()](a,b))
                ops.pop()
            else:
                if op=='-' and pre=='(':
                    sk.append(0)
                while ops and pro[ops[-1]]<=pro[op]:
                    b,a = sk.pop(),sk.pop()
                    sk.append(func[ops.pop()](a,b))
                ops.append(op)
            pre = x or op
        return sk.pop()
```
122 ms
