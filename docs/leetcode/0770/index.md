# 0770：基本计算器 IV（2863 分）


> <u>**[力扣第 770 题](https://leetcode.cn/problems/basic-calculator-iv/)**</u>

## 题目

<p>给定一个表达式如 <code>expression = "e + 8 - a + 5"</code> 和一个求值映射，如 <code>{"e": 1}</code>（给定的形式为 <code>evalvars = ["e"]</code> 和 <code>evalints = [1]</code>），返回表示简化表达式的标记列表，例如 <code>["-1*a","14"]</code></p>

<ul>
<li>表达式交替使用块和符号，每个块和符号之间有一个空格。</li>
<li>块要么是括号中的表达式，要么是变量，要么是非负整数。</li>
<li>变量是一个由小写字母组成的字符串（不包括数字）。请注意，变量可以是多个字母，并注意变量从不具有像 <code>"2x"</code> 或 <code>"-x"</code> 这样的前导系数或一元运算符 。</li>
</ul>

<p>表达式按通常顺序进行求值：先是括号，然后求乘法，再计算加法和减法。</p>

<ul>
<li>例如，<code>expression = "1 + 2 * 3"</code> 的答案是 <code>["7"]</code>。</li>
</ul>

<p>输出格式如下：</p>

<ul>
<li>对于系数非零的每个自变量项，我们按字典排序的顺序将自变量写在一个项中。
<ul>
<li>例如，我们永远不会写像 <code>“b*a*c”</code> 这样的项，只写 <code>“a*b*c”</code>。</li>
</ul>
</li>
<li>项的次数等于被乘的自变量的数目，并计算重复项。我们先写出答案的最大次数项，用字典顺序打破关系，此时忽略词的前导系数。
<ul>
<li>例如，<code>"a*a*b*c"</code> 的次数为 4。</li>
</ul>
</li>
<li>项的前导系数直接放在左边，用星号将它与变量分隔开(如果存在的话)。前导系数 1 仍然要打印出来。</li>
<li>格式良好的一个示例答案是 <code>["-2*a*a*a", "3*a*a*b", "3*b*b", "4*a", "5*c", "-6"]</code> 。</li>
<li>系数为 <code>0</code> 的项（包括常数项）不包括在内。
<ul>
<li>例如，<code>“0”</code> 的表达式输出为 <code>[]</code> 。</li>
</ul>
</li>
</ul>

<p><strong>注意：</strong>你可以假设给定的表达式均有效。所有中间结果都在区间 <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code> 内。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>expression = "e + 8 - a + 5", evalvars = ["e"], evalints = [1]
<strong>输出：</strong>["-1*a","14"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>expression = "e - 8 + temperature - pressure",
evalvars = ["e", "temperature"], evalints = [1, 12]
<strong>输出：</strong>["-1*pressure","5"]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>expression = "(e + 8) * (e - 8)", evalvars = [], evalints = []
<strong>输出：</strong>["1*e*e","-64"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= expression.length &lt;= 250</code></li>
<li><code>expression</code> 由小写英文字母，数字 <code>'+'</code>, <code>'-'</code>, <code>'*'</code>, <code>'('</code>, <code>')'</code>, <code>' '</code> 组成</li>
<li><code>expression</code> 不包含任何前空格或后空格</li>
<li><code>expression</code> 中的所有符号都用一个空格隔开</li>
<li><code>0 &lt;= evalvars.length &lt;= 100</code></li>
<li><code>1 &lt;= evalvars[i].length &lt;= 20</code></li>
<li><code>evalvars[i]</code> 由小写英文字母组成</li>
<li><code>evalints.length == evalvars.length</code></li>
<li><code>-100 &lt;= evalints[i] &lt;= 100</code></li>
</ul>


**相似问题：**
- [0736：Lisp 语法解析](/leetcode/0736)
- [0772：基本计算器 III](/leetcode/0772)


## 分析

本质上是多项式的计算。为了方便，考虑用 Counter() 存储变量和系数。

为了合并同类项，考虑用变量的有序元组来作为 key。常数项直接用空的元组作为 key。
比如 5 + a * b + bb * cc 表示为 {(): 5, (a, b): 1, (bb, cc): 1}。

具体实现时，括号内是 List(Counter) 的形式，先按顺序计算乘法，再按顺序计算加减，得到一个 Counter。
然后用栈模拟递归即可。

计算完毕后，所有单项式按 (元组长度, 元组本身) 排序，转为要求的字符串格式即可。

## 解答

```python
def basicCalculatorIV(self, expression: str, evalvars: List[str], evalints: List[int]) -> List[str]:
    def mul(ct0, ct1):
        res = Counter()
        for k0, k1 in product(ct0, ct1):
            res[tuple(sorted(k0 + k1))] += ct0[k0] * ct1[k1]
        return res

    def cal(A):
        stack = []
        for item in A:
            if isinstance(item, dict) and stack and stack[-1] == '*':
                stack.pop()
                stack[-1] = mul(stack[-1], item)
            else:
                stack.append(item)
        res = Counter()
        for i in range(len(stack)):
            if isinstance(stack[i], dict):
                if i and stack[i - 1] == '-':
                    res.subtract(stack[i])
                else:
                    res.update(stack[i])
        return res

    stack, d = [[]], dict(zip(evalvars, evalints))
    for left, var, num, op, right in re.findall(r'(\()|([a-z]+)|(\d+)|([-+*])|(\))', expression):
        if left:
            stack.append([])
        elif var:
            stack[-1].append(Counter({(): d[var]} if var in d else {(var,): 1}))
        elif num:
            stack[-1].append(Counter({(): int(num)}))
        elif op:
            stack[-1].append(op)
        else:
            ct = cal(stack.pop())
            stack[-1].append(ct)
    res = sorted(cal(stack[0]).items(), key=lambda x: (-len(x[0]), x[0]))
    return ['*'.join((str(v),) + k) for k, v in res if v]
```
36 ms

## *附加

本题不含正负号，所以和 {{< lc "0227" >}} 类似，可以用更通用的方法。
遍历到某个运算符时，将前面优先级更高的先运算了。
	
```python
class Solution:
    def basicCalculatorIV(self, expression: str, evalvars: List[str], evalints: List[int]) -> List[str]:
        def mul(ct0,ct1):
            ct2 = ct0.copy()
            ct0.clear()
            for a,b in product(ct1,ct2):
                ct0[tuple(sorted(a+b))] += ct1[a]*ct2[b]

        func = {'+': Counter.update, '-': Counter.subtract, '*': mul}
        pro =  dict(zip('*+-(', '1223'))
        d = dict(zip(evalvars,evalints))
        sk, ops = [], []
        for x,op in re.findall('([0-9a-z]+)|([-+*()])',expression+'+'):
            if x.isdigit():
                sk.append(Counter({():int(x)}))
            elif x.isalpha():
                sk.append(Counter({():d[x]} if x in d else {(x,):1}))
            elif op == '(':
                ops.append(op)
            elif op == ')':
                while ops[-1] != '(':
                    func[ops.pop()](sk[-2],sk.pop())
                ops.pop()
            else:
                while ops and pro[ops[-1]] <= pro[op]:
                    func[ops.pop()](sk[-2],sk.pop())
                ops.append(op)
        res = sorted(sk[0].items(), key=lambda x: (-len(x[0]), x[0]))
        return ['*'.join((str(v),)+k) for k,v in res if v]
```
52 ms
