# 0527：单词缩写（★★）


> <u>**[力扣第 527 题](https://leetcode.cn/problems/word-abbreviation/)**</u>

## 题目

<p>给你一个字符串数组 <code>words</code> ，该数组由 <strong>互不相同</strong> 的若干字符串组成，请你找出并返回每个单词的 <strong>最小缩写</strong> 。</p>

<p>生成缩写的规则如下<strong>：</strong></p>

<ol>
<li>初始缩写由起始字母+省略字母的数量+结尾字母组成。</li>
<li>若存在冲突，亦即多于一个单词有同样的缩写，则使用更长的前缀代替首字母，直到从单词到缩写的映射唯一。换而言之，最终的缩写必须只能映射到一个单词。</li>
<li>若缩写并不比原单词更短，则保留原样。</li>
</ol>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> words = ["like", "god", "internal", "me", "internet", "interval", "intension", "face", "intrusion"]
<strong>输出:</strong> ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["aa","aaa"]
<strong>输出：</strong>["aa","aaa"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 400</code></li>
<li><code>2 &lt;= words[i].length &lt;= 400</code></li>
<li><code>words[i]</code> 由小写英文字母组成</li>
<li><code>words</code> 中的所有字符串 <strong>互不相同</strong></li>
</ul>


## 分析

### #1
- 先模拟得到所有单词的初始缩写，并将相同缩写的分为一组
- 对于某个单词，需要找到一组中的最长相同前缀长度 L，前 L+1 个字母保留即可保证缩写唯一

```python
def wordsAbbreviation(self, words: List[str]) -> List[str]:
	def cal(w1, w2):
		for i, (a, b) in enumerate(zip(w1, w2)):
			if a != b:
				return i
	
	d = defaultdict(list)
	for w in words:
		key = w[0]+str(len(w)-2)+w[-1] if len(w)>3 else w
		d[key].append(w)
	res = {}
	for g in d.values():
		for w in g:
			L = max(cal(w,w2) if w2!=w else 0 for w2 in g)
			res[w] = w[:L+1]+str(len(w)-L-2)+w[-1] if len(w)>L+3 else w
	return [res[w] for w in words]
```
136 ms

### #2

相同前缀越长，两个单词的字典序越接近。因此考虑将同一组的先排序，那么与相邻单词的比较即可得到 L。

## 解答

```python
def wordsAbbreviation(self, words: List[str]) -> List[str]:
	def cal(w1, w2):
		for i, (a, b) in enumerate(zip(w1, w2)):
			if a != b:
				return i
	
	d = defaultdict(list)
	for w in words:
		key = w[0]+str(len(w)-2)+w[-1] if len(w)>3 else w
		d[key].append(w)
	res = {}
	for g in d.values():
		g.sort()
		for i,w in enumerate(g):
			L = max(cal(w,g[i-1]) if i else 0, cal(w,g[i+1]) if i+1<len(g) else 0)
			res[w] = w[:L+1]+str(len(w)-L-2)+w[-1] if len(w)>L+3 else w
	return [res[w] for w in words]
```
60 ms

## *附加

还可以用 trie 树来找最长相同前缀 L。先将同组的单词都加入 trie 树，并保存前缀的个数。然后搜索单词时，找到第一个计数为 1 的前缀即可。
