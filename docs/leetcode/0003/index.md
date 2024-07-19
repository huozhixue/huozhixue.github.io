# 0003：无重复字符的最长子串（★）


> <u>**[力扣第 3 题](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> ，请你找出其中不含有重复字符的 <strong>最长 <span data-keyword="substring-nonempty">子串</span></strong><strong> </strong>的长度。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>s = "abcabcbb"
<strong>输出: </strong>3
<strong>解释:</strong> 因为无重复字符的最长子串是 <code>"abc"</code>，所以其长度为 3。
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


**相似问题：**
- [0159：至多包含两个不同字符的最长子串](/leetcode/0159)
- [0340：至多包含 K 个不同字符的最长子串](/leetcode/0340)
- [0992：K 个不同整数的子数组（2210 分）](/leetcode/0992)
- [1695：删除子数组的最大得分（1528 分）](/leetcode/1695)
- [2067：等计数子串的数量](/leetcode/2067)
- [2260：必须拿起的最小连续卡牌数（1364 分）](/leetcode/2260)
- [2401：最长优雅子数组（1749 分）](/leetcode/2401)
- [2405：子字符串的最优划分（1355 分）](/leetcode/2405)
- [2799：统计完全子数组的数目（1397 分）](/leetcode/2799)
- [2982：找出出现至少三次的最长特殊子字符串 II（1772 分）](/leetcode/2982)
- [2981：找出出现至少三次的最长特殊子字符串 I（1505 分）](/leetcode/2981)


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


