# 1312：让字符串成为回文串的最少插入次数（1786 分）


> <u>**[力扣第 170 场周赛第 4 题](https://leetcode.cn/problems/minimum-insertion-steps-to-make-a-string-palindrome/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，每一次操作你都可以在字符串的任意位置插入任意字符。</p>

<p>请你返回让 <code>s</code> 成为回文串的 <strong>最少操作次数</strong> 。</p>

<p>「回文串」是正读和反读都相同的字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "zzazz"
<strong>输出：</strong>0
<strong>解释：</strong>字符串 "zzazz" 已经是回文串了，所以不需要做任何插入操作。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "mbadm"
<strong>输出：</strong>2
<strong>解释：</strong>字符串可变为 "mbdadbm" 或者 "mdbabdm" 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "leetcode"
<strong>输出：</strong>5
<strong>解释：</strong>插入 5 个字符后字符串变为 "leetcodocteel" 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 500</code></li>
<li><code>s</code> 中所有字符都是小写字母。</li>
</ul>


**相似问题：**
- [2193：得到回文串的最少操作次数（2090 分）](/leetcode/2193)


## 分析

按首尾字符情况递推即可

## 解答


```python
class Solution:
    def minInsertions(self, s: str) -> int:
        n = len(s)
        f = [[0]*n for _ in range(n)]
        for i in range(n-2,-1,-1):
            for j in range(i+1,n):
                if s[i]==s[j]:
                    f[i][j] = f[i+1][j-1]
                else:
                    f[i][j] = 1+min(f[i+1][j],f[i][j-1])
        return f[0][-1]
```
327 ms
