# 0521：最长特殊序列 Ⅰ


> <u>**[力扣第 521 题](https://leetcode.cn/problems/longest-uncommon-subsequence-i/)**</u>

## 题目

<p>给你两个字符串 <code>a</code> 和 <code>b</code>，请返回 <em>这两个字符串中 <strong>最长的特殊序列</strong> </em> 的长度。如果不存在，则返回 <code>-1</code> 。</p>

<p><strong>「最长特殊序列」</strong> 定义如下：该序列为 <strong>某字符串独有的最长<span data-keyword="subsequence-array">子序列</span>（即不能是其他字符串的子序列）</strong> 。</p>

<p>字符串 <code>s</code> 的子序列是在从 <code>s</code> 中删除任意数量的字符后可以获得的字符串。</p>

<ul>
<li>例如，<code>"abc"</code> 是 <code>"aebdc"</code> 的子序列，因为删除 <code>"a<em><strong>e</strong></em>b<strong><em>d</em></strong>c"</code> 中斜体加粗的字符可以得到 <code>"abc"</code> 。 <code>"aebdc"</code> 的子序列还包括 <code>"aebdc"</code> 、 <code>"aeb"</code> 和 <code>""</code> (空字符串)。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> a = "aba", b = "cdc"
<strong>输出:</strong> 3
<strong>解释:</strong> 最长特殊序列可为 "aba" (或 "cdc")，两者均为自身的子序列且不是对方的子序列。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>a = "aaa", b = "bbb"
<strong>输出：</strong>3
<strong>解释:</strong> 最长特殊序列是 "aaa" 和 "bbb" 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>a = "aaa", b = "aaa"
<strong>输出：</strong>-1
<strong>解释:</strong> 字符串 a 的每个子序列也是字符串 b 的每个子序列。同样，字符串 b 的每个子序列也是字符串 a 的子序列。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= a.length, b.length &lt;= 100</code></li>
<li><code>a</code> 和 <code>b</code> 由小写英文字母组成</li>
</ul>


## 分析

只要 a 和 b 不同，a 和 b 本身就是特殊的。否则，不存在特殊序列。
## 解答


```python
class Solution:
    def findLUSlength(self, a: str, b: str) -> int:
        return max(len(a),len(b)) if a!=b else -1
```
33 ms
