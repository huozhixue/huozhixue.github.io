# 0557：反转字符串中的单词 III


> <u>**[力扣第 557 题](https://leetcode.cn/problems/reverse-words-in-a-string-iii/)**</u>

## 题目

<p>给定一个字符串<meta charset="UTF-8" /> <code>s</code> ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "Let's take LeetCode contest"
<strong>输出：</strong>"s'teL ekat edoCteeL tsetnoc"
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong> s = "Mr Ding"
<strong>输出：</strong>"rM gniD"
</pre>



<p><strong><strong><strong><strong>提示：</strong></strong></strong></strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><meta charset="UTF-8" /><code>s</code> 包含可打印的 <strong>ASCII</strong> 字符。</li>
<li><meta charset="UTF-8" /><code>s</code> 不包含任何开头或结尾空格。</li>
<li><meta charset="UTF-8" /><code>s</code> 里 <strong>至少</strong> 有一个词。</li>
<li><meta charset="UTF-8" /><code>s</code> 中的所有单词都用一个空格隔开。</li>
</ul>


**相似问题：**
- [0541：反转字符串 II](/leetcode/0541)


## 分析

按空格分开得到单词列表，分别反转后再用空格拼接起来即可。


## 解答

```python
def reverseWords(self, s: str) -> str:
	return ' '.join(sub[::-1] for sub in s.split(' '))
```

32 ms

