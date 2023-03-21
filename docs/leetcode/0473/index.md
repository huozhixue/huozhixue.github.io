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

为了方便，令 A=matchsticks，s=sum(A)。

显然当 s%4!=0 时非真。否则，要将 A 划分为四个和为 t=s//4 的子集。
- 暴力法就是遍历 A 的所有排列，判断是否能分割成功
- 假如排列的最后一个数是 x，那么只要 A-{x} 能组成 3 个和 t 的子集，即可成功
- 一般性地，令 dfs(B) 代表集合 B 能否组成 sum(B)//t 个和 t 的子集，尝试递推
- 从 B 中任选一个数 x，集合 C=B-x，只要 dfs(C) 为真且 x+sum(C)%t<=t，dfs(B) 即为真

为了方便，可以令 dfs(B) 返回 sum(B)%t，若集合 B 非真，则返回 -1。

同时，可以将集合状态压缩为一个数，方便递归。


## 解答

```python
def makesquare(self, matchsticks: List[int]) -> bool:
    s = sum(matchsticks)
    if s%4:
        return False
    A, n = matchsticks, len(matchsticks)
    dp = [0]+[-1]*((1<<n)-1)
    for st in range(1<<n):
        if dp[st]>=0:
            for i in range(n):
                if not st&(1<<i) and dp[st]+A[i]<=s//4:
                    dp[st|(1<<i)] = (dp[st]+A[i])%(s//4)
    return dp[-1]==0
```
2652 ms


