# 0336：回文对（★★）


> <u>**[力扣第 336 题](https://leetcode.cn/problems/palindrome-pairs/)**</u>

## 题目

<p>给定一个由唯一字符串构成的 <strong>0 索引 </strong>数组 <code>words</code> 。</p>

<p><strong>回文对</strong> 是一对整数 <code>(i, j)</code> ，满足以下条件：</p>

<ul>
<li><code>0 &lt;= i, j &lt; words.length</code>，</li>
<li><code>i != j</code> ，并且</li>
<li><code>words[i] + words[j]</code>（两个字符串的连接）是一个<span data-keyword="palindrome-string">回文串</span>。</li>
</ul>

<p>返回一个数组，它包含 <code>words</code> 中所有满足 <strong>回文对</strong> 条件的字符串。</p>

<p>你必须设计一个时间复杂度为 <code>O(sum of words[i].length)</code> 的算法。</p>



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
<li><code>1 &lt;= words.length &lt;= 5000</code></li>
<li><code>0 &lt;= words[i].length &lt;= 300</code></li>
<li><code>words[i]</code> 由小写英文字母组成</li>
</ul>


## 分析

- 单词长度较短，因此考虑直接用单词子串去搜索
- 假设 w1+w2 是回文串，分类讨论
	- w1 拆分为 a、b，b 回文，a 是 w2 的反
	- w2 拆分为 a、b，a 回文，b 是 w1 的反
- 为了方便，遍历时考虑当前单词为更长的那个即可
- 注意 w1 和 w2 长度相等，或 w1/w2 为空串的特殊情况
## 解答

```python
class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        res = []
        d = {w[::-1]:i for i,w in enumerate(words)}
        for i,w in enumerate(words):
            for j in range(1,len(w)):
                a,b = w[:j],w[j:]
                if a==a[::-1] and b in d:
                    res.append([d[b],i])
                if b==b[::-1] and a in d:
                    res.append([i,d[a]])
            if w==w[::-1]:
                if w and '' in d:
                    res.append([i,d['']])
                    res.append([d[''],i])
            elif w in d:
                res.append([i,d[w]])
        return res
```
1460 ms

## *附加

还可以用字典树解决
- 两个字典树分别保存单词和单词的反序
- 同步搜索两个字典树，假如搜到某个单词的结尾，且另一个单词的后续部分是回文，即符合
- 为了方便，可以将单词的后缀回文信息保存到字典树中

```python
class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        def add(p,i,w):
            for j,c in enumerate(w):
                if w[j:]==w[j:][::-1]:
                    p['.'] = p.get('.',[])
                    p['.'].append(i)
                p = p[c]
            p['#'] = i
        T = lambda:defaultdict(T)
        t1,t2 = T(),T()
        for i,w in enumerate(words):
            add(t1,i,w)
            add(t2,i,w[::-1])
        res = []
        sk = [(t1,t2)]
        while sk:
            p,q = sk.pop()
            if '#' in p and '#' in q and p['#']!=q['#']:
                res.append([p['#'],q['#']])
            if '#' in q and '.' in p:
                for i in p['.']:
                    if i!=q['#']:
                        res.append([i,q['#']])
            if '#' in p and '.' in q:
                for j in q['.']:
                    if j!=p['#']:
                        res.append([p['#'],j])
            for c in p:
                if c not in '.#' and c in q:
                    sk.append((p[c],q[c]))
        return res
```
3664 ms
