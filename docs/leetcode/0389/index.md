# 0389：找不同


> <u>**[力扣第 389 题](https://leetcode.cn/problems/find-the-difference/)**</u>

## 题目

<p>给定两个字符串 <code>s</code> 和 <code>t</code> ，它们只包含小写字母。</p>

<p>字符串 <code>t</code> 由字符串 <code>s</code> 随机重排，然后在随机位置添加一个字母。</p>

<p>请找出在 <code>t</code> 中被添加的字母。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abcd", t = "abcde"
<strong>输出：</strong>"e"
<strong>解释：</strong>'e' 是那个被添加的字母。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "", t = "y"
<strong>输出：</strong>"y"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 1000</code></li>
<li><code>t.length == s.length + 1</code></li>
<li><code>s</code> 和 <code>t</code> 只包含小写字母</li>
</ul>


**相似问题：**
- [0136：只出现一次的数字](/leetcode/0136)
- [3146：两个字符串的排列差（1152 分）](/leetcode/3146)


## 分析

Counter() 相减即可。也可以转为数字，算总和之差。

## 解答

```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        return (Counter(t)-Counter(s)).popitem()[0]
```
29 ms


