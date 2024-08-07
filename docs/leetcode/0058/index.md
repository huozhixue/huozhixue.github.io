# 0058：最后一个单词的长度


> <u>**[力扣第 58 题](https://leetcode.cn/problems/length-of-last-word/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 <strong>最后一个</strong> 单词的长度。</p>

<p><strong>单词</strong> 是指仅由字母组成、不包含任何空格字符的最大<span data-keyword="substring-nonempty">子字符串</span>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "Hello World"
<strong>输出：</strong>5
<strong>解释：</strong>最后一个单词是“World”，长度为 5。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "   fly me   to   the moon  "
<strong>输出：</strong>4<strong>
解释：</strong>最后一个单词是“moon”，长度为 4。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "luffy is still joyboy"
<strong>输出：</strong>6
<strong>解释：</strong>最后一个单词是长度为 6 的“joyboy”。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 仅有英文字母和空格 <code>' '</code> 组成</li>
<li><code>s</code> 中至少存在一个单词</li>
</ul>




## 分析 

去掉末尾空格，按空格分隔即可。

## 解答

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.split()[-1])
```
26 ms
