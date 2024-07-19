# 0125：验证回文串


> <u>**[力扣第 125 题](https://leetcode.cn/problems/valid-palindrome/)**</u>

## 题目

<p>如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 <strong>回文串</strong> 。</p>

<p>字母和数字都属于字母数字字符。</p>

<p>给你一个字符串 <code>s</code>，如果它是 <strong>回文串</strong> ，返回 <code>true</code><em> </em>；否则，返回<em> </em><code>false</code><em> </em>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> s = "A man, a plan, a canal: Panama"
<strong>输出：</strong>true
<strong>解释：</strong>"amanaplanacanalpanama" 是回文串。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "race a car"
<strong>输出：</strong>false
<strong>解释：</strong>"raceacar" 不是回文串。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = " "
<strong>输出：</strong>true
<strong>解释：</strong>在移除非字母数字字符之后，s 是一个空字符串 "" 。
由于空字符串正着反着读都一样，所以是回文串。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 2 * 10<sup>5</sup></code></li>
<li><code>s</code> 仅由可打印的 ASCII 字符组成</li>
</ul>


**相似问题：**
- [0234：回文链表](/leetcode/0234)
- [0680：验证回文串 II](/leetcode/0680)
- [2002：两个回文子序列长度的最大乘积（1869 分）](/leetcode/2002)
- [2108：找出数组中的第一个回文字符串（1215 分）](/leetcode/2108)
- [2330：验证回文串 IV](/leetcode/2330)
- [3035：回文字符串的最大数量（1856 分）](/leetcode/3035)


## 分析

去除掉无关字符，判断正反序是否相同即可。

## 解答

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = [c.lower() for c in s if c.isalnum()]
        return s==s[::-1]
```
47 ms



