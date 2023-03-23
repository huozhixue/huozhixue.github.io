# 0712：两个字符串的最小ASCII删除和（★）


> <u>**[力扣第 712 题](https://leetcode.cn/problems/minimum-ascii-delete-sum-for-two-strings/)**</u>

## 题目

<p>给定两个字符串<code>s1</code> 和 <code>s2</code>，返回 <em>使两个字符串相等所需删除字符的 <strong>ASCII </strong>值的最小和 </em>。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> s1 = "sea", s2 = "eat"
<strong>输出:</strong> 231
<strong>解释:</strong> 在 "sea" 中删除 "s" 并将 "s" 的值(115)加入总和。
在 "eat" 中删除 "t" 并将 116 加入总和。
结束时，两个字符串相等，115 + 116 = 231 就是符合条件的最小和。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> s1 = "delete", s2 = "leet"
<strong>输出:</strong> 403
<strong>解释:</strong> 在 "delete" 中删除 "dee" 字符串变成 "let"，
将 100[d]+101[e]+101[e] 加入总和。在 "leet" 中删除 "e" 将 101[e] 加入总和。
结束时，两个字符串都等于 "let"，结果即为 100+101+101+101 = 403 。
如果改为将两个字符串转换为 "lee" 或 "eet"，我们会得到 433 或 417 的结果，比答案更大。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>0 &lt;= s1.length, s2.length &lt;= 1000</code></li>
<li><code>s1</code> 和 <code>s2</code> 由小写英文字母组成</li>
</ul>


## 分析

{{< lc "0583" >}} 升级版，修改下删除代价即可。

## 解答

```python
def minimumDeleteSum(self, s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    dp = [0]+list(accumulate(map(ord, s2)))
    for c in s1:
        prev = dp[:]
        dp[0] += ord(c)
        for j in range(1, n+1):
            if s2[j-1]==c:
                dp[j] = prev[j-1]
            else:
                dp[j] = min(ord(c)+prev[j], ord(s2[j-1])+dp[j-1])
    return dp[-1]
```
512 ms

