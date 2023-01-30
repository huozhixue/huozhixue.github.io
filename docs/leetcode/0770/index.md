# 0770：基本计算器 IV（★★★）


> **第 68 场双周赛第 5 题**

## 题目

给定一个表达式 expression 如 expression = "e + 8 - a + 5" 和一个求值映射，
如 {"e": 1}（给定的形式为 evalvars = ["e"] 和 evalints = [1]），
返回表示简化表达式的标记列表，例如 ["-1 * a","14"]

- 表达式交替使用块和符号，每个块和符号之间有一个空格。
- 块要么是括号中的表达式，要么是变量，要么是非负整数。
- 块是括号中的表达式，变量或非负整数。
- 变量是一个由小写字母组成的字符串（不包括数字）。请注意，变量可以是多个字母，
并注意变量从不具有像 "2x" 或 "-x" 这样的前导系数或一元运算符 。

表达式按通常顺序进行求值：先是括号，然后求乘法，再计算加法和减法。
例如，expression = "1 + 2 * 3" 的答案是 ["7"]。

输出格式如下：
- 对于系数非零的每个自变量项，我们按字典排序的顺序将自变量写在一个项中。
例如，我们永远不会写像 “b * a * c” 这样的项，只写 “a * b * c”。
- 项的次数等于被乘的自变量的数目，并计算重复项。(例如，"a * a * b * c" 的次数为 4。)。
我们先写出答案的最大次数项，用字典顺序打破关系，此时忽略词的前导系数。
- 项的前导系数直接放在左边，用星号将它与变量分隔开(如果存在的话)。前导系数 1 仍然要打印出来。
- 格式良好的一个示例答案是 
["-2 * a * a * a", "3 * a * a * b", "3 * b * b", "4 * a", "5 * c", "-6"] 。
- 系数为 0 的项（包括常数项）不包括在内。例如，“0” 的表达式输出为 []。

提示：
- expression 的长度在 [1, 250] 范围内。
- evalvars, evalints 在范围 [0, 100] 内，且长度相同。

 
示例：

	输入：expression = "e + 8 - a + 5", evalvars = ["e"], evalints = [1]
	输出：["-1*a","14"]

	输入：expression = "e - 8 + temperature - pressure",
	evalvars = ["e", "temperature"], evalints = [1, 12]
	输出：["-1*pressure","5"]

	输入：expression = "(e + 8) * (e - 8)", evalvars = [], evalints = []
	输出：["1*e*e","-64"]

	输入：expression = "7 - 7", evalvars = [], evalints = []
	输出：[]

	输入：expression = "a * b * c + b * a * c * 4", evalvars = [], evalints = []
	输出：["5*a*b*c"]

	输入：expression = "((a - b) * (b - c) + (c - a)) * ((a - b) + (b - c) * (c - a))",
	evalvars = [], evalints = []
	输出：["-1*a*a*b*b","2*a*a*b*c","-1*a*a*c*c","1*a*b*b*b","-1*a*b*b*c","-1*a*b*c*c",
	"1*a*c*c*c","-1*b*b*b*c","2*b*b*c*c","-1*b*c*c*c","2*a*a*b","-2*a*a*c","-2*a*b*b",
	"2*a*c*c","1*b*b*b","-1*b*b*c","1*b*c*c","-1*c*c*c","-1*a*a","1*a*b","1*a*c","-1*b*c"]
	 

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
def basicCalculatorIV(self, expression: str, evalvars: List[str], evalints: List[int]) -> List[str]:
    def mul(ct0, ct1):
        tmp = ct0.copy()
        ct0.clear()
        for k0, k1 in product(tmp, ct1):
            ct0[tuple(sorted(k0 + k1))] += tmp[k0] * ct1[k1]

    func = {'+': Counter.update, '-': Counter.subtract, '*': mul}
    d, pro = dict(zip(evalvars, evalints)), dict(zip('(+-*', [0, 1, 1, 2]))
    stack, ops = [], []
    for left, var, num, op, right in re.findall(r'(\()|([a-z]+)|(\d+)|([-+*])|(\))', expression + '+'):
        if left:
            ops.append(left)
        elif var:
            stack.append(Counter({(): d[var]} if var in d else {(var,): 1}))
        elif num:
            stack.append(Counter({(): int(num)}))
        elif op:
            while ops and pro[ops[-1]] >= pro[op]:
                func[ops.pop()](stack[-2], stack.pop())
            ops.append(op)
        else:
            while ops[-1] != '(':
                func[ops.pop()](stack[-2], stack.pop())
            ops.pop()
    res = sorted(stack[0].items(), key=lambda x: (-len(x[0]), x[0]))
    return ['*'.join((str(v),) + k) for k, v in res if v]
```
40 ms
