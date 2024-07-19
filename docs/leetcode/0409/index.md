# 0409：最长回文串


> <u>**[力扣第 409 题](https://leetcode.cn/problems/longest-palindrome/)**</u>

## 题目

<p>给定一个包含大写字母和小写字母的字符串<meta charset="UTF-8" /> <code>s</code> ，返回 <em>通过这些字母构造成的 <strong>最长的 <span data-keyword="palindrome-string">回文串</span></strong></em> 的长度。</p>

<p>在构造过程中，请注意 <strong>区分大小写</strong> 。比如 <code>"Aa"</code> 不能当做一个回文字符串。</p>



<p><strong class="example">示例 1: </strong></p>

<pre>
<strong>输入:</strong>s = "abccccdd"
<strong>输出:</strong>7
<strong>解释:</strong>
我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
</pre>

<p><strong class="example">示例 2:</strong></p>

<pre>
<strong>输入:</strong>s = "a"
<strong>输出:</strong>1
<strong>解释：</strong>可以构造的最长回文串是"a"，它的长度是 1。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 2000</code></li>
<li><code>s</code> 只由小写 <strong>和/或</strong> 大写英文字母组成</li>
</ul>


**相似问题：**
- [0266：回文排列](/leetcode/0266)
- [2131：连接两字母单词得到的最长回文串（1556 分）](/leetcode/2131)
- [2384：最大回文数字（1636 分）](/leetcode/2384)


## 分析

- 对每个字母，假如次数为偶数，都可以选
- 假如次数为奇数，额外的那个可以充当回文串的中心
- 注意回文串的中心最多加 1 个

## 解答

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        res,flag = 0,0
        for a in Counter(s).values():
            res += a//2*2
            flag |= a%2
        return res+flag
```
43 ms
