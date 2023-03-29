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
def maxProduct(self, words: List[str]) -> int:
    A, n = [set(w) for w in words], len(words)
    return max(len(words[i])*len(words[j]) if not A[i] & A[j] else 0 for i in range(n) for j in range(i))
```
1024 ms

### #2

注意到可能有多个单词的字母集合相同，所以可以用状态压缩表示的字母集合作为 key，保存对应的最大长度。

## 解答

```python
def maxProduct(self, words: List[str]) -> int:
    d = defaultdict(int)
    for w in words:
        st = reduce(lambda x, y: x | 1 << (ord(y) - ord('a')), w, 0)
        d[st] = max(d[st], len(w))
    return max([d[a] * d[b] for a in d for b in d if not a & b], default=0)
```
284 ms
