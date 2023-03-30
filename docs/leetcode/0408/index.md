# 0408：有效单词缩写


> <u>**[力扣第 408 题](https://leetcode.cn/problems/valid-word-abbreviation/)**</u>

## 题目

<p>字符串可以用 <strong>缩写</strong> 进行表示，<strong>缩写</strong> 的方法是将任意数量的 <strong>不相邻</strong> 的子字符串替换为相应子串的长度。例如，字符串 <code>"substitution"</code> 可以缩写为（不止这几种方法）：</p>

<ul>
<li><code>"s10n"</code> (<code>"s <em><strong>ubstitutio</strong></em> n"</code>)</li>
<li><code>"sub4u4"</code> (<code>"sub <em><strong>stit</strong></em> u <em><strong>tion</strong></em>"</code>)</li>
<li><code>"12"</code> (<code>"<em><strong>substitution</strong></em>"</code>)</li>
<li><code>"su3i1u2on"</code> (<code>"su <em><strong>bst</strong></em> i <em><strong>t</strong></em> u <em><strong>ti</strong></em> on"</code>)</li>
<li><code>"substitution"</code> (没有替换子字符串)</li>
</ul>

<p>下列是不合法的缩写：</p>

<ul>
<li><code>"s55n"</code> (<code>"s <u>ubsti</u> <u>tutio</u> n"</code>，两处缩写相邻)</li>
<li><code>"s010n"</code> (缩写存在前导零)</li>
<li><code>"s0ubstitution"</code> (缩写是一个空字符串)</li>
</ul>

<p>给你一个字符串单词 <code>word</code> 和一个缩写 <code>abbr</code> ，判断这个缩写是否可以是给定单词的缩写。</p>

<p><strong>子字符串</strong>是字符串中连续的<strong>非空</strong>字符序列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>word = "internationalization", abbr = "i12iz4n"
<strong>输出：</strong>true
<strong>解释：</strong>单词 "internationalization" 可以缩写为 "i12iz4n" ("i <em><strong>nternational</strong></em> iz <em><strong>atio</strong></em> n") 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>word = "apple", abbr = "a2e"
<strong>输出：</strong>false
<strong>解释：</strong>单词 "apple" 无法缩写为 "a2e" 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= word.length &lt;= 20</code></li>
<li><code>word</code> 仅由小写英文字母组成</li>
<li><code>1 &lt;= abbr.length &lt;= 10</code></li>
<li><code>abbr</code> 由小写英文字母和数字组成</li>
<li><code>abbr</code> 中的所有数字均符合 32-bit 整数范围</li>
</ul>


## 分析

提取出缩写中的字母和数字，字母必须相同，数字就跳过对应位数即可。

## 解答

```python
def validWordAbbreviation(self, word: str, abbr: str) -> bool:
	j, n = 0, len(word)
	for char, num in re.findall('([a-z])|(\d+)', abbr):
		if char:
			if j >= n or char != word[j]:
				return False
			j += 1
		elif num[0]=='0':
			return False
		else:
			j += int(num)
	return j == n
```
24 ms
