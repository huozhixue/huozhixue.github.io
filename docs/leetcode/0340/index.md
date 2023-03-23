# 0340：至多包含 K 个不同字符的最长子串（★）


> <u>**[力扣第 340 题](https://leetcode.cn/problems/longest-substring-with-at-most-k-distinct-characters/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个整数 <code>k</code> ，请你找出 <strong>至多 </strong>包含<em> <code>k</code></em> 个 <strong>不同</strong> 字符的最长子串，并返回该子串的长度。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "eceba", k = 2
<strong>输出：</strong>3
<strong>解释：</strong>满足题目要求的子串是 "ece" ，长度为 3 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "aa", k = 1
<strong>输出：</strong>2
<strong>解释：</strong>满足题目要求的子串是 "aa" ，长度为 2 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= k &lt;= 50</code></li>
</ul>


## 分析

典型的滑动窗口。

## 解答

```python
def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
    res, i, d = 0, 0, defaultdict(int)
    for j, c in enumerate(s):
        d[c] += 1
        while len(d)>k:
            d[s[i]] -= 1
            if not d[s[i]]:
                del d[s[i]]
            i += 1
        res = max(res, j-i+1)
    return res
```
88 ms



