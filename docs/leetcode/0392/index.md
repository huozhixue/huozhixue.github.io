# 0392：判断子序列


> <u>**[力扣第 3 场周赛第 1 题](https://leetcode.cn/problems/is-subsequence/)**</u>

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


## 分析

### #1

遍历 s 的每个字符，在剩下的 t 中找第一个位置即可。

```python
def isSubsequence(self, s: str, t: str) -> bool:
    pos = 0
    for char in s:
        pos = t.find(char, pos) + 1
        if not pos:
            return False
    return True
```
24 ms

### #2

也可以遍历 t，逐步匹配 s。

```python
def isSubsequence(self, s: str, t: str) -> bool:
    i, n = 0, len(s)
    for char in t:
        if i<n and char == s[i]:
            i += 1
    return i==n
```
40 ms

### #3

还有种简单的迭代器写法。

## 解答

```python
def isSubsequence(self, s: str, t: str) -> bool:
    it = iter(t)
    return all(c in it for c in s)
```
40 ms

## *附加

如果有大量的 s，考虑保存 t 中字符 x 对应的下标列表，遍历 s 时从下标列表中二分查询即可。




