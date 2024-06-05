# 0720：词典中最长的单词（★）


> <u>**[力扣第 720 题](https://leetcode.cn/problems/longest-word-in-dictionary/)**</u>

## 题目

<p>给出一个字符串数组 <code>words</code> 组成的一本英语词典。返回 <code>words</code> 中最长的一个单词，该单词是由 <code>words</code> 词典中其他单词逐步添加一个字母组成。</p>

<p>若其中有多个可行的答案，则返回答案中字典序最小的单词。若无答案，则返回空字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["w","wo","wor","worl", "world"]
<strong>输出：</strong>"world"
<strong>解释：</strong> 单词"world"可由"w", "wo", "wor", 和 "worl"逐步添加一个字母组成。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
<strong>输出：</strong>"apple"
<strong>解释：</strong>"apply" 和 "apple" 都能由词典中的单词组成。但是 "apple" 的字典序小于 "apply"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 1000</code></li>
<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
<li>所有输入的字符串 <code>words[i]</code> 都只包含小写字母。</li>
</ul>


## 分析

将单词排序，单词的前缀如果存在，必然排在前面。

边遍历边将符合条件（所有前缀都在词典中）的单词存在哈希中，那么 word 符合条件等价于 word[:-1] 在哈希中。

哈希中最长且最早出现的单词即为所求。


## 解答

```python
def longestWord(self, words):
    res, vis = '', {''}
    for word in sorted(words):
        if word[:-1] in vis:
            vis.add(word)
            res = word if len(word) > len(res) else res
    return res
```
40 ms

