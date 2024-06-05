# 0028：找出字符串中第一个匹配项的下标


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


可以直接调包 find。最优解是经典的 [KMP 算法](http://www.matrix67.com/blog/archives/115)，能在线性时间内完成。

## 解答

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        def kmp(s):
            nxt, i = [-1], -1
            for c in s:
                while i>=0 and s[i]!=c:
                    i = nxt[i]
                i += 1
                nxt.append(i)
            return nxt   
        nxt = kmp(needle+'#'+haystack)
        n = len(needle)
        return -1 if n not in nxt else nxt.index(n)-2*n-1
```
48 ms

