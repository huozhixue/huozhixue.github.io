# 0473：火柴拼正方形（★）


> <u>**[力扣第 473 题](https://leetcode.cn/problems/matchsticks-to-square/)**</u>
## 题目

<p>你将得到一个整数数组 <code>matchsticks</code> ，其中 <code>matchsticks[i]</code> 是第 <code>i</code> 个火柴棒的长度。你要用 <strong>所有的火柴棍</strong> 拼成一个正方形。你 <strong>不能折断</strong> 任何一根火柴棒，但你可以把它们连在一起，而且每根火柴棒必须 <strong>使用一次</strong> 。</p>

<p>如果你能使这个正方形，则返回 <code>true</code> ，否则返回 <code>false</code> 。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/09/matchsticks1-grid.jpg" /></p>

<pre>
<strong>输入:</strong> matchsticks = [1,1,2,2,2]
<strong>输出:</strong> true
<strong>解释:</strong> 能拼成一个边长为2的正方形，每边两根火柴。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> matchsticks = [3,3,3,3,4]
<strong>输出:</strong> false
<strong>解释:</strong> 不能用所有火柴拼成一个正方形。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= matchsticks.length &lt;= 15</code></li>
<li><code>1 &lt;= matchsticks[i] &lt;= 10<sup>8</sup></code></li>
</ul>


## 分析

- 显然当总长度不是 4 的倍数时为假
- 否则，令 f[st] 代表集合 st 的火柴能否拼成若干个完整边，且剩下的长度小于边长，即可递推
- 为了方便，符合条件时，令 f[st] 直接返回还没拼的长度，否则赋 inf
## 解答

```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        s = sum(matchsticks)
        if s%4:
            return False
        s //= 4
        n = len(matchsticks)
        f = [inf]*(1<<n)
        f[0] = 0
        for st in range(1,1<<n):
            for i,x in enumerate(matchsticks):
                if st&1<<i and x+f[st^1<<i]<=s:
                    f[st] = (x+f[st^1<<i])%s
                    break
        return f[-1]==0
```
1602 ms
