# 1410：HTML 实体解析器（1405 分）


> <u>**[力扣第 184 场周赛第 3 题](https://leetcode.cn/problems/html-entity-parser/)**</u>

## 题目

<p>「HTML 实体解析器」 是一种特殊的解析器，它将 HTML 代码作为输入，并用字符本身替换掉所有这些特殊的字符实体。</p>

<p>HTML 里这些特殊字符和它们对应的字符实体包括：</p>

<ul>
<li><strong>双引号：</strong>字符实体为 <code>&amp;quot;</code> ，对应的字符是 <code>&quot;</code> 。</li>
<li><strong>单引号：</strong>字符实体为 <code>&amp;apos;</code> ，对应的字符是 <code>&#39;</code> 。</li>
<li><strong>与符号：</strong>字符实体为 <code>&amp;amp;</code> ，对应对的字符是 <code>&amp;</code> 。</li>
<li><strong>大于号：</strong>字符实体为 <code>&amp;gt;</code> ，对应的字符是 <code>&gt;</code> 。</li>
<li><strong>小于号：</strong>字符实体为 <code>&amp;lt;</code> ，对应的字符是 <code>&lt;</code> 。</li>
<li><strong>斜线号：</strong>字符实体为 <code>&amp;frasl;</code> ，对应的字符是 <code>/</code> 。</li>
</ul>

<p>给你输入字符串 <code>text</code> ，请你实现一个 HTML 实体解析器，返回解析器解析后的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>text = &quot;&amp;amp; is an HTML entity but &amp;ambassador; is not.&quot;
<strong>输出：</strong>&quot;&amp; is an HTML entity but &amp;ambassador; is not.&quot;
<strong>解释：</strong>解析器把字符实体 &amp;amp; 用 &amp; 替换
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>text = &quot;and I quote: &amp;quot;...&amp;quot;&quot;
<strong>输出：</strong>&quot;and I quote: \&quot;...\&quot;&quot;
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>text = &quot;Stay home! Practice on Leetcode :)&quot;
<strong>输出：</strong>&quot;Stay home! Practice on Leetcode :)&quot;
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>text = &quot;x &amp;gt; y &amp;amp;&amp;amp; x &amp;lt; y is always false&quot;
<strong>输出：</strong>&quot;x &gt; y &amp;&amp; x &lt; y is always false&quot;
</pre>

<p><strong>示例 5：</strong></p>

<pre>
<strong>输入：</strong>text = &quot;leetcode.com&amp;frasl;problemset&amp;frasl;all&quot;
<strong>输出：</strong>&quot;leetcode.com/problemset/all&quot;
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= text.length &lt;= 10^5</code></li>
<li>字符串可能包含 256 个ASCII 字符中的任意字符。</li>
</ul>




## 分析

替换即可。注意最后再替换 &amp; 为 &，否则 & 可能参与到其它替换，比如 "&amp;gt;" 。


## 解答

```python
def entityParser(self, text: str) -> str:
	for x, y in zip(['&quot;', '&apos;', '&gt;', '&lt;', '&frasl;', '&amp;'], '"\'></&'):
		text = text.replace(x, y)
	return text
```

60 ms


