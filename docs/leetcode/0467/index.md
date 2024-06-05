# 0467：环绕字符串中唯一的子字符串（★）


> <u>**[力扣第 467 题](https://leetcode.cn/problems/unique-substrings-in-wraparound-string/)**</u>

## 题目

<p>定义字符串 <code>base</code> 为一个 <code>"abcdefghijklmnopqrstuvwxyz"</code> 无限环绕的字符串，所以 <code>base</code> 看起来是这样的：</p>

<ul>
<li><code>"...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd...."</code>.</li>
</ul>

<p>给你一个字符串 <code>s</code> ，请你统计并返回 <code>s</code> 中有多少 <strong>不同</strong><strong>非空子串</strong> 也在 <code>base</code> 中出现。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "a"
<strong>输出：</strong>1
<strong>解释：</strong>字符串 s 的子字符串 "a" 在 base 中出现。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "cac"
<strong>输出：</strong>2
<strong>解释：</strong>字符串 s 有两个子字符串 ("a", "c") 在 base 中出现。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "zab"
<strong>输出：</strong>6
<strong>解释：</strong>字符串 s 有六个子字符串 ("z", "a", "b", "za", "ab", and "zab") 在 base 中出现。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><font color="#c7254e" face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size: 12.6px; background-color: rgb(249, 242, 244);">s</span></font> 由小写英文字母组成</li>
</ul>


## 分析

- 容易想到用 dp[i] 代表以 s[i] 结尾的符合的最长子串，即可递推
- 但这样存在重复计算的问题，比如 'cac' 中 'c' 会被计算两次
- 因此考虑针对字符值而不是下标递推
- 令 dp[c] 代表以字符 c 结尾的符合的最长子串，递推即可
## 解答

```python
def findSubstringInWraproundString(self, s: str) -> int:
	dp, cnt = defaultdict(int), 0
	for i, c in enumerate(s):
		cnt = cnt+1 if i and (ord(c)-ord(s[i-1]))%26==1 else 1
		dp[c] = max(dp[c], cnt)
	return sum(dp.values())
```
100 ms


