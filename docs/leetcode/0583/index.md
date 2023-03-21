# 0583：两个字符串的删除操作（★）


> <u>**[力扣第 583 题](https://leetcode.cn/problems/delete-operation-for-two-strings/)**</u>

## 题目

<p>给定两个单词 <code>word1</code> 和<meta charset="UTF-8" /> <code>word2</code> ，返回使得<meta charset="UTF-8" /> <code>word1</code> 和 <meta charset="UTF-8" /> <code>word2</code><em> </em><strong>相同</strong>所需的<strong>最小步数</strong>。</p>

<p><strong>每步 </strong>可以删除任意一个字符串中的一个字符。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> word1 = "sea", word2 = "eat"
<strong>输出:</strong> 2
<strong>解释:</strong> 第一步将 "sea" 变为 "ea" ，第二步将 "eat "变为 "ea"
</pre>

<p><strong>示例  2:</strong></p>

<pre>
<b>输入：</b>word1 = "leetcode", word2 = "etco"
<b>输出：</b>4
</pre>



<p><strong>提示：</strong></p>
<meta charset="UTF-8" />

<ul>
<li><code>1 &lt;= word1.length, word2.length &lt;= 500</code></li>
<li><code>word1</code> 和 <code>word2</code> 只包含小写英文字母</li>
</ul>


## 分析

显然用动态规划即可，可以用滚动数组优化。

## 解答

```python
def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = list(range(n+1))
    for char in word1:
        prev = dp[:]
        dp[0] += 1
        for j in range(1, n+1):
            if word2[j-1]==char:
                dp[j] = prev[j-1]
            else:
                dp[j] = 1+min(prev[j], dp[j-1])
    return dp[-1]
```
244 ms

