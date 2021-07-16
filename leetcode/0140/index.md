# 0140：单词拆分 II（★★）


## 题目

给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。

拆分时可以重复使用字典中的单词。你可以假设字典中没有重复的单词。


<!--more--> 

示例 1：

	输入:
	s = "catsanddog"
	wordDict = ["cat", "cats", "and", "sand", "dog"]
	输出:
	[
	  "cats and dog",
	  "cat sand dog"
	]
	
示例 2：

	输入:
	s = "pineapplepenapple"
	wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
	输出:
	[
	  "pine apple pen apple",
	  "pineapple pen apple",
	  "pine applepen apple"
	]
	解释: 注意你可以重复使用字典中的单词。
	
示例 3：

	输入:
	s = "catsandog"
	wordDict = ["cats", "dog", "sand", "and", "cat"]
	输出:
	[]



## 分析

和 0139 类似，只是辅助函数 help(i) 的返回结果变成了 s[i:] 的所有划分。

## 解答

```python
def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
	@lru_cache(None)
	def help(i):
		if i==len(s):
			return [[]]
		res = []
		for word in wordDict:
			if s[i:i+len(word)] == word:
				res.extend([word]+sub for sub in help(i+len(word)))
		return res
	return [' '.join(sub) for sub in help(0)]
```

28 ms

