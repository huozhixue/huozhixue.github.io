# 0125：验证回文串


## 题目

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。


示例 1:

	输入: "A man, a plan, a canal: Panama"
	输出: true

示例 2:

	输入: "race a car"
	输出: false

提示：
- 1 <= s.length <= 2 * 10^5
- 字符串 s 由 ASCII 字符组成

## 分析

去除掉无关字符，判断正反序是否相同即可。

## 解答

```python
def isPalindrome(self, s: str) -> bool:
    ss = ''.join(char for char in s if char.isalnum()).lower()
    return ss == ss[::-1]
```
36 ms



