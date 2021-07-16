# 0028：实现 strStr()（★★★）


## 题目

实现 strStr() 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

<!--more--> 

示例 1:

	输入: haystack = "hello", needle = "ll"
	输出: 2

示例 2:

	输入: haystack = "aaaaa", needle = "bba"
	输出: -1

	
## 分析

### #1

实际应用中当然是直接调包。

```python
def strStr(self, haystack: str, needle: str) -> int:
	return haystack.find(needle)
```

时间复杂度 O(N)，40 ms

### #2

自己写，最直接的做法就是遍历所有和needle等长的子串，判断是否相同。

```python
def strStr(self, haystack: str, needle: str) -> int:
	m, n = len(haystack), len(needle)
	for i in range(m-n+1):
		if haystack[i:i+n] == needle:
			return i
	return -1
```

时间复杂度O(N*M), 40 ms

### #3

本题有个经典的 KMP 算法，思想是优化比较的次数，当匹配失败时，希望利用已比较的信息，尽可能地将子串起点向右移。

详解： {{< link  "Knuth-Morris-Pratt algorithm" "https://www.inf.hs-flensburg.de/lang/algorithmen/pattern/kmpen.htm" >}} 。

## 解答

```python
def strStr(self, haystack: str, needle: str) -> int:
	if not needle: 
		return 0
	m, n = len(haystack), len(needle)
	if m < n:
		return -1
		
	nxt, j = [-1], -1
	for i in range(n):
		while j >= 0 and needle[i] != needle[j]:
			j = nxt[j]
		j += 1
		nxt.append(j)
	j = 0
	for i in range(m):
		while j >= 0 and haystack[i] != needle[j]:
			j = nxt[j]
		j += 1
		if j == n:
			return i-j+1
	return -1
```

时间复杂度O(N)，52 ms

另外，用 AC自动机的思想也可以实现 KMP：{{< link "KMP 算法详解" "https://zhuanlan.zhihu.com/p/83334559" >}} 。
这种方式可以帮助理解，但时间复杂度和字符种数相关，一般不用。

## *附加

还有一种 Sunday 算法，在实际应用中简单快速：{{< link "动画演示Sunday字符串匹配算法——比KMP算法快七倍！极易理解！" "https://www.cnblogs.com/hsluoyang/p/12939275.html" >}}。
但最坏时间复杂度 O(M*N)，比赛中一般不用。


```python
def strStr(self, haystack: str, needle: str) -> int:
	if not needle:
		return 0
	m, n = len(haystack), len(needle)
	if m < n:
		return -1
	shift_dict = {char: n-i for i,char in enumerate(needle)}
	i = 0
	while i <= m-n:
		if haystack[i:i+n] == needle:
			return i
		if i == m-n:
			return -1
		i += shift_dict.get(haystack[i+n], n+1)
	return -1
```

36 ms


