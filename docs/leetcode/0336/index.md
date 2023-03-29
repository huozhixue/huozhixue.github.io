# 0336：回文对（★★）


> <u>**[力扣第 336 题](https://leetcode.cn/problems/palindrome-pairs/)**</u>

## 题目

<p>给定一组<strong> 互不相同</strong> 的单词， 找出所有<strong> 不同<em> </em></strong>的索引对 <code>(i, j)</code>，使得列表中的两个单词， <code>words[i] + words[j]</code> ，可拼接成回文串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["abcd","dcba","lls","s","sssll"]
<strong>输出：</strong>[[0,1],[1,0],[3,2],[2,4]]
<strong>解释：</strong>可拼接成的回文串为 <code>["dcbaabcd","abcddcba","slls","llssssll"]</code>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["bat","tab","cat"]
<strong>输出：</strong>[[0,1],[1,0]]
<strong>解释：</strong>可拼接成的回文串为 <code>["battab","tabbat"]</code></pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>words = ["a",""]
<strong>输出：</strong>[[0,1],[1,0]]
</pre>


<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= words.length <= 5000</code></li>
<li><code>0 <= words[i].length <= 300</code></li>
<li><code>words[i]</code> 由小写英文字母组成</li>
</ul>


## 分析

单词个数范围较大，而单词长度范围较小，因此考虑优化搜索方法。

假如 w1+w2 是回文串，那么必然是以下情况之一：
- len(w1) == len(w2)，w1==w2[::-1]
- len(w1) < len(w2), w2 可拆分为 pre、suf，pre==pre[::-1]，suf==w1[::-1]
- len(w1) > len(w2), w1 可拆分为 pre、suf，pre==w2[::-1]，suf==suf[::-1]

因此，遍历单词 x 的所有拆分方式，假如能拆分为一个回文串和另一个单词 y 的反序，那么 x+y 或者 y+x 就是回文串。

> 特别注意空单词的情况，空单词+回文单词或者回文单词+空单词的组合都是可行的。

## 解答

```python
def palindromePairs(self, words: List[str]) -> List[List[int]]:
    res, d = [], {x: i for i, x in enumerate(words)}
    for i, x in enumerate(words):
        if x != x[::-1] and x[::-1] in d:
            res.append([i, d[x[::-1]]])
        if x and x==x[::-1] and '' in d:
            res.extend([[i, d['']], [d[''], i]])
        for k in range(1, len(x)):
            pre, suf = x[:k], x[k:]
            if pre[::-1] in d and suf==suf[::-1]:
                res.append([i, d[pre[::-1]]])
            if pre==pre[::-1] and suf[::-1] in d:
                res.append([d[suf[::-1]], i])
    return res
```
时间 $O(N*M^2)$，2256 ms


