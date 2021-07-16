# 0316：去除重复字母（★★★）


## 题目

给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。


<!--more--> 

示例 1：

	输入：s = "bcabc"
	输出："abc"
	
示例 2：

	输入：s = "cbacdcbc"
	输出："acdb"

## 分析

### #1

要使结果字典序最小，优先减小前面的位置。比如示例 2：

	s 中最小的字母是 'a'，发现 'a' 开头能满足要求，故首位取 'a'，转为递归子问题 s0 = 'cdcbc'
	
	s0 中最小的字母是 'b'，但 'b' 开头无法满足要求，故考虑 s0 中第二小的字母 'c'，转为递归子问题 s1 = 'db'
	
	依次类推直到取到所有字母即可
	
```python
def removeDuplicateLetters(self, s: str) -> str:
	for char in sorted(set(s)):
		tmp = s[s.index(char):]
		if len(set(tmp)) == len(set(s)):
			return char + self.removeDuplicateLetters(tmp.replace(char, ''))
	return ''
```

64 ms

### #2

本题还有个巧妙的解法，在遍历中尽可能减小前面的位置。比如示例 2：

	遍历到 'a' 时，tmp 为 'bc'， tmp[-1]='c'> 'a' 且 'c' 在后面还有，所以把 'c' 移除以减小结果。
	
	'c' 移除后 tmp 为 'b'，依然有 tmp[-1]>'a' 且 tmp[-1] 在后面还有，所以可以把 'b' 也移除。
	
	依此类推遍历完即得到结果
	
## 解答

```python
def removeDuplicateLetters(self, s: str) -> str:
	tmp = ''
	for i, char in enumerate(s):
		if char not in tmp:
			while tmp and tmp[-1]>char and s.find(tmp[-1], i)!=-1:
				tmp = tmp[:-1]
			tmp += char
	return tmp
```

40 ms
