# 0245：最短单词距离 III（★）


> <u>**[力扣第 245 题](https://leetcode.cn/problems/shortest-word-distance-iii/)**</u>

## 题目

<p>给定一个字符串数组 <code>wordsDict</code> 和两个字符串 <code>word1</code> 和 <code>word2</code> ，返回这两个单词在列表中出现的最短距离。</p>

<p>注意：<code>word1</code> 和 <code>word2</code> 是有可能相同的，并且它们将分别表示为列表中 <strong>两个独立的单词</strong> 。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
<strong>输出：</strong>1
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "makes"
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= wordsDict.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= wordsDict[i].length &lt;= 10</code></li>
<li><code>wordsDict[i]</code> 由小写英文字母组成</li>
<li><code>word1</code> 和 <code>word2</code> 都在 <code>wordsDict</code> 中</li>
</ul>


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
