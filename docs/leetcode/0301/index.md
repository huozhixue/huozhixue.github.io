# 0301：删除无效的括号（★★）


## 题目

给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。

返回所有可能的结果。答案可以按 任意顺序 返回。



示例 1：
    
    输入：s = "()())()"
    输出：["(())()","()()()"]

示例 2：
    
    输入：s = "(a)())()"
    输出：["(a())()","(a)()()"]

示例 3：
    
    输入：s = ")("
    输出：[""]
 
 提示：
- 1 <= s.length <= 25
- s 由小写英文字母以及括号 '(' 和 ')' 组成
- s 中至多含 20 个括号

## 分析

### #1

{{< lc "1249" >}} 的升级版，但要求所有最少删除数的方案。

考虑先得到最少删除数 k，然后遍历所有删除 k 个括号的子序列，判断是否有效即可。

```python
def removeInvalidParentheses(self, s: str) -> List[str]:
    def cal(s):
        ans, stack = 0, []
        for char in s:
            if char == '(':
                stack.append(char)
            elif char == ')':
                if stack:
                    stack.pop()
                else:
                    ans += 1
        return ans + len(stack)

    ss = {s}
    for _ in range(cal(s)):
        ss = {sub[:i]+sub[i+1:] for sub in ss for i in range(len(sub)) if sub[i] in '()'}
    return [sub for sub in ss if not cal(sub)]
```
124 ms

### #2

注意到计算最少删除数时，其实只关心栈的长度。所以可以用一个变量来维护，而无需真正地进行栈操作。

## 解答

```python
def removeInvalidParentheses(self, s: str) -> List[str]:
    def cal(s):
        ans, size = 0, 0
        for char in s:
            size += 1 if char == '(' else -1 if char == ')' else 0
            if size < 0:
                ans, size = ans+1, 0
        return ans + size

    ss = {s}
    for _ in range(cal(s)):
        ss = {sub[:i]+sub[i+1:] for sub in ss for i in range(len(sub)) if sub[i] in '()'}
    return [sub for sub in ss if not cal(sub)]
```
112 ms

