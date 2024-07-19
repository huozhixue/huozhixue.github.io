# 0131：分割回文串（★）


> <u>**[力扣第 131 题](https://leetcode.cn/problems/palindrome-partitioning/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，请你将<em> </em><code>s</code><em> </em>分割成一些子串，使每个子串都是 <strong><span data-keyword="palindrome-string">回文串</span></strong> 。返回 <code>s</code> 所有可能的分割方案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aab"
<strong>输出：</strong>[["a","a","b"],["aa","b"]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "a"
<strong>输出：</strong>[["a"]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 16</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>


**相似问题：**
- [0132：分割回文串 II](/leetcode/0132)
- [1745：分割回文串 IV（1924 分）](/leetcode/1745)
- [2472：不重叠回文子字符串的最大数目（2013 分）](/leetcode/2472)


## 分析

按第一个回文子串的长度递归即可。

## 解答

```python
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        @cache
        def dfs(s):
            if not s:
                return [[]]
            res = []
            for i in range(1,len(s)+1):
                if s[:i]==s[:i][::-1]:
                    res.extend([s[:i]]+sub for sub in dfs(s[i:]))
            return res
        return dfs(s)
```
92 ms


