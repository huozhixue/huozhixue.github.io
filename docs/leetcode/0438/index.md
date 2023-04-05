# 0438：找到字符串中所有字母异位词（★）


> <u>**[力扣第 438 题](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)**</u>

## 题目

<p>给定两个字符串 <code>s</code> 和 <code>p</code>，找到 <code>s</code><strong> </strong>中所有 <code>p</code><strong> </strong>的 <strong>异位词 </strong>的子串，返回这些子串的起始索引。不考虑答案输出的顺序。</p>

<p><strong>异位词 </strong>指由相同字母重排列形成的字符串（包括相同的字符串）。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>s = "cbaebabacd", p = "abc"
<strong>输出: </strong>[0,6]
<strong>解释:</strong>
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
</pre>

<p><strong> 示例 2:</strong></p>

<pre>
<strong>输入: </strong>s = "abab", p = "ab"
<strong>输出: </strong>[0,1,2]
<strong>解释:</strong>
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= s.length, p.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>s</code> 和 <code>p</code> 仅包含小写字母</li>
</ul>


## 分析

遍历每个窗口，判断是否符合即可。

判断是否异位词可以用排序，也可以用 Counter()。字符种类只有26种，故采用 Counter() 时间更优。

## 解答

```python
def findAnagrams(self, s: str, p: str) -> List[int]:
    res, k = [], len(p)
    ct, ct0 = Counter(), Counter(p)
    for j, char in enumerate(s):
        ct[char] += 1
        if j >= k:
            ct[s[j-k]] -= 1
            if ct[s[j-k]] == 0:
                del ct[s[j-k]]
        if j >= k-1 and ct == ct0:
            res.append(j-k+1)
    return res
```
156 ms
