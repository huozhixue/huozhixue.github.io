# 0010：正则表达式匹配（★★★）


## 题目

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

- '.' 匹配任意单个字符
- '*' 匹配零个或多个前面的那一个元素

所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

提示：

- 0 <= s.length <= 20
- 0 <= p.length <= 30
- s 可能为空，且只包含从 a-z 的小写字母。
- p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
- 保证每次出现字符 * 时，前面都匹配到有效的字符


<!--more--> 

 
示例 1：

    输入：s = "aa" p = "a"
    输出：false
    解释："a" 无法匹配 "aa" 整个字符串。

示例 2:

    输入：s = "aa" p = "a*"
    输出：true
    解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。
    因此，字符串 "aa" 可被视为 'a' 重复了一次。

示例 3：
    
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

最简单的就是直接调用正则。

```python
def isMatch(self, s: str, p: str) -> bool:
    return bool(re.match(p+'$', s))
```

68 ms

### #2

尝试自己实现。因为 '*' 与前一个字符相关，所以考虑从后往前看。

如果 p[-1] == '*'，那么 p 匹配 s 必然是两种情况之一：

	'*' 代表零个：		p[:-2] 匹配 s
	'*' 代表多个：		p[-2] 匹配 s[-1] 且 p 匹配 s[:-1]

如果 p[-1] != '*'，那么 p 匹配 s 必然是 p[-1] 匹配 s[-1] 且 p[:-1] 匹配 s[:-1]。

因此都能转成递归子问题。注意到有重复子问题，所以用记忆化递归。

```python
@lru_cache(None)
def isMatch(self, s: str, p: str) -> bool:
    if not p:
        return not s
    if p[-1] == '*':
        return self.isMatch(s, p[:-2]) or (bool(s) and p[-2] in s[-1]+'.' and self.isMatch(s[:-1], p))
    return bool(s) and p[-1] in s[-1]+'.' and self.isMatch(s[:-1], p[:-1])
```

40 ms

### #3

可以改写为动态规划的非递归形式。用 dp[i][j] 表示 p[:j] 能否匹配 s[:i]，状态转移方程为：
	
	if j==0: 		    dp[i][j] = i == 0
	elif p[j-1]=='*': 	dp[i][j] = dp[i][j-2] or (i>0 and p[j-2] in s[i-1]+'.' and dp[i-1][j])
	else: 				dp[i][j] = i>0 and p[j-1] in s[i-1]+'.' and dp[i-1][j-1]

## 解答

```python
def isMatch(self, s: str, p: str) -> bool:
    m, n = len(s), len(p)
    dp = [[False]*(n+1) for _ in range(m+1)]
    for i in range(m+1):
        dp[i][0] = i == 0
        for j in range(1, n+1):
            if p[j-1] == '*':
                dp[i][j] = dp[i][j-2] or (i > 0 and p[j-2] in s[i-1]+'.' and dp[i-1][j])
            else:
                dp[i][j] = i > 0 and p[j-1] in s[i-1]+'.' and dp[i-1][j-1]
    return dp[-1][-1]
```

48 ms
