# 0125：验证回文串


## 题目

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。


<!--more--> 

示例 1:

	输入: "A man, a plan, a canal: Panama"
	输出: true

示例 2:

	输入: "race a car"
	输出: false


## 分析

去除掉无关字符，判断正反序是否相同即可。

## 解答

```python
def isPalindrome(self, s: str) -> bool:
	tmp = [char for char in s.lower() if char.isalnum()]
	return tmp == tmp[::-1]
```

48 ms



