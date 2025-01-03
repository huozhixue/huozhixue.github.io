# 0010：正则表达式匹配（★★）


> <u>**[力扣第 10 题](https://leetcode.cn/problems/regular-expression-matching/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个字符规律 <code>p</code>，请你来实现一个支持 <code>'.'</code> 和 <code>'*'</code> 的正则表达式匹配。</p>

<ul>
<li><code>'.'</code> 匹配任意单个字符</li>
<li><code>'*'</code> 匹配零个或多个前面的那一个元素</li>
</ul>

<p>所谓匹配，是要涵盖 <strong>整个 </strong>字符串 <code>s</code>的，而不是部分字符串。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aa", p = "a"
<strong>输出：</strong>false
<strong>解释：</strong>"a" 无法匹配 "aa" 整个字符串。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong>s = "aa", p = "a*"
<strong>输出：</strong>true
<strong>解释：</strong>因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "ab", p = ".*"
<strong>输出：</strong>true
<strong>解释：</strong>".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 20</code></li>
<li><code>1 &lt;= p.length &lt;= 20</code></li>
<li><code>s</code> 只包含从 <code>a-z</code> 的小写字母。</li>
<li><code>p</code> 只包含从 <code>a-z</code> 的小写字母，以及字符 <code>.</code> 和 <code>*</code>。</li>
<li>保证每次出现字符 <code>*</code> 时，前面都匹配到有效的字符</li>
</ul>


**相似问题：**
- [0044：通配符匹配](/leetcode/0044)


## 分析

- 最简单的就是直接调用正则
- 字符串匹配问题还可以考虑 dp：
	- 如果 p[-1] == ' * '，p 匹配 s 必然是两种情况之一：
		- ' * ' 代表零个，p[:-2] 匹配 s
		- ' * ' 代表多个，p[-2] 匹配 s[-1] 且 p 匹配 s[:-1]
	- 否则， p 匹配 s 必然是：
		- p[-1] 匹配 s[-1] 且 p[:-1] 匹配 s[:-1]
- 可以用滚动数组优化空间

## 解答

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        f = [1]+[0]*n
        for j in range(1,n+1):
            if p[j-1]=='*':
                f[j] = f[j-2]
        for c in s:
            g = [0]*(n+1)
            for j in range(1,n+1):
                if p[j-1]=='*':
                    g[j] = g[j-2] or (f[j] and p[j-2] in '.'+c)
                else:
                    g[j] = f[j-1] and p[j-1] in '.'+c
            f = g
        return bool(f[-1])
```
3 ms，时间 O(N*M)
