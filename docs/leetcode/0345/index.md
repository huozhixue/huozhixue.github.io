# 0345：反转字符串中的元音字母（★）


## 题目

给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。

元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现。

示例 1：

    输入：s = "hello"
    输出："holle"

示例 2：

    输入：s = "leetcode"
    输出："leotcede"
	
提示：
- 1 <= s.length <= 3 * 10^5
- s 由 可打印的 ASCII 字符组成

## 分析

{{< lc "0344" >}} 升级版，指针移动时跳过非元音字母即可。

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

