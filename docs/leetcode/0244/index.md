# 0244：最短单词距离 II（★）


> <u>**[力扣第 244 题](https://leetcode.cn/problems/shortest-word-distance-ii/)**</u>

## 题目

<p>请设计一个类，使该类的构造函数能够接收一个字符串数组。然后再实现一个方法，该方法能够分别接收两个单词<em>，</em>并返回列表中这两个单词之间的最短距离。</p>

<p>实现 <code>WordDistanc</code> 类:</p>

<ul>
<li><code>WordDistance(String[] wordsDict)</code> 用字符串数组 <code>wordsDict</code> 初始化对象。</li>
<li><code>int shortest(String word1, String word2)</code> 返回数组 <code>worddict</code> 中 <code>word1</code> 和 <code>word2</code> 之间的最短距离。</li>
</ul>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
["WordDistance", "shortest", "shortest"]
[[["practice", "makes", "perfect", "coding", "makes"]], ["coding", "practice"], ["makes", "coding"]]
<strong>输出:</strong>
[null, 3, 1]

<b>解释：</b>
WordDistance wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
wordDistance.shortest("coding", "practice"); // 返回 3
wordDistance.shortest("makes", "coding");    // 返回 1</pre>



<p><strong>注意:</strong><meta charset="UTF-8" /></p>

<ul>
<li><code>1 &lt;= wordsDict.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= wordsDict[i].length &lt;= 10</code></li>
<li><code>wordsDict[i]</code> 由小写英文字母组成</li>
<li><code>word1</code> 和 <code>word2</code> 在数组 <code>wordsDict</code> 中</li>
<li><code>word1 != word2</code></li>
<li> <code>shortest</code> 操作次数不大于 <code>5000</code> </li>
</ul>


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
