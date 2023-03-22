# 0389：找不同


> <u>**[力扣第 389 题](https://leetcode.cn/problems/find-the-difference/)**</u>

## 题目

<p>给定两个字符串 <code>s</code> 和 <code>t</code> ，它们只包含小写字母。</p>

<p>字符串 <code>t</code> 由字符串 <code>s</code> 随机重排，然后在随机位置添加一个字母。</p>

<p>请找出在 <code>t</code> 中被添加的字母。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abcd", t = "abcde"
<strong>输出：</strong>"e"
<strong>解释：</strong>'e' 是那个被添加的字母。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "", t = "y"
<strong>输出：</strong>"y"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 1000</code></li>
<li><code>t.length == s.length + 1</code></li>
<li><code>s</code> 和 <code>t</code> 只包含小写字母</li>
</ul>


## 分析

简单的计数。

## 解答

```python
def findTheDifference(self, s: str, t: str) -> str:
	return (Counter(t) - Counter(s)).popitem()[0]
```
24 ms


