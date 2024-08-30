# 面试题 01.01：判定字符是否唯一


> <u>**[力扣第 面试题 01.01 题](https://leetcode.cn/problems/is-unique-lcci/)**</u>

## 题目

<p>实现一个算法，确定一个字符串 <code>s</code> 的所有字符是否全都不同。</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> <code>s</code> = "leetcode"
<strong>输出:</strong> false
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入:</strong> <code>s</code> = "abc"
<strong>输出:</strong> true
</pre>

<p><strong>限制：</strong></p>

<ul>
<li><code>0 &lt;= len(s) &lt;= 100 </code></li>
<li><code>s[i]</code>仅包含小写字母</li>
<li>如果你不使用额外的数据结构，会很加分。</li>
</ul>




## 分析

判断去重后没变即可。

## 解答


```python
class Solution:
    def isUnique(self, astr: str) -> bool:
        return len(astr)==len(set(astr))
```
50 ms
