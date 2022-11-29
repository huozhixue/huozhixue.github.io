# 0678：有效的括号字符串（★★★）


## 题目

给定一个只包含三种字符的字符串：（ ，） 和 *，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则：
- 任何左括号 ( 必须有相应的右括号 )。
- 任何右括号 ) 必须有相应的左括号 ( 。
- 左括号 ( 必须在对应的右括号之前 )。
- * 可以被视为单个右括号 ) ，或单个左括号 ( ，或一个空字符串。
- 一个空字符串也被视为有效字符串。

示例 1:

    输入: "()"
    输出: True

示例 2:

    输入: "(*)"
    输出: True

示例 3:

    输入: "(*))"
    输出: True

注意: 字符串大小将在 [1，100] 范围内。
	 
## 分析

先不考虑星号，那么类似 {{< lc "0032" >}}，可以得到不属于有效子串的括号的位置。

再考虑星号，要使得字符串变为有效，那么无效 ')' 的左边必然有星号作为 '('，无效 '(' 的右边必然有星号作为 ')'。

因此再用一个栈维护星号的位置，遇到无效 ')' 时弹出一个星号。最终判断栈里的无效 '(' 是否都能分配一个处于右边的星号即可。
	

## 解答

```python
def checkValidString(self, s: str) -> bool:
    stack, stack2 = [], []
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        elif char == '*':
            stack2.append(i)
        elif stack:
            stack.pop()
        elif stack2:
            stack2.pop()
        else:
            return False
    while stack:
        if not stack2 or stack.pop() > stack2.pop():
            return False
    return True
```
28 ms

