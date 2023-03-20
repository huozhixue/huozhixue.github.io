# 0243：最短单词距离


## 题目

给定一个字符串数组 wordDict 和两个已经存在于该数组中的不同的字符串 word1 和 word2 。
返回列表中这两个单词之间的最短距离。

示例 1:

	输入: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], 
	word1 = "coding", word2 = "practice"
	输出: 3

示例 2:

	输入: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], 
	word1 = "makes", word2 = "coding"
	输出: 1
 

提示:
- 1 <= wordsDict.length <= 3 * 10^4
- 1 <= wordsDict[i].length <= 10
- wordsDict[i] 由小写英文字母组成
- word1 和 word2 在 wordsDict 中
- word1 != word2


## 分析

遍历时记录上一个 word1/word2 的位置即可。

## 解答

```python
def shortestDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
    res, i1, i2 = inf, -inf, -inf
    for j, w in enumerate(wordsDict):
        if w == word1:
            res = min(res, j-i2)
            i1 = j
        elif w == word2:
            res = min(res, j-i1)
            i2 = j
    return res
```
36 ms
