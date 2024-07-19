# 0115：不同的子序列（★★）


> <u>**[力扣第 115 题](https://leetcode.cn/problems/distinct-subsequences/)**</u>

## 题目

<p>给你两个字符串 <code>s</code><strong> </strong>和 <code>t</code> ，统计并返回在 <code>s</code> 的 <strong>子序列</strong> 中 <code>t</code> 出现的个数，结果需要对 10<sup>9</sup> + 7 取模。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "rabbbit", t = "rabbit"<code>
<strong>输出</strong></code><strong>：</strong><code>3
</code><strong>解释：</strong>
如下所示, 有 3 种可以从 s 中得到 <code>"rabbit" 的方案</code>。
<code><strong><u>rabb</u></strong>b<strong><u>it</u></strong></code>
<code><strong><u>ra</u></strong>b<strong><u>bbit</u></strong></code>
<code><strong><u>rab</u></strong>b<strong><u>bit</u></strong></code></pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "babgbag", t = "bag"
<code><strong>输出</strong></code><strong>：</strong><code>5
</code><strong>解释：</strong>
如下所示, 有 5 种可以从 s 中得到 <code>"bag" 的方案</code>。
<code><strong><u>ba</u></strong>b<u><strong>g</strong></u>bag</code>
<code><strong><u>ba</u></strong>bgba<strong><u>g</u></strong></code>
<code><u><strong>b</strong></u>abgb<strong><u>ag</u></strong></code>
<code>ba<u><strong>b</strong></u>gb<u><strong>ag</strong></u></code>
<code>babg<strong><u>bag</u></strong></code>
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length, t.length &lt;= 1000</code></li>
<li><code>s</code> 和 <code>t</code> 由英文字母组成</li>
</ul>


**相似问题：**
- [1987：不同的好子序列数目（2422 分）](/leetcode/1987)


## 分析

### #1

典型的 dp，按是否由 s[-1] 拼成 t[-1] 即可递推。

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        mod = 10**9+7
        m,n = len(s),len(t)
        dp = [[1]+[0]*n for _ in range(m+1)]
        for i in range(1,m+1):
            for j in range(n+1):
                dp[i][j] = dp[i-1][j]
                if j and s[i-1]==t[j-1]:
                    dp[i][j] += dp[i-1][j-1]
                    dp[i][j] %= mod
        return dp[-1][-1]
```
401 ms

### #2

可以将 dp 优化为一维数组。

## 解答

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        mod = 10**9+7
        m,n = len(s),len(t)
        dp = [1]+[0]*n 
        for i in range(1,m+1):
            for j in range(n,0,-1):
                if s[i-1]==t[j-1]:
                    dp[j] += dp[j-1]
                    dp[j] %= mod
        return dp[-1]
```
263 ms
