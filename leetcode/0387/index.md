# 0387：字符串中的第一个唯一字符


第 1 场周赛第 2 题

## 题目

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

 <!--more--> 
 
示例：

	s = "leetcode"
	返回 0

	s = "loveleetcode"
	返回 2
 
## 分析

最直接的做法是记录每个字符出现的次数，然后遍历找到第一个出现一次的字符

## 解答

```python
def firstUniqChar(self, s: str) -> int:
	ct = Counter(s)
	for i, char in enumerate(s):
		if ct[char] == 1:
			return i
	return -1
```

时间复杂度 O(N)，92 ms


