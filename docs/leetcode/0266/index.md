# 0266：回文排列（★）


## 题目

给定一个字符串，判断该字符串中是否可以通过重新排列组合，形成一个回文字符串。

示例 1：

	输入: "code"
	输出: false

示例 2：

	输入: "aab"
	输出: true

示例 3：

	输入: "carerac"
	输出: true


## 分析

假如回文字符串长度是偶数，所有字符个数都应该是偶数。

假如回文字符串长度是奇数，只有一个字符个数为奇数。

因此，用计数器判断即可。

## 解答

```python
def canPermutePalindrome(self, s: str) -> bool:
    return sum(v%2 for v in Counter(s).values())<=1
```
36 ms

