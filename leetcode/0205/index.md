# 0205：同构字符串（★）


## 题目

给定两个字符串 s 和 t，判断它们是否是同构的。

如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。

可以假设 s 和 t 长度相同。

<!--more--> 

示例 1:

	输入：s = "egg", t = "add"
	输出：true
	
示例 2：

	输入：s = "foo", t = "bar"
	输出：false
	
示例 3：

	输入：s = "paper", t = "title"
	输出：true


## 分析

### #1

显然可以用哈希表。因为要求一一对应，所以用两个哈希表来记录双向关系。

```python
def isIsomorphic(self, s: str, t: str) -> bool:
	d1, d2 = {}, {}
	for a, b in zip(s, t):
		if d1.get(a, b) != b or d2.get(b, a) != a:
			return False
		d1[a], d2[b] = b, a
	return True
```

44 ms

### #2

还有种更巧妙的方法。s 和 t 同构等价于条件 len(set(s))==len(set(t))==len(set(zip(s,t)))。

必要性显然成立，s 和 t 同构，s、t、zip(s,t) 的元素必然一一对应。

然后证明充分性。如果 len(set(s))==len(set(zip(s,t)))，因为 s 的不同字符必然对应 zip(s,t) 中的不同元素，
所以要使 len(set(s))==len(set(zip(s,t)))， t、zip(s,t) 的元素必然一一对应。

同理可得 s、zip(s,t) 的元素一一对应。因此 s、t 的元素一一对应，s 和 t 同构。


## 解答

```python
def isIsomorphic(self, s: str, t: str) -> bool:
	return len(set(s))==len(set(t))==len(set(zip(s,t)))
```

48 ms


