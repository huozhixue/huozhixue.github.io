# 0205：同构字符串（★）


## 题目

给定两个字符串 s 和 t ，判断它们是否是同构的。

如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。
不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。

 

示例 1:

	输入：s = "egg", t = "add"
	输出：true

示例 2：

	输入：s = "foo", t = "bar"
	输出：false

示例 3：

	输入：s = "paper", t = "title"
	输出：true
	 

提示：
- 1 <= s.length <= 5 * 10^4
- t.length == s.length
- s 和 t 由任意有效的 ASCII 字符组成


## 分析

### #1

显然可以用哈希表。因为要求一一对应，所以用两个哈希表来记录双向关系。

```python
def isIsomorphic(self, s: str, t: str) -> bool:
    d1, d2 = {}, {}
    for a, b in zip(s, t):
        if d1.setdefault(a, b) != b or d2.setdefault(b, a) != a:
            return False
    return True
```
40 ms

### #2

还有个更巧妙的方法。
- 若 len(set(s))==len(set(zip(s,t)))，代表 s 到 t 是单射
- 若 len(set(t))==len(set(zip(s,t)))，代表 t 到 s 是单射
- 同时满足即说明是双射

## 解答

```python
def isIsomorphic(self, s: str, t: str) -> bool:
	return len(set(s))==len(set(t))==len(set(zip(s,t)))
```
32 ms


