# 0290：单词规律（★）


## 题目

给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。

这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应规律。

说明:
你可以假设 pattern 只包含小写字母， str 包含了由单个空格分隔的小写字母。  

<!--more--> 

示例1:

	输入: pattern = "abba", str = "dog cat cat dog"
	输出: true

示例 2:

	输入:pattern = "abba", str = "dog cat cat fish"
	输出: false

示例 3:

	输入: pattern = "aaaa", str = "dog cat cat dog"
	输出: false

示例 4:

	输入: pattern = "abba", str = "dog dog dog dog"
	输出: false




## 分析

非常类似 {{< lc "0205" >}}，不过注意 str 的单词数和 pattern 长度不一定相同。

## 解答

```python
def wordPattern(self, pattern: str, s: str) -> bool:
	words = s.split()
	return len(pattern)==len(words) and len(set(pattern)) == len(set(words)) == len(set(zip(pattern, words)))

```

44 ms

