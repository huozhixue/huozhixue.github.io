# 0392：判断子序列


> <u>**[力扣第 392 题](https://leetcode.cn/problems/is-subsequence/)**</u>

## 题目

<p>给定字符串 <strong>s</strong> 和 <strong>t</strong> ，判断 <strong>s</strong> 是否为 <strong>t</strong> 的子序列。</p>

<p>字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，<code>"ace"</code>是<code>"abcde"</code>的一个子序列，而<code>"aec"</code>不是）。</p>

<p><strong>进阶：</strong></p>

<p>如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？</p>

<p><strong>致谢：</strong></p>

<p>特别感谢<strong> </strong><a href="https://leetcode.com/pbrother/">@pbrother </a>添加此问题并且创建所有测试用例。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abc", t = "ahbgdc"
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "axc", t = "ahbgdc"
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 <= s.length <= 100</code></li>
<li><code>0 <= t.length <= 10^4</code></li>
<li>两个字符串都只由小写字符组成。</li>
</ul>


**相似问题：**
- [0792：匹配子序列的单词数（1695 分）](/leetcode/0792)
- [1055：形成字符串的最短路径](/leetcode/1055)
- [2486：追加字符以获得子序列（1362 分）](/leetcode/2486)
- [2825：循环增长使字符串子序列等于另一个字符串（1414 分）](/leetcode/2825)


## 分析

### #1

遍历 s 或 t，逐步匹配即可。

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        for c in s:
            while i<len(t) and t[i]!=c:
                i += 1
            if i==len(t):
                return False
            i += 1
        return True
```
33 ms

### #2

还有种简单的迭代器写法。

## 解答

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        it = iter(t)
        return all(c in it for c in s)
```
40 ms





