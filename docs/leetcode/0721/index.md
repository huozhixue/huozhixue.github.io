# 0721：账户合并（★★）


> **第 57 场双周赛第 2 题**

## 题目

给定一个列表 accounts，每个元素 accounts[i] 是一个字符串列表，其中第一个元素 accounts[i][0] 是 名称 (name)，
其余元素是 emails 表示该账户的邮箱地址。

现在，我们想合并这些账户。如果两个账户都有一些共同的邮箱地址，则两个账户必定属于同一个人。
请注意，即使两个账户具有相同的名称，它们也可能属于不同的人，因为人们可能具有相同的名称。
一个人最初可以拥有任意数量的账户，但其所有账户都具有相同的名称。

合并账户后，按以下格式返回账户：每个账户的第一个元素是名称，其余元素是按字符 ASCII 顺序排列的邮箱地址。
账户本身可以以任意顺序返回。
 
示例 1：

	输入：
	accounts = [["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]
	输出：
	[["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],  ["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
	解释：
	第一个和第三个 John 是同一个人，因为他们有共同的邮箱地址 "johnsmith@mail.com"。 
	第二个 John 和 Mary 是不同的人，因为他们的邮箱地址没有被其他帐户使用。
	可以以任何顺序返回这些列表，例如答案 [['Mary'，'mary@mail.com']，['John'，'johnnybravo@mail.com']，
	['John'，'john00@mail.com'，'john_newyork@mail.com'，'johnsmith@mail.com']] 也是正确的。



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

