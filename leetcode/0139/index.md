# 0139：单词拆分（★）


## 题目

给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

拆分时可以重复使用字典中的单词。你可以假设字典中没有重复的单词。


<!--more--> 

示例 1：

	输入: s = "leetcode", wordDict = ["leet", "code"]
	输出: true
	解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

示例 2：

	输入: s = "applepenapple", wordDict = ["apple", "pen"]
	输出: true
	解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
	     注意你可以重复使用字典中的单词。

示例 3：

	输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
	输出: false



## 分析

### #1

先考虑递归，令辅助函数 help(i) 代表 s[i:] 是否可拆。

遍历单词 word，如果 word 是 s[i:] 的前缀，转为递归子问题 help(i+len(word))。
再考虑下边界条件即可。

```python
def wordBreak(self, s: str, wordDict: List[str]) -> bool:
	@lru_cache(None)
	def help(i):
		return i==len(s) or any(s[i:i+len(word)]==word and help(i+len(word)) for word in wordDict)
	return help(0)
```

44 ms

### #2

改写成动态规划。令 dp[i] 代表 s[:i] 是否可拆。状态转移方程为：

	if i==0:		dp[i] = True
	else:			dp[i] = any(dp[j] and s[j:i] in wordDict for j in range(i))


## 解答

```python
def wordBreak(self, s: str, wordDict: List[str]) -> bool:
	n, wordDict = len(s), set(wordDict)
	dp = [True] * (n+1)
	for i in range(1, n+1):
		dp[i] = any(dp[j] and s[j:i] in wordDict for j in range(i))
	return dp[-1]
```

52 ms

