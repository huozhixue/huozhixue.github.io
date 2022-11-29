# 0020：有效的括号


## 题目

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：
- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。


示例 1:

	输入: "()"
	输出: true
	
示例 2:

	输入: "()[]{}"
	输出: true
	
示例 3:

	输入: "(]"
	输出: false
	
示例 4:

	输入: "([)]"
	输出: false
	
示例 5:

	输入: "{[]}"
	输出: true

提示：
- 1 <= s.length <= 10^4
- s 仅由括号 '()[]{}' 组成

## 分析

栈的典型应用，左括号入栈，右括号出栈栈顶。若栈顶不匹配或最终栈不空即返回 False。

## 解答

```python
def isValid(self, s: str) -> bool:
    stack, d = [], dict(zip(')]}', '([{'))
    for char in s:
        if char not in d:
            stack.append(char)
        elif not stack or stack.pop() != d[char]:
            return False
    return not stack
```
时间复杂度 O(N)，32 ms
