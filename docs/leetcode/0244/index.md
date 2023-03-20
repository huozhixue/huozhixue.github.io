# 0244：最短单词距离 II（★）


## 题目

请设计一个类，使该类的构造函数能够接收一个字符串数组。然后再实现一个方法，
该方法能够分别接收两个单词，并返回列表中这两个单词之间的最短距离。

实现 WordDistanc 类:
- WordDistance(String[] wordsDict) 用字符串数组 wordsDict 初始化对象。
- int shortest(String word1, String word2) 返回数组 worddict 中 word1 和 word2 之间的最短距离。

示例 1:

	输入: 
	["WordDistance", "shortest", "shortest"]
	[[["practice", "makes", "perfect", "coding", "makes"]], ["coding", "practice"], ["makes", "coding"]]
	输出:
	[null, 3, 1]

	解释：
	WordDistance wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
	wordDistance.shortest("coding", "practice"); // 返回 3
	wordDistance.shortest("makes", "coding");    // 返回 1
 

注意:
- 1 <= wordsDict.length <= 3 * 104
- 1 <= wordsDict[i].length <= 10
- wordsDict[i] 由小写英文字母组成
- word1 和 word2 在数组 wordsDict 中
- word1 != word2
- shortest 操作次数不大于 5000 



## 分析

{{< lc "0243" >}} 升级版，需要多次查询，考虑将每个单词的位置列表预先保存下来，节省查询时间。

## 解答

```python
class WordDistance:

    def __init__(self, wordsDict: List[str]):
        self.d = defaultdict(list)
        for i, w in enumerate(wordsDict):
            self.d[w].append(i)

    def shortest(self, word1: str, word2: str) -> int:
        return min(abs(i-j) for i in self.d[word1] for j in self.d[word2])
```
68 ms
