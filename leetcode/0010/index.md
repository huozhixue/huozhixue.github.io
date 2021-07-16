# 0010：正则表达式匹配（★★★）


## 题目

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

- '.' 匹配任意单个字符
- '*' 匹配零个或多个前面的那一个元素
- 所谓匹配，是要涵盖整个字符串 s的，而不是部分字符串。
- s 可能为空，且只包含从 a-z 的小写字母。
- p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
- 保证每次出现字符 * 时，前面都匹配到有效的字符

<!--more--> 

示例 1：

	输入：s = "aa" p = "a"
	输出：false
	解释："a" 无法匹配 "aa" 整个字符串。
	
示例 2:

	输入：s = "aa" p = "a*"
	输出：true
	解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。

示例 3：

	输入：s = "ab" p = ".*"
	输出：true
	解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。

示例 4：

	输入：s = "aab" p = "c*a*b"
	输出：true
	解释：因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。

示例 5：

	输入：s = "mississippi" p = "mis*is*p*."
	输出：false

	
## 分析

### #1

观察发现如果 p 和 s 的最后一位相匹配，即 p[-1]==s[-1] or p[-1]=='.'，则转为递归子问题判断 p[:-1] 和 s[:-1] 是否匹配。

如果 p 和 s 的最后一位不匹配，但 p[-1]=='*'，p 要匹配 s 则必然是两种情况之一：

	'*'匹配零个元素：		p[:-1] 匹配 s
	'*'匹配多个元素：		p[-2] 匹配 s[-1] 且 p 匹配 s[:-1]

如果 p 和 s 最后一位不匹配，且 p[-1]!='*'，显然 p 肯定不匹配 s。

再考虑下边界情况，就可以写出递归代码。

```python
@lru_cache(None)
def isMatch(self, s: str, p: str) -> bool:
	if not p and not s:
		return True
	if not p:
		return False
	if p[-1] == '*':
		return self.isMatch(s, p[:-2]) or (s!='' and p[-2] in s[-1]+'.' and self.isMatch(s[:-1], p))
	if s and p[-1] in s[-1]+'.':
		return self.isMatch(s[:-1], p[:-1])
	return False
```

52 ms

### #2

可以改写为动态规划。用 dp[i][j] 表示 p[:j] 能否匹配 s[:i]，那么状态转移方程为：
	
	if i==j==0: 		dp[i][j] = True
	elif j==0: 			dp[i][j] = False
	elif p[j-1]=='*': 	dp[i][j] = dp[i][j-2] or (i>0 and p[j-2] in s[i-1]+'.' and dp[i-1][j])
	else: 				dp[i][j] = i>0 and p[j-1] in s[i-1]+'.' and dp[i-1][j-1]

## 解答

```python
def isMatch(self, s: str, p: str) -> bool:
	m, n = len(s), len(p)
	dp = [[False]*(n+1) for _ in range(m+1)]
	dp[0][0] = True
	for i in range(m+1):
		for j in range(1, n+1):
			if p[j-1] == '*':
				dp[i][j] = dp[i][j-2] or (i>0 and p[j-2] in s[i-1]+'.' and dp[i-1][j])
			else:
				dp[i][j] = i>0 and p[j-1] in s[i-1]+'.' and dp[i-1][j-1]
	return dp[-1][-1]
```

时间复杂度 O(M*N)，60 ms
