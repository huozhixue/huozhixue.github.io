# 0159：至多包含两个不同字符的最长子串（★）


> <u>**[力扣第 159 题](https://leetcode.cn/problems/longest-substring-with-at-most-two-distinct-characters/)**</u>

## 题目

给你一个字符串 <code>s</code> ，请你找出 <strong>至多 </strong>包含 <strong>两个不同字符</strong> 的最长子串，并返回该子串的长度。


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "eceba"
<strong>输出：</strong>3
<strong>解释：</strong>满足题目要求的子串是 "ece" ，长度为 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "ccaabbb"
<strong>输出：</strong>5
<strong>解释：</strong>满足题目要求的子串是 "aabbb" ，长度为 5 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 由英文字母组成</li>
</ul>


## 分析

典型的滑动窗口问题，维护至多 2 个不同字符的窗口，找最大窗口即可。

## 解答

```python
def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
    res, d, i = 0, defaultdict(int), 0
    for j, c in enumerate(s):
        d[c] += 1
        while len(d)>2:
            d[s[i]]-=1
            if d[s[i]] == 0:
                del d[s[i]]
            i += 1
        res = max(res, j-i+1)
    return res
```
352 ms


