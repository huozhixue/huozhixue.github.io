# 0290：单词规律


> <u>**[力扣第 290 题](https://leetcode.cn/problems/word-pattern/)**</u>

## 题目

<p>给定一种规律 <code>pattern</code> 和一个字符串 <code>s</code> ，判断 <code>s</code> 是否遵循相同的规律。</p>

<p>这里的 <strong>遵循 </strong>指完全匹配，例如， <code>pattern</code> 里的每个字母和字符串 <code>s</code><strong> </strong>中的每个非空单词之间存在着双向连接的对应规律。</p>



<p><strong class="example">示例1:</strong></p>

<pre>
<strong>输入:</strong> pattern = <code>"abba"</code>, s = <code>"dog cat cat dog"</code>
<strong>输出:</strong> true</pre>

<p><strong class="example">示例 2:</strong></p>

<pre>
<strong>输入:</strong>pattern = <code>"abba"</code>, s = <code>"dog cat cat fish"</code>
<strong>输出:</strong> false</pre>

<p><strong class="example">示例 3:</strong></p>

<pre>
<strong>输入:</strong> pattern = <code>"aaaa"</code>, s = <code>"dog cat cat dog"</code>
<strong>输出:</strong> false</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= pattern.length &lt;= 300</code></li>
<li><code>pattern</code> 只包含小写英文字母</li>
<li><code>1 &lt;= s.length &lt;= 3000</code></li>
<li><code>s</code> 只包含小写英文字母和 <code>' '</code></li>
<li><code>s</code> <strong>不包含</strong> 任何前导或尾随对空格</li>
<li><code>s</code> 中每个单词都被 <strong>单个空格 </strong>分隔</li>
</ul>


## 分析

类似 {{< lc "0205" >}}，注意先判断 s 的单词数和 pattern 长度是否相同。

## 解答

```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        A,B = pattern,s.split()
        return len(A)==len(B) and len(set(A))==len(set(B))==len(set(zip(A,B)))
```
31 ms

