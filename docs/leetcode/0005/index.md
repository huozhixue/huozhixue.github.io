# 0005：最长回文子串（★）


> <u>**[力扣第 5 题](https://leetcode.cn/problems/longest-palindromic-substring/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，找到 <code>s</code> 中最长的 <span data-keyword="palindromic-string">回文</span> <span data-keyword="substring-nonempty">子串</span>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "babad"
<strong>输出：</strong>"bab"
<strong>解释：</strong>"aba" 同样是符合题意的答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "cbbd"
<strong>输出：</strong>"bb"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>s</code> 仅由数字和英文字母组成</li>
</ul>


**相似问题：**
- [0214：最短回文串](/leetcode/0214)
- [0266：回文排列](/leetcode/0266)
- [0336：回文对](/leetcode/0336)
- [0516：最长回文子序列](/leetcode/0516)
- [0647：回文子串](/leetcode/0647)
- [2472：不重叠回文子字符串的最大数目（2013 分）](/leetcode/2472)


## 分析

### #1

- 暴力法是直接遍历所有子串，判断是否是回文
- 显然有很多不必要的判断，观察发现回文子串是可以递推的
	- s[i:j+1] 是回文等价于 s[i-1:j] 是回文且 s[i]==s[j]。
- 因此采用区间 dp
	- 令 dp[i][j] 代表 s[i:j+1] 是否回文，递推式为：
		$$dp[i][j] = dp[i+1][j-1] \ and  \ s[i]==s[j]$$
	- dp[i][j] 依赖 dp[i+1][j-1]，要特别注意遍历顺序

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        l,r,n = 0,0,len(s)
        dp = [[1]*n for _ in range(n)]
        for i in range(n-1,-1,-1):
            for j in range(i+1,n):
                dp[i][j] = dp[i+1][j-1] and s[i]==s[j]
                if dp[i][j] and j-i>r-l:
                    l,r = i,j
        return s[l:r+1]
```
时间 $O(N^2)$，1908 ms

### #2

- 注意到递推过程中假如 dp[i+1][j-1] 非真，就没必要递推 dp[i][j] 了
- 因此考虑从初始的 dp[i][i-1] 或 dp[i][i] 往两边递推，一旦非真就停下来
- 这就是中心扩展法：
	- 遍历所有中心 (i, i-1) 或 (i, i)
	- 对于每个中心，往两边扩展找到最长的回文子串
	- 过程中找到的最长的即为所求

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        def expand(l,r):
            while l and r<n-1 and s[l-1]==s[r+1]:
                l -= 1
                r += 1
            return l,r

        a,b,n = 0,0,len(s)
        for i in range(n):
            for l,r in [expand(i,i), expand(i,i-1)]:
                if r-l>b-a:
                    a,b = l,r
        return s[a:b+1]
```
时间 $O(N^2)$，301 ms

### #3

- 此题还有一个经典的的 [Manacher算法](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode-solution)
- 它在 O(N) 时间内能找到
	- 每个中心子串的最长扩展距离
	- 每个下标结尾的最长回文子串
- 因此在与回文相关的问题中，都可以尝试用 Manacher 算法解决。


## 解答
```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        def manacher(s):
            n = len(s)
            A, B = [], [1]*n
            mid, r = 0, 0
            for i in range(n):
                a = min(A[2*mid-i], r-i) if r>i else 0
                while i-a and i+a<n-1 and s[i-a-1]==s[i+a+1]:
                    a += 1
                    B[i+a] = max(B[i+a],a*2+1)
                A.append(a)
                if i+a>r:
                    mid, r = i, i+a
            return B    # B[i]: i结尾的最大回文子串长度（奇数）
        B = manacher( '#'+'#'.join(s)+'#')
        i = B.index(max(B))
        return s[(i-B[i]+1)//2:i//2]
```
时间 O(N)，73 ms


