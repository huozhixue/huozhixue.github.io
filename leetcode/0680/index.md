# 0680：验证回文字符串 Ⅱ（★）


## 题目

给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。


 <!--more--> 
 
示例 1:

	输入: "aba"
	输出: True

示例 2:

	输入: "abca"
	输出: True
	解释: 你可以删除c字符。
 
## 分析

最直接的就是遍历删除每个字符的情况，判断是否回文，但太费时间。

观察可知，只需从两边遍历，删除第一对不等字符的一个即可。


## 解答

```python
def validPalindrome(self, s: str) -> bool:
	if s == s[::-1]:
		return True
	l, r = 0, len(s) - 1
	while l < r and s[l] == s[r]:
		l += 1
		r -= 1
	a, b = s[l+1:r+1], s[l:r]
	return a==a[::-1] or b==b[::-1]
```

时间复杂度 O(N)，64 ms

