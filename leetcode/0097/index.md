# 0097：交错字符串（★★）


## 题目

给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。

两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：

- s = s1 + s2 + ... + sn
- t = t1 + t2 + ... + tm
- |n - m| <= 1
- 交错 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 + ...


<!--more--> 


示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/02/interleave.jpg)

	输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
	输出：true
	
示例 2：

	输入：s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
	输出：false
	
示例 3：

	输入：s1 = "", s2 = "", s3 = ""
	输出：true
	 

## 分析

### #1

先考虑递归。如果 s3 由 s1 和 s2 交错组成，则必然是两种情况之一：

	s3[0]==s1[0]		s3[1:] 由 s1[1:] 和 s2 交错而成
	
	s3[0]==s2[0]		s3[1:] 由 s1 和 s2[1:] 交错而成

再考虑下边界条件，就可以写出递归解法。

```python
@lru_cache(None)
def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
	if s1==s2==s3=='':
		return True
	if len(s3) != len(s1)+len(s2):
		return False
	if s1 and s3[0] == s1[0] and self.isInterleave(s1[1:], s2, s3[1:]):
		return True
	return s2 != '' and s3[0]==s2[0] and self.isInterleave(s1, s2[1:], s3[1:])
```

44 ms，空间占得较多

### #2

可以改写成动态规划。用 dp[i][j] 表示 s3[:i+j] 是否由 s1[:i] 和 s2[:j] 交错而成，那么状态转移方程为：

	if i==j==0:		dp[i][j] = True
	else:			dp[i][j] = (i and s3[i+j-1]==s1[i-1] and dp[i-1][j]) or (j and s3[i+j-1]==s2[j-1] and dp[i][j-1])

## 解答

```python
def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
	m, n = len(s1), len(s2)
	if len(s3) != m+n:
		return False
	dp = [[True]*(n+1) for _ in range(m+1)]
	for i in range(m+1):
		for j in range(n+1):
			if i or j:
				dp[i][j] = (i>0 and s3[i+j-1]==s1[i-1] and dp[i-1][j]) or (j>0 and s3[i+j-1]==s2[j-1] and dp[i][j-1])
	return dp[-1][-1]
```

时间复杂度 O(M*N)，48 ms

