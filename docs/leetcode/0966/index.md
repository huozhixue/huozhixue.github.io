# 0966：元音拼写检查器（1795 分）


> <u>**[力扣第 117 场周赛第 3 题](https://leetcode.cn/problems/vowel-spellchecker/)**</u>

## 题目

<p>在给定单词列表 <code>wordlist</code> 的情况下，我们希望实现一个拼写检查器，将查询单词转换为正确的单词。</p>

<p>对于给定的查询单词 <code>query</code>，拼写检查器将会处理两类拼写错误：</p>

<ul>
<li>大小写：如果查询匹配单词列表中的某个单词（<strong>不区分大小写</strong>），则返回的正确单词与单词列表中的大小写相同。

<ul>
<li>例如：<code>wordlist = ["yellow"]</code>, <code>query = "YellOw"</code>: <code>correct = "yellow"</code></li>
<li>例如：<code>wordlist = ["Yellow"]</code>, <code>query = "yellow"</code>: <code>correct = "Yellow"</code></li>
<li>例如：<code>wordlist = ["yellow"]</code>, <code>query = "yellow"</code>: <code>correct = "yellow"</code></li>
</ul>
</li>
<li>元音错误：如果在将查询单词中的元音 <code>('a', 'e', 'i', 'o', 'u')</code>  分别替换为任何元音后，能与单词列表中的单词匹配（<strong>不区分大小写</strong>），则返回的正确单词与单词列表中的匹配项大小写相同。
<ul>
<li>例如：<code>wordlist = ["YellOw"]</code>, <code>query = "yollow"</code>: <code>correct = "YellOw"</code></li>
<li>例如：<code>wordlist = ["YellOw"]</code>, <code>query = "yeellow"</code>: <code>correct = ""</code> （无匹配项）</li>
<li>例如：<code>wordlist = ["YellOw"]</code>, <code>query = "yllw"</code>: <code>correct = ""</code> （无匹配项）</li>
</ul>
</li>
</ul>

<p>此外，拼写检查器还按照以下优先级规则操作：</p>

<ul>
<li>当查询完全匹配单词列表中的某个单词（<strong>区分大小写</strong>）时，应返回相同的单词。</li>
<li>当查询匹配到大小写问题的单词时，您应该返回单词列表中的第一个这样的匹配项。</li>
<li>当查询匹配到元音错误的单词时，您应该返回单词列表中的第一个这样的匹配项。</li>
<li>如果该查询在单词列表中没有匹配项，则应返回空字符串。</li>
</ul>

<p>给出一些查询 <code>queries</code>，返回一个单词列表 <code>answer</code>，其中 <code>answer[i]</code> 是由查询 <code>query = queries[i]</code> 得到的正确单词。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>wordlist = ["KiTe","kite","hare","Hare"], queries = ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]
<strong>输出：</strong>["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]</pre>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>wordlist = ["yellow"], queries = ["YellOw"]
<b>输出：</b>["yellow"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= wordlist.length, queries.length &lt;= 5000</code></li>
<li><code>1 &lt;= wordlist[i].length, queries[i].length &lt;= 7</code></li>
<li><code>wordlist[i]</code> 和 <code>queries[i]</code> 只包含英文字母</li>
</ul>




## 分析

依次将 "单词本身、单词小写形式、单词元音替换为'*' "分别作为 key 保存在哈希表中，查询时也依此顺序的 key 查找即可。

查询只需要返回第一个，因此哈希表每个 key 也只保存第一个即可。

## 解答


```python
def spellchecker(self, wordlist: List[str], queries: List[str]) -> List[str]:
	vis = set(wordlist)
	d = {}
	for w in wordlist:
		w2 = w.lower()
		d.setdefault(w2, w)
		w3 = ''.join('*' if c in 'aeiou' else c for c in w2)
		d.setdefault(w3, w)
	
	def find(q):
		if q in vis:
			return q
		q2 = q.lower()
		if q2 in d:
			return d[q2]
		q3 = ''.join('*' if c in 'aeiou' else c for c in q2)
		if q3 in d:
			return d[q3]
		return ''
	
	return [find(q) for q in queries]
```
84 ms
