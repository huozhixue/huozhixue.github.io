# 0224：基本计算器（★★★）


## 题目

给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

示例 1：

    输入：s = "1 + 1"
    输出：2

示例 2：

    输入：s = " 2-1 + 2 "
    输出：3

示例 3：
    
    输入：s = "(1+(4+5+2)-3)+(6+8)"
    输出：23

提示：
- 1 <= s.length <= 3 * 105
- s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
- s 表示一个有效的表达式
- '+' 不能用作一元运算(例如， "+1" 和 "+(2 + 3)" 无效)
- '-' 可以用作一元运算(即 "-1" 和 "-(2 + 3)" 是有效的)
- 输入中不存在两个连续的操作符
- 每个数字和运行的计算将适合于一个有符号的 32位 整数


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
