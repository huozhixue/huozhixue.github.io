# 0557：反转字符串中的单词 III


## 题目

给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。

 <!--more--> 
 
示例：

	输入："Let's take LeetCode contest"
	输出："s'teL ekat edoCteeL tsetnoc"

	
## 分析

按空格分开得到单词列表，分别反转后再用空格拼接起来即可。


## 解答

```python
def reverseWords(self, s: str) -> str:
	return ' '.join(sub[::-1] for sub in s.split(' '))
```

32 ms

