# 0721：账户合并（★）


> <u>**[力扣第 721 题](https://leetcode.cn/problems/accounts-merge/)**</u>

## 题目

<p>给定一个列表 <code>accounts</code>，每个元素 <code>accounts[i]</code> 是一个字符串列表，其中第一个元素 <code>accounts[i][0]</code> 是 <em>名称 (name)</em>，其余元素是 <em><strong>emails</strong> </em>表示该账户的邮箱地址。</p>

<p>现在，我们想合并这些账户。如果两个账户都有一些共同的邮箱地址，则两个账户必定属于同一个人。请注意，即使两个账户具有相同的名称，它们也可能属于不同的人，因为人们可能具有相同的名称。一个人最初可以拥有任意数量的账户，但其所有账户都具有相同的名称。</p>

<p>合并账户后，按以下格式返回账户：每个账户的第一个元素是名称，其余元素是 <strong>按字符 ASCII 顺序排列</strong> 的邮箱地址。账户本身可以以 <strong>任意顺序</strong> 返回。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>accounts = [["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]
<b>输出：</b>[["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],  ["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
<b>解释：</b>
第一个和第三个 John 是同一个人，因为他们有共同的邮箱地址 "johnsmith@mail.com"。
第二个 John 和 Mary 是不同的人，因为他们的邮箱地址没有被其他帐户使用。
可以以任何顺序返回这些列表，例如答案 [['Mary'，'mary@mail.com']，['John'，'johnnybravo@mail.com']，
['John'，'john00@mail.com'，'john_newyork@mail.com'，'johnsmith@mail.com']] 也是正确的。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
<strong>输出：</strong>[["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= accounts.length &lt;= 1000</code></li>
<li><code>2 &lt;= accounts[i].length &lt;= 10</code></li>
<li><code>1 &lt;= accounts[i][j].length &lt;= 30</code></li>
<li><code>accounts[i][0]</code> 由英文字母组成</li>
<li><code>accounts[i][j] (for j &gt; 0)</code> 是有效的邮箱地址</li>
</ul>


**相似问题：**
- [0684：冗余连接](/leetcode/0684)
- [0734：句子相似性](/leetcode/0734)
- [0737：句子相似性 II](/leetcode/0737)


## 分析

容易想到用并查集。如果账户 i 和 j 有共同邮箱，将 i 和 j 连通，最终每个连通子图即代表一个人。具体实现：

	用字典 belong[email]=i 表示邮箱 email 属于账户 i
	
	遍历到账户 i，对于含有的每个邮箱 email：
		如果已在字典 belong 中，那么将 i 和 belong[email] 连通
		如果不在字典 belong 中，那么添加  belong[email]=i

并查集连通后，连通子图中的账户有相同的祖先账号，因此可以遍历账户，将含有的邮箱都合并到祖先账号的邮箱中，最后输出所有祖先账号即可。


## 解答

```python
def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
	def find(i):
		if p[i] != i:
			p[i] = find(p[i])
		return p[i]

	def union(i, j):
		p[find(i)] = find(j)

	n = len(accounts)
	p, belong = list(range(n)), {}
	for i in range(n):
		for email in accounts[i][1:]:
			if email in belong:
				union(i, belong[email])
			else:
				belong[email] = i
	res = defaultdict(list)
	for i in range(n):
		res[find(i)].extend(accounts[i][1:])
	return [[accounts[i][0]]+sorted(set(emails)) for i, emails in res.items()]
```
92 ms

