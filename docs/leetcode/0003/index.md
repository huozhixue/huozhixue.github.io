# 0003：无重复字符的最长子串（★）


> <u>**[力扣第 3 题](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> ，请你找出其中不含有重复字符的 <strong>最长子串 </strong>的长度。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>s = "abcabcbb"
<strong>输出: </strong>3
<strong>解释:</strong> 因为无重复字符的最长子串是 <code>"abc"，所以其</code>长度为 3。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>s = "bbbbb"
<strong>输出: </strong>1
<strong>解释: </strong>因为无重复字符的最长子串是 <code>"b"</code>，所以其长度为 1。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入: </strong>s = "pwwkew"
<strong>输出: </strong>3
<strong>解释: </strong>因为无重复字符的最长子串是 <code>"wke"</code>，所以其长度为 3。
请注意，你的答案必须是 <strong>子串 </strong>的长度，<code>"pwke"</code> 是一个<em>子序列，</em>不是子串。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>s</code> 由英文字母、数字、符号和空格组成</li>
</ul>


## 分析

- 遍历每个位置 j 作为结尾，维护无重复子串
- 哈希表记录字符的上一个位置，即可维护子串的左边界

## 解答

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        res = 0
        d, i = {}, -1
        for j,c in enumerate(s):
            i = max(i,d.get(c,-1))
            res = max(res,j-i)
            d[c] = j
        return res
```
48 ms


