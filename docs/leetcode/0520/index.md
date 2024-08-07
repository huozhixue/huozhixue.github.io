# 0520：检测大写字母


> <u>**[力扣第 520 题](https://leetcode.cn/problems/detect-capital/)**</u>

## 题目

<p>我们定义，在以下情况时，单词的大写用法是正确的：</p>

<ul>
<li>全部字母都是大写，比如 <code>"USA"</code> 。</li>
<li>单词中所有字母都不是大写，比如 <code>"leetcode"</code> 。</li>
<li>如果单词不只含有一个字母，只有首字母大写， 比如 <code>"Google"</code> 。</li>
</ul>

<p>给你一个字符串 <code>word</code> 。如果大写用法正确，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>word = "USA"
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>word = "FlaG"
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= word.length &lt;= 100</code></li>
<li><code>word</code> 由小写和大写英文字母组成</li>
</ul>


**相似问题：**
- [2129：将标题首字母大写（1274 分）](/leetcode/2129)
- [3121：统计特殊字母的数量 II（1411 分）](/leetcode/3121)
- [3120：统计特殊字母的数量 I（1205 分）](/leetcode/3120)


## 分析

可以用正则，也可以直接调包。

## 解答

```python
class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        return word.isupper() or word.islower() or word.istitle()
```
26 ms

