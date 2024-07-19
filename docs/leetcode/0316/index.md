# 0316：去除重复字母（★）


> <u>**[力扣第 316 题](https://leetcode.cn/problems/remove-duplicate-letters/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 <strong>返回结果的<span data-keyword="lexicographically-smaller-string-alien">字典序</span>最小</strong>（要求不能打乱其他字符的相对位置）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong><code>s = "bcabc"</code>
<strong>输出<code>：</code></strong><code>"abc"</code>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong><code>s = "cbacdcbc"</code>
<strong>输出：</strong><code>"acdb"</code></pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>



<p><strong>注意：</strong>该题与 1081 <a href="https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters">https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters</a> 相同</p>


**相似问题：**
- [2030：含特定字母的最小子序列（2561 分）](/leetcode/2030)


## 分析

- 要字典序最小，遍历时考虑贪心
- 假如当前字符已采用过，跳过它
- 否则，假如当前字符比前一字符小，考虑删掉前一字符
	- 若前一字符在后面还有，只能保留
	- 否则，删掉前一字符，继续比较当前字符和前一字符

## 解答

```python
class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        d = {c:i for i,c in enumerate(s)}
        sk,vis = [],set()
        for i,c in enumerate(s):
            if c not in vis:
                while sk and sk[-1]>c and d[sk[-1]]>i:
                    vis.remove(sk.pop())
                sk.append(c)
                vis.add(c)
        return ''.join(sk)
```
32 ms
