# 0044：通配符匹配（★★★）


## 题目

给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

- '?' 可以匹配任何单个字符。
- '*' 可以匹配任意字符串（包括空字符串）。
- 两个字符串完全匹配才算匹配成功。
- s 可能为空，且只包含从 a-z 的小写字母。
- p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。

<!--more--> 

示例 1:

	输入:
	s = "aa"
	p = "a"
	输出: false
	解释: "a" 无法匹配 "aa" 整个字符串。

示例 2:

	输入:
	s = "aa"
	p = "*"
	输出: true
	解释: '*' 可以匹配任意字符串。

示例 3:

	输入:
	s = "cb"
	p = "?a"
	输出: false
	解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。

示例 4:

	输入:
	s = "adceb"
	p = "*a*b"
	输出: true
	解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".

示例 5:

	输入:
	s = "acdcb"
	p = "a*c?b"
	输出: false
	
## 分析

### #1

类似 0010 ，但星号的功能变得很强了，因此单独考虑星号的情况。

	如果 p 的最后一位是 '*' ，	若 '*'匹配零个元素，转为 isMatch(p[:-1], s)
								若 '*'匹配多个元素，转为 isMatch(p, s[:-1])

	若 p 的最后一位不是 '*'		转为 p[-1] in s[-1]+'?' and isMatch(p[:-1], s[:-1])


再考虑下边界情况，就可以写出递归代码。

```python
@lru_cache(None)
def isMatch(self, s: str, p: str) -> bool:
	if not p and not s:
		return True
	if not p:
		return False
	if p[-1] == '*':
		return self.isMatch(s, p[:-1]) or (s!='' and self.isMatch(s[:-1], p))
	if s and p[-1] in s[-1]+'?':
		return self.isMatch(s[:-1], p[:-1])
	return False
```

超时了

### #2

改写成动态规划，用 dp[i][j] 表示 s[:i] 和 p[:j] 是否匹配，状态转移方程为：
	
	if i==j==0: 		dp[i][j] = True
	elif j==0: 			dp[i][j] = False
	elif p[j-1]=='*': 	dp[i][j] = dp[i][j-1] or (i>0 and dp[i-1][j])
	else: 				dp[i][j] = i>0 and p[j-1] in s[i-1]+'?' and dp[i-1][j-1]
	
```python
def isMatch(self, s: str, p: str) -> bool:
	m, n = len(s), len(p)
	dp = [[False]*(n+1) for _ in range(m+1)]
	dp[0][0] = True
	for i in range(m+1):
		for j in range(1, n+1):
			if p[j-1] == '*':
				dp[i][j] = dp[i][j-1] or (i>0 and dp[i-1][j])
			else:
				dp[i][j] = i>0 and p[j-1] in s[i-1]+'?' and dp[i-1][j-1]
	return dp[-1][-1]
```

时间复杂度 O(M*N)，792 ms

### #3

本题还有个巧妙的解法。显然 p 中连续多个星号等价于一个星号，因此 p 可以表示为：

	··· * p1 * p2 * p3 * ···
	
p 能匹配的就是依次出现 p1、p2、p3、... 的字符串，因此只需要在 s 里依次找 p1、p2、p3、... 即可。
特别的，如果 p 不以星号开头，即 p1 前面没有星号，那 s 必须以 p1 开头才能匹配；结尾同理。
而如果 p 一个星号都没有，则 s 必须一一匹配 p。

具体代码实现，有一种巧妙的双指针方法。令指针 i，j 分别指向 s、p 开头，然后循环操作：
	
	if j<len(p) and p[j]=='*':				先当作匹配零个元素，记录下当前状态 (iStar=i, jStar=j)，j 右移一步
	
	elif j<len(p) and p[j] in s[i]+'?':		i、j 都右移一步
	
	elif 记录过状态 (iStar, jstar):			回到上一个状态并更新 iStar+= 1，等价于把这里的 '*' 匹配的元素长度加 1
											然后 i、j 从新状态开始 i=iStar，j=jStar，j 右移一步
										
	else:									不可能匹配了，直接返回 False

如果 i 溢出，即说明当前的 p[:j] 能匹配 s，那么只要 p 剩下的元素都是 '*' 即可。


## 解答

```python
def isMatch(self, s: str, p: str) -> bool:
	m, n, i, j, iStar, jStar = len(s), len(p), 0, 0, None, None
	while i < m:
		if j < n and p[j] == '*':
			iStar, jStar = i, j
			j += 1
		elif j < n and p[j] in s[i]+'?':
			i += 1
			j += 1
		elif jStar != None:
			iStar += 1
			i, j = iStar, jStar + 1
		else:
			return False
	return all(x == '*' for x in p[j:])
```

时间复杂度 O(M*N)，48 ms
