# 1332：删除回文子序列（★）


> <u>**[力扣第 173 场周赛第 1 题](https://leetcode.cn/problems/remove-palindromic-subsequences/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，它仅由字母 <code>'a'</code> 和 <code>'b'</code> 组成。每一次删除操作都可以从 <code>s</code> 中删除一个回文 <strong>子序列</strong>。</p>

<p>返回删除给定字符串中所有字符（字符串为空）的最小删除次数。</p>

<p>「子序列」定义：如果一个字符串可以通过删除原字符串某些字符而不改变原字符顺序得到，那么这个字符串就是原字符串的一个子序列。</p>

<p>「回文」定义：如果一个字符串向后和向前读是一致的，那么这个字符串就是一个回文。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "ababa"
<strong>输出：</strong>1
<strong>解释：</strong>字符串本身就是回文序列，只需要删除一次。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abb"
<strong>输出：</strong>2
<strong>解释：</strong>"<strong>a</strong>bb" -&gt; "<strong>bb</strong>" -&gt; "".
先删除回文子序列 "a"，然后再删除 "bb"。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "baabb"
<strong>输出：</strong>2
<strong>解释：</strong>"<strong>baa</strong>b<strong>b</strong>" -&gt; "b" -&gt; "".
先删除回文子序列 "baab"，然后再删除 "b"。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>s</code> 仅包含字母 <code>'a'</code>  和 <code>'b'</code></li>
</ul>


## 分析

因为 s 只含有 'a' 和 'b'，所以只要先删所有 'a'，再删所有 'b' ，最多两次就能删完。

再考虑下 s 为空和 s 只用删一次的情况即可。

## 解答

```python
def removePalindromeSub(self, s: str) -> int:
	return 0 if not s else (1 if s==s[::-1] else 2)
```

36 ms


