# 0291：单词规律 II（★）


> <u>**[力扣第 291 题](https://leetcode.cn/problems/word-pattern-ii/)**</u>

## 题目

<p>给你一种规律 <code>pattern</code> 和一个字符串 <code>s</code>，请你判断 <code>s</code> 是否和<em> </em><code>pattern</code> 的规律<strong>相匹配</strong>。</p>

<p>如果存在单个字符到字符串的 <strong>双射映射</strong> ，那么字符串<meta charset="UTF-8" /> <code>s</code> 匹配<meta charset="UTF-8" /> <code>pattern</code> ，即：如果<meta charset="UTF-8" /><code>pattern</code> 中的每个字符都被它映射到的字符串替换，那么最终的字符串则为 <code>s</code> 。<strong>双射</strong> 意味着映射双方一一对应，不会存在两个字符映射到同一个字符串，也不会存在一个字符分别映射到两个不同的字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>pattern = "abab", s = "redblueredblue"
<strong>输出：</strong>true
<strong>解释：</strong>一种可能的映射如下：
'a' -&gt; "red"
'b' -&gt; "blue"</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>pattern = "aaaa", s = "asdasdasdasd"
<strong>输出：</strong>true
<strong>解释：</strong>一种可能的映射如下：
'a' -&gt; "asd"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>pattern = "aabb", s = "xyzabcxzyabc"
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= pattern.length, s.length &lt;= 20</code></li>
<li><code>pattern</code> 和 <code>s</code> 由小写英文字母组成</li>
</ul>


## 分析

典型的回溯，尝试用 s 的不同前缀来匹配，如果映射冲突就返回上一步。

注意回溯时维护两个方向的映射即可。

## 解答

```python
def wordPatternMatch(self, pattern: str, s: str) -> bool:
    def dfs(p, s):
        if not p and not s:
            return True
        if not p or not s:
            return False
        x = p[0]
        if x in d1:
            y = d1[x]
            return s[:len(y)]==y and dfs(p[1:], s[len(y):])
        for i in range(len(s)):
            y = s[:i+1]
            if y not in d2:
                d1[x], d2[y] = y, x
                if dfs(p[1:], s[i+1:]):
                    return True
                del d1[x], d2[y]
        return False
    
    d1, d2 = {}, {}
    return dfs(pattern, s)
```
36 ms
