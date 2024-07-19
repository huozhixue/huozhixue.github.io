# 0541：反转字符串 II


> <u>**[力扣第 541 题](https://leetcode.cn/problems/reverse-string-ii/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> 和一个整数 <code>k</code>，从字符串开头算起，每计数至 <code>2k</code> 个字符，就反转这 <code>2k</code> 字符中的前 <code>k</code> 个字符。</p>

<ul>
<li>如果剩余字符少于 <code>k</code> 个，则将剩余字符全部反转。</li>
<li>如果剩余字符小于 <code>2k</code> 但大于或等于 <code>k</code> 个，则反转前 <code>k</code> 个字符，其余字符保持原样。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abcdefg", k = 2
<strong>输出：</strong>"bacdfeg"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abcd", k = 2
<strong>输出：</strong>"bacd"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 仅由小写英文组成</li>
<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0344：反转字符串](/leetcode/0344)
- [0557：反转字符串中的单词 III](/leetcode/0557)
- [2810：故障键盘（1192 分）](/leetcode/2810)


## 分析

按 2k 长度分段进行操作即可。

## 解答

```python
def reverseStr(self, s: str, k: int) -> str:
	return ''.join(s[i:i+k][::-1] + s[i+k:i+2*k] for i in range(0, len(s), 2*k))
```

40 ms
