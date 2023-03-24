# 0028：找出字符串中第一个匹配项的下标（★）


> <u>**[力扣第 28 题](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)**</u>

## 题目

<p>给你两个字符串 <code>haystack</code> 和 <code>needle</code> ，请你在 <code>haystack</code> 字符串中找出 <code>needle</code> 字符串的第一个匹配项的下标（下标从 0 开始）。如果 <code>needle</code> 不是 <code>haystack</code> 的一部分，则返回  <code>-1</code><strong> </strong>。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>haystack = "sadbutsad", needle = "sad"
<strong>输出：</strong>0
<strong>解释：</strong>"sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>haystack = "leetcode", needle = "leeto"
<strong>输出：</strong>-1
<strong>解释：</strong>"leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= haystack.length, needle.length &lt;= 10<sup>4</sup></code></li>
<li><code>haystack</code> 和 <code>needle</code> 仅由小写英文字符组成</li>
</ul>


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

时间 O(M*N), 40 ms

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

