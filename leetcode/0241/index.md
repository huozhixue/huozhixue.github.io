# 0241：为运算表达式设计优先级（★）


## 题目

给定一个含有数字和运算符的字符串，为表达式添加括号，改变其运算优先级以求出不同的结果。
你需要给出所有可能的组合的结果。有效的运算符号包含 +, - 以及 * 。

<!--more--> 

示例 1:

    输入: "2-1-1"
    输出: [0, 2]
    解释: 
    ((2-1)-1) = 0 
    (2-(1-1)) = 2
    
示例 2:

    输入: "2*3-4*5"
    输出: [-34, -14, -10, -10, 10]
    解释: 
    (2*(3-(4*5))) = -34 
    ((2*3)-(4*5)) = -14 
    ((2*(3-4))*5) = -10 
    (2*((3-4)*5)) = -10 
    (((2*3)-4)*5) = 10

## 分析

显然最后一步计算必然是 x op y 的形式。考虑遍历每个运算符作为最后一步计算的 op，
那么 x、y 的可能值即是递归子问题。

最简单的字符串不含运算符，返回其代表的值即可。

## 解答

```python
def diffWaysToCompute(self, expression: str) -> List[int]:
    def help(s):
        res = []
        for i, char in enumerate(s):
            if char in func:
                res.extend(func[char](x, y) for x in help(s[:i]) for y in help(s[i+1:]))
        return res if res else [int(s)]

    func = {'+': int.__add__, '-': int.__sub__, '*': int.__mul__}
    return help(expression)
```

32 ms
