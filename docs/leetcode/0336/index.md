# 0336：回文对（★★★）


## 题目

给定一组 互不相同 的单词， 找出所有 不同 的索引对 (i, j)，使得列表中的两个单词， 
words[i] + words[j] ，可拼接成回文串。


示例 1：

    输入：words = ["abcd","dcba","lls","s","sssll"]
    输出：[[0,1],[1,0],[3,2],[2,4]] 
    解释：可拼接成的回文串为 ["dcbaabcd","abcddcba","slls","llssssll"]

示例 2：

    输入：words = ["bat","tab","cat"]
    输出：[[0,1],[1,0]] 
    解释：可拼接成的回文串为 ["battab","tabbat"]

示例 3：
    
    输入：words = ["a",""]
    输出：[[0,1],[1,0]]
     
提示：
- 1 <= words.length <= 5000
- 0 <= words[i].length <= 300
- words[i] 由小写英文字母组成

## 分析

单词个数范围较大，而单词长度范围较小，因此考虑优化搜索方法。

假如 w1+w2 是回文串，那么必然是以下情况之一：
- len(w1) == len(w2)，w1==w2[::-1]
- len(w1) < len(w2), w2 可拆分为 pre、suf，pre==pre[::-1]，suf==w1[::-1]
- len(w1) > len(w2), w1 可拆分为 pre、suf，pre==w2[::-1]，suf==suf[::-1]

因此，遍历单词 x 的所有拆分方式，假如能拆分为一个回文串和另一个单词 y 的反序，
那么 x+y 或者 y+x 就是回文串。

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
时间复杂度 O(N*M^2)，2256 ms


