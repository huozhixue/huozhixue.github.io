# 0186：反转字符串中的单词 II（★）


> <u>**[力扣第 186 题](https://leetcode.cn/problems/reverse-words-in-a-string-ii/)**</u>

## 题目

<p>给你一个字符数组 <code>s</code> ，反转其中 <strong>单词</strong> 的顺序。</p>

<p><strong>单词</strong> 的定义为：单词是一个由非空格字符组成的序列。<code>s</code> 中的单词将会由单个空格分隔。</p>

<div class="original__bRMd">
<div>
<p>必须设计并实现 <strong>原地</strong> 解法来解决此问题，即不分配额外的空间。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
<strong>输出：</strong>["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = ["a"]
<strong>输出：</strong>["a"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s[i]</code> 可以是一个英文字母（大写或小写）、数字、或是空格 <code>' '</code> 。</li>
<li><code>s</code> 中至少存在一个单词</li>
<li><code>s</code> 不含前导或尾随空格</li>
<li>题目数据保证：<code>s</code> 中的每个单词都由单个空格分隔</li>
</ul>
</div>
</div>


## 分析

分割翻转再拼接，或者双指针即可解决。
 
## 解答

```python
def reverseWords(self, s: List[str]) -> None:
    s[:] = list(' '.join(''.join(s).split()[::-1]))
```
44 ms



