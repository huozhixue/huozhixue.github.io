# 0097：交错字符串（★）


> <u>**[力扣第 97 题](https://leetcode.cn/problems/interleaving-string/)**</u>

## 题目

<p>给定三个字符串 <code>s1</code>、<code>s2</code>、<code>s3</code>，请你帮忙验证 <code>s3</code> 是否是由 <code>s1</code> 和 <code>s2</code><em> </em><strong>交错 </strong>组成的。</p>

<p>两个字符串 <code>s</code> 和 <code>t</code> <strong>交错</strong> 的定义与过程如下，其中每个字符串都会被分割成若干 <strong>非空</strong> <span data-keyword="substring-nonempty">子字符串</span>：</p>

<ul>
<li><code>s = s<sub>1</sub> + s<sub>2</sub> + ... + s<sub>n</sub></code></li>
<li><code>t = t<sub>1</sub> + t<sub>2</sub> + ... + t<sub>m</sub></code></li>
<li><code>|n - m| &lt;= 1</code></li>
<li><strong>交错</strong> 是 <code>s<sub>1</sub> + t<sub>1</sub> + s<sub>2</sub> + t<sub>2</sub> + s<sub>3</sub> + t<sub>3</sub> + ...</code> 或者 <code>t<sub>1</sub> + s<sub>1</sub> + t<sub>2</sub> + s<sub>2</sub> + t<sub>3</sub> + s<sub>3</sub> + ...</code></li>
</ul>

<p><strong>注意：</strong><code>a + b</code> 意味着字符串 <code>a</code> 和 <code>b</code> 连接。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/02/interleave.jpg" />
<pre>
<strong>输入：</strong>s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s1 = "", s2 = "", s3 = ""
<strong>输出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s1.length, s2.length &lt;= 100</code></li>
<li><code>0 &lt;= s3.length &lt;= 200</code></li>
<li><code>s1</code>、<code>s2</code>、和 <code>s3</code> 都由小写英文字母组成</li>
</ul>



<p><strong>进阶：</strong>您能否仅使用 <code>O(s2.length)</code> 额外的内存空间来解决它?</p>




## 分析

典型的 dp，按 s3 的末尾由 s1 或 s2 末尾拼成，即可递推。

## 解答

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m,n = len(s1),len(s2)
        if len(s3)!=m+n:
            return False
        dp = [[0]*(n+1) for _ in range(m+1)]
        for i in range(m+1):
            for j in range(n+1):
                dp[i][j] = i==j==0 or (i and s1[i-1]==s3[i+j-1] and dp[i-1][j]) or (j and s2[j-1]==s3[i+j-1] and dp[i][j-1])
        return bool(dp[-1][-1])
```
55 ms

