# 0044：通配符匹配（★★）


> <u>**[力扣第 44 题](https://leetcode.cn/problems/wildcard-matching/)**</u>

## 题目

<p>给定一个字符串 (<code>s</code>) 和一个字符模式 (<code>p</code>) ，实现一个支持 <code>&#39;?&#39;</code> 和 <code>&#39;*&#39;</code> 的通配符匹配。</p>

<pre>&#39;?&#39; 可以匹配任何单个字符。
&#39;*&#39; 可以匹配任意字符串（包括空字符串）。
</pre>

<p>两个字符串<strong>完全匹配</strong>才算匹配成功。</p>

<p><strong>说明:</strong></p>

<ul>
<li><code>s</code> 可能为空，且只包含从 <code>a-z</code> 的小写字母。</li>
<li><code>p</code> 可能为空，且只包含从 <code>a-z</code> 的小写字母，以及字符 <code>?</code> 和 <code>*</code>。</li>
</ul>

<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong>
s = &quot;aa&quot;
p = &quot;a&quot;
<strong>输出:</strong> false
<strong>解释:</strong> &quot;a&quot; 无法匹配 &quot;aa&quot; 整个字符串。</pre>

<p><strong>示例 2:</strong></p>

<pre><strong>输入:</strong>
s = &quot;aa&quot;
p = &quot;*&quot;
<strong>输出:</strong> true
<strong>解释:</strong> &#39;*&#39; 可以匹配任意字符串。
</pre>

<p><strong>示例 3:</strong></p>

<pre><strong>输入:</strong>
s = &quot;cb&quot;
p = &quot;?a&quot;
<strong>输出:</strong> false
<strong>解释:</strong> &#39;?&#39; 可以匹配 &#39;c&#39;, 但第二个 &#39;a&#39; 无法匹配 &#39;b&#39;。
</pre>

<p><strong>示例 4:</strong></p>

<pre><strong>输入:</strong>
s = &quot;adceb&quot;
p = &quot;*a*b&quot;
<strong>输出:</strong> true
<strong>解释:</strong> 第一个 &#39;*&#39; 可以匹配空字符串, 第二个 &#39;*&#39; 可以匹配字符串 &quot;dce&quot;.
</pre>

<p><strong>示例 5:</strong></p>

<pre><strong>输入:</strong>
s = &quot;acdcb&quot;
p = &quot;a*c?b&quot;
<strong>输出:</strong> false</pre>


## 分析

类似 {{< lc "0010" >}}，区别在于星号和前一个字符无关了。

## 解答

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m,n = len(p),len(s)
        dp = [[1]+[0]*n for _ in range(m+1)]
        for i in range(1,m+1):
            for j in range(n+1):
                if p[i-1]=='*':
                    dp[i][j] = dp[i-1][j] or (j and dp[i][j-1])
                else:
                    dp[i][j] = j and p[i-1] in s[j-1]+'?' and dp[i-1][j-1]
        return bool(dp[-1][-1])
```
461 ms


## *附加

本题也可以用正则解决：
- 观察发现，将 p 按星号分割为一些子串，问题就等价于在 s 中依次搜索这些子串
- 注意第一个子串要和 s 开头匹配，最后一个子串要和 s 末尾匹配。

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        A = re.split(r'\*+', p.replace('?', '.'))
        pos = 0
        for i, sub in enumerate(A):
            tmp = re.compile('^'*(i==0)+sub+'$'*(i==len(A)-1)).search(s, pos)
            if not tmp:
                return False
            pos = tmp.end()
        return True
```
60 ms
