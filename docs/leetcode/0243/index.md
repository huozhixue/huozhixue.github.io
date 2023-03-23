# 0243：最短单词距离


> <u>**[力扣第 243 题](https://leetcode.cn/problems/shortest-word-distance/)**</u>

## 题目

<p>给定一个字符串数组 <code>wordDict</code> 和两个已经存在于该数组中的不同的字符串 <code>word1</code> 和 <code>word2</code> 。返回列表中这两个单词之间的最短距离。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
<strong>输出:</strong> 3
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
<strong>输出:</strong> 1</pre>



<p><strong>提示:</strong><meta charset="UTF-8" /></p>

<ul>
<li><code>1 &lt;= wordsDict.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= wordsDict[i].length &lt;= 10</code></li>
<li><code>wordsDict[i]</code> 由小写英文字母组成</li>
<li><code>word1</code> 和 <code>word2</code> 在 <code>wordsDict</code> 中</li>
<li><code>word1 != word2</code></li>
</ul>


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
