# 0245：最短单词距离 III（★）


## 题目

给定一个字符串数组 wordsDict 和两个字符串 word1 和 word2 ，返回列表中这两个单词之间的最短距离。

注意：word1 和 word2 是有可能相同的，并且它们将分别表示为列表中 两个独立的单词 。

示例 1：

	输入：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], 
	word1 = "makes", word2 = "coding"
	输出：1

示例 2：

	输入：wordsDict = ["practice", "makes", "perfect", "coding", "makes"], 
	word1 = "makes", word2 = "makes"
	输出：3
	 

提示：
- 1 <= wordsDict.length <= 10^5
- 1 <= wordsDict[i].length <= 10
- wordsDict[i] 由小写英文字母组成
- word1 和 word2 都在 wordsDict 中



## 分析

与 {{< lc "0243" >}} 的区别在于 word1 和 word2 可能相同。
在更新 res 后再统一更新 word1/word2 的位置即可。

## 解答

```python
def shortestWordDistance(self, wordsDict: List[str], word1: str, word2: str) -> int:
    res, i1, i2 = inf, -inf, -inf
    for j, w in enumerate(wordsDict):
        if w==word1:
            res = min(res, j-i2)
        elif w==word2:
            res = min(res, j-i1)
        if w==word1:
            i1 = j
        if w==word2:
            i2 = j
    return res
```
128 ms
