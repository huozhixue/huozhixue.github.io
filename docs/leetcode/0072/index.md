# 0072：编辑距离（★★）


> <u>**[力扣第 72 题](https://leetcode.cn/problems/edit-distance/)**</u>

## 题目

<p>给你两个单词 <code>word1</code> 和 <code>word2</code>， <em>请返回将 <code>word1</code> 转换成 <code>word2</code> 所使用的最少操作数</em>  。</p>

<p>你可以对一个单词进行如下三种操作：</p>

<ul>
<li>插入一个字符</li>
<li>删除一个字符</li>
<li>替换一个字符</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>word1 = "horse", word2 = "ros"
<strong>输出：</strong>3
<strong>解释：</strong>
horse -&gt; rorse (将 'h' 替换为 'r')
rorse -&gt; rose (删除 'r')
rose -&gt; ros (删除 'e')
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>word1 = "intention", word2 = "execution"
<strong>输出：</strong>5
<strong>解释：</strong>
intention -&gt; inention (删除 't')
inention -&gt; enention (将 'i' 替换为 'e')
enention -&gt; exention (将 'n' 替换为 'x')
exention -&gt; exection (将 'n' 替换为 'c')
exection -&gt; execution (插入 'u')
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= word1.length, word2.length &lt;= 500</code></li>
<li><code>word1</code> 和 <code>word2</code> 由小写英文字母组成</li>
</ul>


## 分析

### #1

典型的双串 dp，令 dp[i][j] 表示 word1[:i] 和 word2[:j] 的编辑距离，即可递推。

```python
def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1):
        for j in range(n+1):
            if i==0 or j==0:
                dp[i][j] = i+j
            elif word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1+ min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])
    return dp[-1][-1]
```
164 ms

### #2

可以用滚动数组优化空间。

## 解答

```python
def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = list(range(n+1))
    for i in range(1, m+1):
        prev = dp[:]
        dp[0] = i
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                dp[j] = prev[j-1]
            else:
                dp[j] = 1+ min(dp[j-1], prev[j], prev[j-1])
    return dp[-1]
```
112 ms
