# 0242：有效的字母异位词


## 题目

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

<!--more--> 

示例 1:

	输入: s = "anagram", t = "nagaram"
	输出: true
	
示例 2:

	输入: s = "rat", t = "car"
	输出: false



## 分析

可以排序后判断是否相等，也可以直接用 Counter 判断。

## 解答

```python
def isAnagram(self, s: str, t: str) -> bool:
	return Counter(s)==Counter(t)
```

48 ms
