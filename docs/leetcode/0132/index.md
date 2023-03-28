# 0132：分割回文串 II（★★）


> <u>**[力扣第 132 题](https://leetcode.cn/problems/palindrome-partitioning-ii/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，请你将 <code>s</code> 分割成一些子串，使每个子串都是回文。</p>

<p>返回符合要求的 <strong>最少分割次数</strong> 。</p>

<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aab"
<strong>输出：</strong>1
<strong>解释：</strong>只需一次分割就可将 <em>s </em>分割成 ["aa","b"] 这样两个回文子串。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "a"
<strong>输出：</strong>0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "ab"
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= s.length <= 2000</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>
</div>
</div>


## 分析

### #1

类似 {{< lc "0131" >}}，可以递归。

要注意的是若本身就是回文串，应直接返回 0。

```python
def minCut(self, s: str) -> int:
    @cache
    def dfs(i):
        if s[i:] == s[i:][::-1]:
            return 0
        res = float('inf')
        for j in range(i+1, len(s)):
            if s[i:j] == s[i:j][::-1]:
                res = min(res, 1+dfs(j))
        return res
    return dfs(0)
```
1784 ms

### #2

观察可发现，有很多重复判断 s 的子串是否回文。根据 {{< lc "0005" >}}，也可以用动态规划解决。

另外，求最小分割也可以改成动态规划的非递归形式，节省空间。

## 解答

```python
def minCut(self, s: str) -> int:
    n = len(s)
    f = [[True]*n for _ in range(n)]
    for j in range(n):
        for i in range(j):
            f[i][j] = f[i+1][j-1] and s[i]==s[j]
    dp = [0]*n
    for i in range(n):
        dp[i] = 0 if f[0][i] else 1+min(dp[j] for j in range(i) if f[j+1][i])
    return dp[-1]
```
时间复杂度 O(N^2)，572 ms
