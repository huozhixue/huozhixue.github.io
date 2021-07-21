# 0005：最长回文子串（★★★）


## 题目

给你一个字符串 s，找到 s 中最长的回文子串。

提示：

- 1 <= s.length <= 1000
- s 仅由数字和英文字母（大写和/或小写）组成


<!--more--> 

示例 1：
    
    输入：s = "babad"
    输出："bab"
    解释："aba" 同样是符合题意的答案。

示例 2：
    
    输入：s = "cbbd"
    输出："bb"

示例 3：
    
    输入：s = "a"
    输出："a"

示例 4：
    
    输入：s = "ac"
    输出："a"
 


## 分析

### #1

暴力法是直接遍历所有子串，判断是否是回文。

显然有很多不必要的判断，观察发现回文子串是可以递推的。
s[i:j+1] 是回文等价于 s[i-1:j] 是回文且 s[i]==s[j]。

因此考虑直接遍历中心，递推找出最长的回文串。
注意中心可能是一个字符，也可能是两个相同的相邻字符。

```python
def longestPalindrome(self, s: str) -> str:
    def expand(l, r):
        while l and r < len(s) - 1 and s[l-1] == s[r+1]:
            l -= 1
            r += 1
        return l, r

    pair = (0, 0)
    for i in range(len(s)):
        for l, r in [expand(i, i), expand(i, i - 1)]:
            if r - l > pair[1] - pair[0]:
                pair = (l, r)
    return s[pair[0]:pair[1]+1]
```
时间复杂度 $O(N^2)$，940 ms

### #2

还有个更巧妙的想法。

令 dp[j] 代表以位置 j 结尾的最长子串长度。
显然有 dp[j] <= dp[j-1]+2 <= max(dp[:j])+2。又因为是求最长，不超过 max(dp[:j]) 的子串无需考虑。

所以遍历到位置 j 时，只需要考虑 max(dp[:j])+1 和 max(dp[:j])+2 两种长度的子串是否符合。

## 解答

```python
def longestPalindrome(self, s: str) -> str:
    res, maxL, n = '', 0, len(s)
    for j in range(n):
        for L in [maxL+1, min(maxL+2, j+1)]:
            tmp = s[j+1-L:j+1]
            if tmp == tmp[::-1]:
                res, maxL = tmp, L
    return res
```

时间复杂度 $O(N^2)$，124 ms

## *附加

此题还有一个经典的的 
[Manacher算法](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode-solution)
。

它在 O(N) 时间内不仅能找到最长回文子串，而且能得到所有中心子串的扩展距离。
因此在与回文相关的问题中，都可以试试能否用 Manacher 算法解决。

```python
def longestPalindrome(self, s: str) -> str:
    def expand(l, r):
        while l > 0 and r < len(ss) - 1 and ss[l - 1] == ss[r + 1]:
            l -= 1
            r += 1
        return (r - l) // 2

    pair, ss = (0, 0), '#' + '#'.join(s) + '#'
    arm_len, center, right = [], 0, 0
    for i in range(len(ss)):
        min_arm_len = min(arm_len[2*center-i], right-i) if right > i else 0
        cur_arm_len = expand(i - min_arm_len, i + min_arm_len)
        arm_len.append(cur_arm_len)
        if i + cur_arm_len > right:
            center, right = i, i + cur_arm_len
        if 2*cur_arm_len > pair[1]-pair[0]:
            pair = (i-cur_arm_len, i+cur_arm_len)
    return ss[pair[0]+1:pair[1]:2]
```
时间复杂度 O(N)，124 ms


