# 0318：最大单词长度乘积（★★）


## 题目

给定一个字符串数组 words，找到 length(word[i]) * length(word[j]) 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。


<!--more--> 

示例 1:

	输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
	输出: 16 
	解释: 这两个单词为 "abcw", "xtfn"。

示例 2:

	输入: ["a","ab","abc","d","cd","bcd","abcd"]
	输出: 4 
	解释: 这两个单词为 "ab", "cd"。

示例 3:

	输入: ["a","aa","aaa","aaaa"]
	输出: 0 
	解释: 不存在这样的两个单词。


## 分析

### #1 

先试试暴力法。

```python
def maxProduct(self, words: List[str]) -> int:
	res, n = 0, len(words)
	for i in range(n):
		for j in range(i+1, n):
			if not set(words[i])&set(words[j]):
				res = max(res, len(words[i])*len(words[j]))
	return res
```

3796 ms，勉强 AC

### #2

可以提前把 set(words[i]) 计算好节省时间。

```python
def maxProduct(self, words: List[str]) -> int:
	res, n = 0, len(words)
	Set = [set(word) for word in words]
	for i in range(n):
		for j in range(i+1, n):
			if not Set[i] & Set[j]:
				res = max(res, len(words[i])*len(words[j]))
	return res
```

852 ms

### #3

还有个巧妙地方法来表示 set(words[i])。因为只包含小写字母，所以可以用一个 26 位的二进制数来表示。

```python
def maxProduct(self, words: List[str]) -> int:
	def gen_state(word):
		res = 0
		for char in word:
			res |= 1 << ord(char)-ord('a')
		return res

	res, n = 0, len(words)
	states = [gen_state(word) for word in words]
	for i in range(n):
		for j in range(i+1, n):
			if not states[i] & states[j]:
				res = max(res, len(words[i])*len(words[j]))
	return res
```

372 ms

### #4

注意到可能有多个单词的 state 相同，所以可以只保存最长的那个。

## 解答

```python
def maxProduct(self, words: List[str]) -> int:
	def gen_state(word):
		res = 0
		for char in word:
			res |= 1 << ord(char)-ord('a')
		return res

	res, d = 0, defaultdict(int)
	for word in words:
		state = gen_state(word)
		d[state] = max(d[state], len(word))
	for st1 in d:
		for st2 in d:
			if not st1 & st2:
				res = max(res, d[st1]*d[st2])
	return res
```

172 ms
