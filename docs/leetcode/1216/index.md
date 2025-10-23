# 1216：验证回文字符串 III（★）


> <u>**[力扣第 10 场双周赛第 4 题](https://leetcode.cn/problems/valid-palindrome-iii/)**</u>

## 题目

<p>给出一个字符串 <code>s</code> 和一个整数 <code>k</code>，若这个字符串是不是一个「k <strong>回文</strong> 」，则返回 <code>true</code> 。</p>

<p>如果可以通过从字符串中删去最多 <code>k</code> 个字符将其转换为回文，那么这个字符串就是一个「<strong>k</strong> <strong>回文</strong> 」。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abcdeca", k = 2
<strong>输</strong><strong>出：</strong>true
<strong>解释：</strong>删去字符 “b” 和 “e”。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong>s = "abbababa", k = 1
<strong>输</strong><strong>出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>s</code> 中只含有小写英文字母</li>
<li><code>1 &lt;= k &lt;= s.length</code></li>
</ul>


## 分析

- 本质是求最长回文子序列
- 区间 dp 递推即可
## 解答

```python
class Solution:
    def isValidPalindrome(self, s: str, k: int) -> bool:
        n = len(s)
        dp = [[0]*n for _ in range(n)]
        for i in range(n-1, -1, -1):
            dp[i][i] = 1
            for j in range(i+1, n):
                dp[i][j] = 2+dp[i+1][j-1] if s[i]==s[j] else max(dp[i+1][j], dp[i][j-1])
        return n - dp[0][-1] <= k
```

204 ms
