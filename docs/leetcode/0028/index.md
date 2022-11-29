# 0028：实现 strStr()（★★★）


## 题目

实现 strStr() 函数。

给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。
如果不存在，则返回  -1 。

说明：

当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。


示例 1：

    输入：haystack = "hello", needle = "ll"
    输出：2

示例 2：

    输入：haystack = "aaaaa", needle = "bba"
    输出：-1

提示：
- 0 <= haystack.length, needle.length <= 10^4
- haystack 和 needle 仅由小写英文字符组成
	
## 分析

### #1

实际应用中当然是直接调包。

```python
def strStr(self, haystack: str, needle: str) -> int:
	return haystack.find(needle)
```
40 ms

### #2

自己写，最简单的就是遍历所有 len(needle) 长度的子串，判断是否等于 needle。

## 解答

```python
def strStr(self, haystack: str, needle: str) -> int:
	m, n = len(haystack), len(needle)
	for i in range(m-n+1):
		if haystack[i:i+n] == needle:
			return i
	return -1
```

时间复杂度O(M*N), 40 ms

## *附加

本题有个经典的 [KMP 算法](http://www.matrix67.com/blog/archives/115)，
能在 O(M) 时间内完成。

```python
def strStr(self, haystack: str, needle: str) -> int:
    if not needle:
        return 0
    m, n = len(haystack), len(needle)
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
            return i - j + 1
    return -1
```
48 ms

