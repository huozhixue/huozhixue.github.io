# 0058：最后一个单词的长度


## 题目

给你一个字符串 s，由若干单词组成，单词之间用空格隔开。返回字符串中最后一个单词的长度。如果不存在最后一个单词，请返回 0 。

单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。
 
<!--more--> 

示例 1：

	输入：s = "Hello World"
	输出：5
	
示例 2：

	输入：s = " "
	输出：0
	 

## 分析 

最直接的就是去掉末尾空格，再按空格分隔出最后一个单词。

```python
def lengthOfLastWord(self, s: str) -> int:
	return len(s.strip().split(' ')[-1])
```

36 ms

或者反序遍历，遇到空格且已有单词则返回。

## 解答

```python
def lengthOfLastWord(self, s: str) -> int:
	cnt = 0
	for i in range(len(s)-1, -1, -1):
		if s[i] != ' ':
			cnt += 1
		elif cnt:
			break
	return cnt
```

40 ms

