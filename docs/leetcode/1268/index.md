# 1268：搜索推荐系统（1573 分）


> <u>**[力扣第 164 场周赛第 3 题](https://leetcode.cn/problems/search-suggestions-system/)**</u>

## 题目

<p>给你一个产品数组 <code>products</code> 和一个字符串 <code>searchWord</code> ，<code>products</code>  数组中每个产品都是一个字符串。</p>

<p>请你设计一个推荐系统，在依次输入单词 <code>searchWord</code> 的每一个字母后，推荐 <code>products</code> 数组中前缀与 <code>searchWord</code> 相同的最多三个产品。如果前缀相同的可推荐产品超过三个，请按字典序返回最小的三个。</p>

<p>请你以二维列表的形式，返回在输入 <code>searchWord</code> 每个字母后相应的推荐产品的列表。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>products = [&quot;mobile&quot;,&quot;mouse&quot;,&quot;moneypot&quot;,&quot;monitor&quot;,&quot;mousepad&quot;], searchWord = &quot;mouse&quot;
<strong>输出：</strong>[
[&quot;mobile&quot;,&quot;moneypot&quot;,&quot;monitor&quot;],
[&quot;mobile&quot;,&quot;moneypot&quot;,&quot;monitor&quot;],
[&quot;mouse&quot;,&quot;mousepad&quot;],
[&quot;mouse&quot;,&quot;mousepad&quot;],
[&quot;mouse&quot;,&quot;mousepad&quot;]
]
<strong>解释：</strong>按字典序排序后的产品列表是 [&quot;mobile&quot;,&quot;moneypot&quot;,&quot;monitor&quot;,&quot;mouse&quot;,&quot;mousepad&quot;]
输入 m 和 mo，由于所有产品的前缀都相同，所以系统返回字典序最小的三个产品 [&quot;mobile&quot;,&quot;moneypot&quot;,&quot;monitor&quot;]
输入 mou， mous 和 mouse 后系统都返回 [&quot;mouse&quot;,&quot;mousepad&quot;]
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>products = [&quot;havana&quot;], searchWord = &quot;havana&quot;
<strong>输出：</strong>[[&quot;havana&quot;],[&quot;havana&quot;],[&quot;havana&quot;],[&quot;havana&quot;],[&quot;havana&quot;],[&quot;havana&quot;]]
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>products = [&quot;bags&quot;,&quot;baggage&quot;,&quot;banner&quot;,&quot;box&quot;,&quot;cloths&quot;], searchWord = &quot;bags&quot;
<strong>输出：</strong>[[&quot;baggage&quot;,&quot;bags&quot;,&quot;banner&quot;],[&quot;baggage&quot;,&quot;bags&quot;,&quot;banner&quot;],[&quot;baggage&quot;,&quot;bags&quot;],[&quot;bags&quot;]]
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>products = [&quot;havana&quot;], searchWord = &quot;tatiana&quot;
<strong>输出：</strong>[[],[],[],[],[],[],[]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= products.length &lt;= 1000</code></li>
<li><code>1 &lt;= &Sigma; products[i].length &lt;= 2 * 10^4</code></li>
<li><code>products[i]</code> 中所有的字符都是小写英文字母。</li>
<li><code>1 &lt;= searchWord.length &lt;= 1000</code></li>
<li><code>searchWord</code> 中所有字符都是小写英文字母。</li>
</ul>


## 分析

典型的字典树，在每个节点都保存该前缀的产品列表即可。

## 解答


```python
def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
	T = lambda: defaultdict(T)
	trie = T() 
	for w in products:
		p = trie
		for c in w:
			p = p[c]
			p['#'] = p.get('#', [])+[w]
	res, p = [], trie
	for c in searchWord:
		p = p[c]
		res.append(nsmallest(3, p.get('#', [])))
	return res
```
156 ms

## *附加

还有个巧妙的方法：
- 将 products 排序后，某个前缀的产品列表必然是连续的
- 因此，在 products 中二分查找前缀的位置 i，判断 [i,i+2] 的产品是否符合即可


```python
def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
	products.sort()
	res, q = [], ''
	for c in searchWord:
		q += c
		pos = bisect_left(products, q)
		res.append([s for s in products[pos:pos+3] if s.startswith(q)])
	return res
```
36 ms
