# 0087：扰乱字符串（★★）


## 题目

给定一个字符串 s1，我们可以把它递归地分割成两个非空子字符串，从而将其表示为二叉树。

下图是字符串 s1 = "great" 的一种可能的表示形式。

		great
	   /    \
	  gr    eat
	 / \    /  \
	g   r  e   at
			   / \
			  a   t
		  
在扰乱这个字符串的过程中，我们可以挑选任何一个非叶节点，然后交换它的两个子节点。

例如，如果我们挑选非叶节点 "gr" ，交换它的两个子节点，将会产生扰乱字符串 "rgeat" 。

		rgeat
	   /    \
	  rg    eat
	 / \    /  \
	r   g  e   at
			   / \
			  a   t
			  
我们将 "rgeat” 称作 "great" 的一个扰乱字符串。

同样地，如果我们继续交换节点 "eat" 和 "at" 的子节点，将会产生另一个新的扰乱字符串 "rgtae" 。

		rgtae
	   /    \
	  rg    tae
	 / \    /  \
	r   g  ta  e
		   / \
		  t   a
	  
我们将 "rgtae” 称作 "great" 的一个扰乱字符串。

给出两个长度相等的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。


<!--more--> 

示例 1:

	输入: s1 = "great", s2 = "rgeat"
	输出: true
	
示例 2:

	输入: s1 = "abcde", s2 = "caebd"
	输出: false




## 分析

先考虑能否递归。假设 s2 是 s1 的扰乱字符串，对应的 s1 的第一个分割点在位置 i，那么有两种情况：

	位置 i 分割的两部分没有交换			则 s2[:i] 是 s1[:i] 的扰乱字符串，s2[i:] 是 s1[i:] 的扰乱字符串
	
	位置 i 分割开的两部分交换了			则 s2[:i] 是 s1[-i:] 的扰乱字符串，s2[i:] 是 s1[:-i] 的扰乱字符串

于是很容易写出递归解法。

## 解答

```python
@lru_cache(None)
def isScramble(self, s1: str, s2: str) -> bool:
	if s1 == s2:
		return True
	if Counter(s1) != Counter(s2):
		return False
	for i in range(1, len(s1)):
		if self.isScramble(s1[:i], s2[:i]) and self.isScramble(s1[i:], s2[i:]):
			return True
		if self.isScramble(s1[:i], s2[-i:]) and self.isScramble(s1[i:], s2[:-i]):
			return True
	return False
```

60 ms


## *附加

也可以改写成动态规划。令 dp[i][j][k] 代表 s2[i:i+k] 是否是 s1[j:j+k] 的扰乱字符串，状态转移方程为
	
	if k == 1:	dp[i][j][k] = (s2[i] == s1[j])
	else:		dp[i][j][k] = any((dp[i][j][x] and dp[i+x][j+x][k-x]) or 
								(dp[i][j+k-x][x] and dp[i+x][j][k-x]) for x in range(1, k))
							
```python
def isScramble(self, s1: str, s2: str) -> bool:
	n = len(s1)
	dp = [[[False]*(n+1) for _ in range(n)] for _ in range(n)]
	for k in range(1, n+1):
		for i in range(n-k+1):
			for j in range(n-k+1):
				if k == 1:
					dp[i][j][k] = (s2[i]==s1[j])
				else:
					for x in range(1, k):
						if (dp[i][j][x] and dp[i+x][j+x][k-x]) or (dp[i][j+k-x][x] and dp[i+x][j][k-x]):
							dp[i][j][k] = True
							break
	return dp[0][0][-1]
```

324 ms。因为有很多不必要的计算，速度还慢了很多
