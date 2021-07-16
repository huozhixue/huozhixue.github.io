# 0005：最长回文子串（★★★）


## 题目

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

<!--more--> 

示例 1：

	输入: "babad"
	输出: "bab"
	注意: "aba" 也是一个有效答案。
	
示例 2：

	输入: "cbbd"
	输出: "bb"


	
## 分析

### #1

暴力法是直接遍历所有子串，判断是否是回文。

显然有很多不必要的判断，观察发现回文子串是可以递推的。
s[i:j+1] 是回文等价于 s[i-1:j] 是回文且 s[i]==s[j]。

因此考虑直接遍历中心，递推找出最长的回文串。
注意中心可能是一个字符，也可能是两个相同的相邻字符。

```python
def longestPalindrome(self, s: str) -> str:
    def expand(i, j):
        while i and j < n-1 and s[i-1]==s[j+1]:
            i -= 1
            j += 1
        return i, j
    
    pair, n = (0, 0), len(s)
    for k in range(n):
        for i, j in [expand(k, k), expand(k, k-1)]:
            if j-i > pair[1]-pair[0]:
                pair = (i, j)
    return s[pair[0]:pair[1]+1]
```
时间复杂度 $O(N^2)$，1076 ms

### #2

还有个更巧妙的想法。

令 dp[j] 代表以位置 j 结尾的最长子串长度。
显然有 dp[j] <= dp[j-1]+2 <= max(dp[:j])+2。又因为是求最长，不超过 max(dp[:j]) 的子串无需考虑。

所以遍历到位置 j 时，只需要考虑 max(dp[:j])+1 和 max(dp[:j])+2 两种长度的子串是否符合。

## 解答

```python
def longestPalindrome(self, s: str) -> str:
    res, n = '', len(s)
    for j in range(n):
        maxL = len(res)
        for i in [j-maxL, max(0, j-maxL-1)]:
            tmp = s[i:j+1]
            if tmp == tmp[::-1]:
                res = tmp
    return res
```

时间复杂度 $O(N^2)$，124 ms

## *附加

此题还有一个经典的的 Manacher 算法：
{{< link "力扣官方题解" "https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode-solution/" >}}

它在 O(N) 时间内不仅能找到最长回文子串，而且能得到所有中心子串的扩展距离。
因此在与回文相关的问题中，都可以试试能否用 Manacher 算法解决。

```python
def longestPalindrome(self, s: str) -> str:
	def expand(s, l, r):
		while l > 0 and r < len(s)-1 and s[l-1] == s[r+1]:
			l -= 1
			r += 1
		if r - l > self.r - self.l:
			self.l, self.r = l, r
		return (r - l) // 2
		
	def manacher(s):
		s = '#' + '#'.join(list(s)) + '#'
		arm_len, center, right = [], 0, 0
		for i in range(len(s)):
			if right > i:
				i_sym = 2 * center - i
				min_arm_len = min(arm_len[i_sym], right - i)
				cur_arm_len = expand(s, i - min_arm_len, i + min_arm_len)
			else:
				cur_arm_len = expand(s, i, i)
			arm_len.append(cur_arm_len)
			if i + cur_arm_len > right:
				center, right = i, i + cur_arm_len

	self.l, self.r = 0, 0
	manacher(s)
	return s[self.l//2:self.r//2]
```

时间复杂度 O(N)，168 ms


