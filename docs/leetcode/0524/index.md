# 0524：通过删除字母匹配到字典里最长单词（★）


> <u>**[力扣第 524 题](https://leetcode.cn/problems/longest-word-in-dictionary-through-deleting/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个字符串数组 <code>dictionary</code> ，找出并返回 <code>dictionary</code> 中最长的字符串，该字符串可以通过删除 <code>s</code> 中的某些字符得到。</p>

<p>如果答案不止一个，返回长度最长且字母序最小的字符串。如果答案不存在，则返回空字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
<strong>输出：</strong>"apple"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abpcplea", dictionary = ["a","b","c"]
<strong>输出：</strong>"a"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>1 &lt;= dictionary.length &lt;= 1000</code></li>
<li><code>1 &lt;= dictionary[i].length &lt;= 1000</code></li>
<li><code>s</code> 和 <code>dictionary[i]</code> 仅由小写英文字母组成</li>
</ul>


## 分析

遍历判断是否子序列即可。

## 解答


```python
class Solution:
    def findLongestWord(self, s: str, dictionary: List[str]) -> str:
        res = ''
        for t in dictionary:
            it = iter(s)
            if all(c in it for c in t) and (-len(t),t)<(-len(res),res):
                res = t
        return res
```
90 ms

## *附加

还可以预处理 s 的序列自动机，节省子序列判断时间。

```python
class Solution:
    def findLongestWord(self, s: str, dictionary: List[str]) -> str:
        def check(t):
            i = 0
            for c in t:
                if c not in f[i]:
                    return False
                i = f[i][c]+1
            return True

        n = len(s)
        f = [{} for _ in range(n+1)]
        for i in range(n-1,-1,-1):
            f[i] = f[i+1].copy()
            f[i][s[i]] = i
        res = ''
        for t in dictionary:
            if check(t) and (-len(t),t)<(-len(res),res):
                res = t
        return res
```
56 ms
