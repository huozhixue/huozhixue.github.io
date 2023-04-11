# 0411：最短独占单词缩写（★★★）


> <u>**[力扣第 411 题](https://leetcode.cn/problems/minimum-unique-word-abbreviation/)**</u>

## 题目

<p>通过将任意数量的 <strong>不相邻</strong> 子字符串替换为它们的长度，可以完成对字符串的 <strong>缩写</strong> 。 例如，像 <code>"substitution"</code> 这样的字符串可以缩写为（但不限于）：</p>

<ul>
<li><code>"s10n"</code> (<code>"s <strong>ubstitutio</strong> n"</code>)</li>
<li><code>"sub4u4"</code> (<code>"sub <strong>stit</strong> u <strong>tion</strong>"</code>)</li>
<li><code>"12"</code> (<code>"<strong>substitution</strong>"</code>)</li>
<li><code>"su3i1u2on"</code> (<code>"su <strong>bst</strong> i <strong>t</strong> u <strong>ti</strong> on"</code>)</li>
<li><code>"substitution"</code> (不替换子字符串)</li>
</ul>

<p>注意：<code>"s55n"</code> (<code>"s <strong>ubsti</strong> <strong>tutio</strong> n"</code>) 不是 <code>"substitution"</code> 的有效缩写形式，因为它试图替换两个相邻的子字符串。</p>

<p>缩写的 <strong>长度</strong> 是未被替换的字母数加上被替换的字符串数。例如，缩写 <code>"s10n"</code> 的长度为 <code>3</code>（<code>2</code> 个字母 + <code>1</code> 个子字符串），而 <code>"su3i1u2on"</code> 的长度为 <code>9</code>（<code>6</code> 个字母 + <code>3</code> 子字符串）。</p>

<p>给你一个目标字符串 <code>target</code> 和一个字符串数组 <code>dictionary</code> 作为字典，为<em> </em><code>target</code> 找出并返回一个 <strong>最短 </strong>长度的缩写字符串，同时这个缩写字符串 <strong>不是</strong> 字典 <code>dictionary</code> 中其他字符串的缩写形式。如果有多个有效答案，可以返回其中任意一个。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>target = "apple", dictionary = ["blade"]
<strong>输出：</strong>"a4"
<strong>解释：</strong>"apple" 的最短缩写形式为 "5" ，但这也是 "blade" 的缩写形式之一。
下一组最短缩写是 "a4" 和 "4e" ，其中 "4e" 也是 "blade" 的缩写形式之一，而 "a4" 不是。
因此，返回 "a4" 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>target = "apple", dictionary = ["blade","plain","amber"]
<strong>输出：</strong>"1p3"
<strong>解释：</strong>"5" 同时是 "apple" 和字典中所有单词的缩写形式。
"a4" 同时是 "apple" 和 "amber" 的缩写形式。
"4e" 同时是 "apple" 和 "blade" 的缩写形式。
"1p3"、"2p2" 和 "3l1" 是 "apple" 的下一组最短缩写形式。
因为它们不是字典中其他单词的缩写形式，返回其中任意一个都是正确的。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>target.length == m</code></li>
<li><code>dictionary.length == n</code></li>
<li><code>1 &lt;= m &lt;= 21</code></li>
<li><code>0 &lt;= n &lt;= 1000</code></li>
<li><code>1 &lt;= dictionary[i].length &lt;= 100</code></li>
<li>如果 <code>n &gt; 0</code> ，那么 <code>log<sub>2</sub>(n) + m &lt;= 21</code></li>
<li><code>target</code> 和 <code>dictionary[i]</code> 仅包含小写字符</li>
</ul>




## 分析

{{< lc  "0408" >}} 进阶版。
- 每一种缩写状态都可以压缩为一个数 st，二进制的 1/0 代表该位置替换/不替换
- 遍历缩写状态 st，判断该状态下 dictionary 中是否存在单词 W 和 target 的形式相同
	-  W 和 target 什么情况下的缩写形式会相同：当字符不同的位置都被替换时
	- 因此，用 diff 代表 W 和 target 不同的位置，如果 st 没有覆盖完 diff，缩写形式不同
	- 提前存储好 diff，遍历时即可快速判断

## 解答

```python
def minAbbreviation(self, target: str, dictionary: List[str]) -> str:
	def gen(st):
		ans, cnt = '', 0
		for i in range(n):
			if st & (1<<(n-1-i)):
				ans += str(cnt or '') + target[i]
				cnt = 0
			else:
				cnt += 1
		return ans + str(cnt or '')
	
	def mask(w1, w2):
		return int(''.join('1' if a==b else '0' for a, b in zip(w1, w2)), 2)

	n = len(target)
	diffs = {mask(target, w) for w in dictionary if len(w)==n}
	if not diffs:
		return str(n)
	return min([gen(st) for st in range(1<<n) if all(df|st!=df for df in diffs)], key=len)
```

时间 $O((N+M)*2^M)$，80 ms
