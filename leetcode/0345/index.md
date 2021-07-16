# 0345：反转字符串中的元音字母（★）


## 题目

编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

提示：

- 元音字母不包含字母 "y" 。


<!--more--> 

示例 1：

    输入："hello"
    输出："holle"

示例 2：

    输入："leetcode"
    输出："leotcede"

## 分析

类似 {{< lc "0344" >}}，只不过要跳过非元音字母。

## 解答

```python
def reverseVowels(self, s: str) -> str:
    s = list(s)
    i, j = 0, len(s) -1
    while i < j:
        if s[i].lower() not in 'aeiou':
            i += 1
        elif s[j].lower() not in 'aeiou':
            j -= 1
        else:
            s[i], s[j] = s[j], s[i]
            i += 1
            j -= 1
    return ''.join(s)
```

68 ms

