# 0409：最长回文串（★）



第  场周赛第  题

## 题目

给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。

在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。

注意:
假设字符串的长度不会超过 1010。

<!--more--> 

示例 1:

	输入:
	"abccccdd"

	输出:
	7

	解释:
	我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。


## 分析

显然如果字符的出现次数是偶数，都能用上。如果次数是奇数，多余的那个只能作为回文串中心。

如果多个字符的出现次数都是奇数，只能选一个多余的作为回文串中心，剩下的都是真正多余的。

因此统计出现次数为奇数的字符个数 n，多余的个数即为 max(0, n-1)。

## 解答

```python
def longestPalindrome(self, s: str) -> int:
	return len(s) - max(0, sum(v % 2 for v in Counter(s).values())-1)
```

36 ms
