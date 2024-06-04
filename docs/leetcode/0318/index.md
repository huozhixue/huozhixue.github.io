# 0318：最大单词长度乘积（★）


> <u>**[力扣第 318 题](https://leetcode.cn/problems/maximum-product-of-word-lengths/)**</u>

## 题目

<p>给你一个字符串数组 <code>words</code> ，找出并返回 <code>length(words[i]) * length(words[j])</code> 的最大值，并且这两个单词不含有公共字母。如果不存在这样的两个单词，返回 <code>0</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = <code>["abcw","baz","foo","bar","xtfn","abcdef"]</code>
<strong>输出：</strong><code>16
<strong>解释</strong></code><strong>：</strong><code>这两个单词为<strong> </strong>"abcw", "xtfn"</code>。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = <code>["a","ab","abc","d","cd","bcd","abcd"]</code>
<strong>输出：</strong><code>4
<strong>解释</strong></code><strong>：</strong>这两个单词为 <code>"ab", "cd"</code>。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>words = <code>["a","aa","aaa","aaaa"]</code>
<strong>输出：</strong><code>0
<strong>解释</strong></code><strong>：</strong><code>不存在这样的两个单词。</code>
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= words.length &lt;= 1000</code></li>
<li><code>1 &lt;= words[i].length &lt;= 1000</code></li>
<li><code>words[i]</code> 仅包含小写字母</li>
</ul>


## 分析

### #1 

先保存每个单词的字母集合，然后遍历每一对单词，判断是否有公共字母即可。

```python
class Solution:
    def maxProduct(self, words: List[str]) -> int:
        n = len(words)
        A = [sum(1<<(ord(c)-ord('a')) for c in set(w)) for w in words]
        res = 0
        for i in range(n):
            for j in range(i+1,n):
                if A[i]&A[j]==0:
                    res = max(res,len(words[i])*len(words[j]))
        return res
```
238 ms

### #2

注意到可能有多个单词的字母集合相同，可以只保留最大长度。

## 解答

```python
class Solution:
    def maxProduct(self, words: List[str]) -> int:
        d = defaultdict(int)
        for w in words:
            st = sum(1<<(ord(c)-ord('a')) for c in set(w))
            d[st] = max(d[st], len(w))
        return max([d[a]*d[b] for a in d for b in d if not a&b], default=0)
```
103 ms
