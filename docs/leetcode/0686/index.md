# 0686：重复叠加字符串匹配（★）


> <u>**[力扣第 686 题](https://leetcode.cn/problems/repeated-string-match/)**</u>

## 题目

<p>给定两个字符串 <code>a</code> 和 <code>b</code>，寻找重复叠加字符串 <code>a</code> 的最小次数，使得字符串 <code>b</code> 成为叠加后的字符串 <code>a</code> 的子串，如果不存在则返回 <code>-1</code>。</p>

<p><strong>注意：</strong>字符串 <code>&quot;abc&quot;</code> 重复叠加 0 次是 <code>&quot;&quot;</code>，重复叠加 1 次是 <code>&quot;abc&quot;</code>，重复叠加 2 次是 <code>&quot;abcabc&quot;</code>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>a = &quot;abcd&quot;, b = &quot;cdabcdab&quot;
<strong>输出：</strong>3
<strong>解释：</strong>a 重复叠加三遍后为 &quot;ab<strong>cdabcdab</strong>cd&quot;, 此时 b 是其子串。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>a = &quot;a&quot;, b = &quot;aa&quot;
<strong>输出：</strong>2
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>a = &quot;a&quot;, b = &quot;a&quot;
<strong>输出：</strong>1
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>a = &quot;abc&quot;, b = &quot;wxyz&quot;
<strong>输出：</strong>-1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= a.length &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= b.length &lt;= 10<sup>4</sup></code></li>
<li><code>a</code> 和 <code>b</code> 由小写英文字母组成</li>
</ul>


## 分析

假设 b 是叠加 a 的子串，且 b[0] 匹配 a[i]，
那么根据 i 的范围可知 a 叠加后的长度最少 len(b)，最多 len(a)-1+len(b)。

因此令 k=len(b)//len(a)，那么 a 最少叠加 k 次，最多叠加 k+2 次，逐个判断即可。

## 解答

```python
def repeatedStringMatch(self, a: str, b: str) -> int:
    m, n = len(a), len(b)
    for x in range(n//m, n//m+3):
        if b in a*x:
            return x
    return -1
```
36 ms



