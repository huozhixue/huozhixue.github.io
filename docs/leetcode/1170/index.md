# 1170：比较字符串最小字母出现频次（1431 分）


> <u>**[力扣第 151 场周赛第 2 题](https://leetcode.cn/problems/compare-strings-by-frequency-of-the-smallest-character/)**</u>

## 题目

<p>定义一个函数 <code>f(s)</code>，统计 <code>s</code>  中<strong>（按字典序比较）最小字母的出现频次</strong> ，其中 <code>s</code> 是一个非空字符串。</p>

<p>例如，若 <code>s = "dcce"</code>，那么 <code>f(s) = 2</code>，因为字典序最小字母是 <code>"c"</code>，它出现了 2 次。</p>

<p>现在，给你两个字符串数组待查表 <code>queries</code> 和词汇表 <code>words</code> 。对于每次查询 <code>queries[i]</code> ，需统计 <code>words</code> 中满足 <code>f(queries[i])</code> < <code>f(W)</code> 的<strong> 词的数目</strong> ，<code>W</code> 表示词汇表 <code>words</code> 中的每个词。</p>

<p>请你返回一个整数数组 <code>answer</code> 作为答案，其中每个 <code>answer[i]</code> 是第 <code>i</code> 次查询的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>queries = ["cbd"], words = ["zaaaz"]
<strong>输出：</strong>[1]
<strong>解释：</strong>查询 f("cbd") = 1，而 f("zaaaz") = 3 所以 f("cbd") < f("zaaaz")。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>queries = ["bbb","cc"], words = ["a","aa","aaa","aaaa"]
<strong>输出：</strong>[1,2]
<strong>解释：</strong>第一个查询 f("bbb") < f("aaaa")，第二个查询 f("aaa") 和 f("aaaa") 都 > f("cc")。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= queries.length <= 2000</code></li>
<li><code>1 <= words.length <= 2000</code></li>
<li><code>1 <= queries[i].length, words[i].length <= 10</code></li>
<li><code>queries[i][j]</code>、<code>words[i][j]</code> 都由小写英文字母组成</li>
</ul>




## 分析

用数组 A 记录词汇表中每个 f 值对应的词个数，那么每次查询即是求 sum(A[f(queries[i])+1:])。

容易想到用前缀和。不过本题 f 值最多为 10，直接求和即可。

## 解答

```python
def numSmallerByFrequency(self, queries: List[str], words: List[str]) -> List[int]:
    A = [0] * 11
    for w in words:
        cnt = w.count(min(w))
        A[cnt] += 1
    res = []
    for q in queries:
        cnt = q.count(min(q))
        res.append(sum(A[cnt+1:]))
    return res
```
36 ms

