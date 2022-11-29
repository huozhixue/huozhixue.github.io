# 0140：单词拆分 II（★★）


## 题目

给定一个字符串 s 和一个字符串字典 wordDict ，在字符串 s 中增加空格来构建一个句子，
使得句子中所有的单词都在词典中。以任意顺序 返回所有这些可能的句子。

注意：词典中的同一个单词可能在分段中被重复使用多次。


示例 1：

	输入:s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
	输出:["cats and dog","cat sand dog"]

示例 2：

	输入:s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
	输出:["pine apple pen apple","pineapple pen apple","pine applepen apple"]
	解释: 注意你可以重复使用字典中的单词。


示例 3：

	输入:s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
	输出:[]
 

提示：
- 1 <= s.length <= 20
- 1 <= wordDict.length <= 1000
- 1 <= wordDict[i].length <= 10
- s 和 wordDict[i] 仅有小写英文字母组成
- wordDict 中所有字符串都 不同


## 分析

{{< lc "0139" >}} 升级版，改下递归的返回值即可。

## 解答

```python
def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
    @lru_cache(None)
    def dfs(s):
        if not s:
            return [[]]
        res = []
        for i in range(len(s)):
            if s[:i+1] in W:
                res.extend([s[:i+1]]+sub for sub in dfs(s[i+1:]))
        return res

    W = set(wordDict)
    return [' '.join(sub) for sub in dfs(s)]
```
32 ms

