# 0336：回文对（★★★）


## 题目

给定一组 互不相同 的单词， 找出所有不同 的索引对(i, j)，使得列表中的两个单词， words[i] + words[j] ，可拼接成回文串。


<!--more--> 

示例 1：

	输入：["abcd","dcba","lls","s","sssll"]
	输出：[[0,1],[1,0],[3,2],[2,4]] 
	解释：可拼接成的回文串为 ["dcbaabcd","abcddcba","slls","llssssll"]

示例 2：

	输入：["bat","tab","cat"]
	输出：[[0,1],[1,0]] 
	解释：可拼接成的回文串为 ["battab","tabbat"]


## 分析

### #1

最直接的就是遍历两个单词的组合，判断能否拼接成回文串。

```python
def palindromePairs(self, words: List[str]) -> List[List[int]]:
	res, n = [], len(words)
	for i in range(n):
		for j in range(n): 
			if i != j:
				tmp = words[i] + words[j]
				if tmp == tmp[::-1]:
					res.append([i, j])
	return res
```

时间复杂度 $O(N^2*M)$，超时了

### #2

查看超时数据，发现 N （单词个数）很大，而 M （单词长度）很小，所以考虑优化搜索范围。

观察可知，假如 s1+s2 是回文串，那么必然是以下情况之一：

	len(s1) == len(s2)，	s1==s2[::-1]
	len(s1) < len(s2), 		s2 可从中拆分为 pre、suf，pre==pre[::-1]，suf==s1[::-1]
	len(s1) > len(s2), 		s1 可从中拆分为 pre、suf，pre==s2[::-1]，suf==suf[::-1]

也就是说要么两个单词互为反序，要么较长的单词可以拆分为一个回文子串和较短单词的反序。
只要提前把每个单词的反序和对应位置存进哈希表，那么就可以很快知道单词可行的拆分方式。

因此遍历每个单词 s，判断是否有情况一的解，再遍历每种拆分方式，判断是否有后两种情况的解即可。


## 解答

```python
def palindromePairs(self, words: List[str]) -> List[List[int]]:
	res, d = [], {word[::-1]: i for i,word in enumerate(words)}
	for i, word in enumerate(words):
		if d.get(word, i) != i:
			res.append([i, d[word]])
		for j in range(len(word)+1): 
			pre, suf = word[:j], word[j:]
			if j<len(word) and suf==suf[::-1] and d.get(pre) != None:
				res.append([i, d[pre]])
			if j and pre==pre[::-1] and d.get(suf) != None:
				res.append([d[suf], i])  
	return res
```

时间复杂度 $O(N*M^2)$，344 ms

