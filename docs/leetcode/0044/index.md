# 0044：通配符匹配（★★）


> <u>**[力扣第 44 题](https://leetcode.cn/problems/wildcard-matching/)**</u>

## 题目

<div class="title__3Vvk">给你一个输入字符串 (<code>s</code>) 和一个字符模式 (<code>p</code>) ，请你实现一个支持 <code>'?'</code> 和 <code>'*'</code> 匹配规则的通配符匹配：</div>

<ul>
<li class="title__3Vvk"><code>'?'</code> 可以匹配任何单个字符。</li>
<li class="title__3Vvk"><code>'*'</code> 可以匹配任意字符序列（包括空字符序列）。</li>
</ul>

<div class="original__bRMd">
<div>
<p>判定匹配成功的充要条件是：字符模式必须能够 <strong>完全匹配</strong> 输入字符串（而不是部分匹配）。</p>
</div>
</div>


<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aa", p = "a"
<strong>输出：</strong>false
<strong>解释：</strong>"a" 无法匹配 "aa" 整个字符串。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "aa", p = "*"
<strong>输出：</strong>true
<strong>解释：</strong>'*' 可以匹配任意字符串。
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "cb", p = "?a"
<strong>输出：</strong>false
<strong>解释：</strong>'?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s.length, p.length &lt;= 2000</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
<li><code>p</code> 仅由小写英文字母、<code>'?'</code> 或 <code>'*'</code> 组成</li>
</ul>


**相似问题：**
- [0010：正则表达式匹配](/leetcode/0010)


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
