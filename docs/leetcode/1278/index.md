# 1278：分割回文串 III（★★）


> <u>**[力扣第 165 场周赛第 4 题](https://leetcode.cn/problems/palindrome-partitioning-iii/)**</u>

## 题目

<p>给你一个由小写字母组成的字符串 <code>s</code>，和一个整数 <code>k</code>。</p>

<p>请你按下面的要求分割字符串：</p>

<ul>
<li>首先，你可以将 <code>s</code> 中的部分字符修改为其他的小写英文字母。</li>
<li>接着，你需要把 <code>s</code> 分割成 <code>k</code> 个非空且不相交的子串，并且每个子串都是回文串。</li>
</ul>

<p>请返回以这种方式分割字符串所需修改的最少字符数。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>s = &quot;abc&quot;, k = 2
<strong>输出：</strong>1
<strong>解释：</strong>你可以把字符串分割成 &quot;ab&quot; 和 &quot;c&quot;，并修改 &quot;ab&quot; 中的 1 个字符，将它变成回文串。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>s = &quot;aabbc&quot;, k = 3
<strong>输出：</strong>0
<strong>解释：</strong>你可以把字符串分割成 &quot;aa&quot;、&quot;bb&quot; 和 &quot;c&quot;，它们都是回文串。</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>s = &quot;leetcode&quot;, k = 8
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= s.length &lt;= 100</code></li>
<li><code>s</code> 中只含有小写英文字母。</li>
</ul>


## 分析

### #1

和系列的前两题相比，不能遍历前缀回文子串了，只能遍历每一个位置，但还是能用递归。

对每个位置 i ，分别计算 s[:i] 变成回文的最少修改数、s[i:] 分割 k-1 个回文子串的最少修改数，取和的最小值即可。

```python
@lru_cache(None)
def palindromePartition(self, s: str, k: int) -> int:
	cost = lambda s: sum(s[i] != s[-1-i] for i in range(len(s)//2))
	if k == 1 or len(s) == 1:
		return cost(s)
	return min(cost(s[:i+1]) + self.palindromePartition(s[i+1:], k-1) for i in range(len(s)-1))
```

956 ms，空间占得较多

### #2

可以改写成动态规划了。用 dp[i][k] 表示 s 的后缀子串 s[i:] 分成 k 个回文子串的最少分割数，状态转移方程为：
	
	if k==1: 		dp[i][k] = cost(s[i:])
	elif n-i<k: 	dp[i][k] = float('inf')
	else: 			dp[i][k] = min(cost(s[i:j+1])+dp[j+1][k-1] for j in range(i, n-k+1))

```python
def palindromePartition(self, s: str, k: int) -> int:
	cost = lambda s: sum(s[i] != s[-1-i] for i in range(len(s)//2))
	n = len(s)
	dp = [[float('inf')]*(k+1) for _ in range(n)]
	for i in range(n-1, -1, -1):
		dp[i][1] = cost(s[i:])
		for K in range(2, k+1):
			for j in range(i, n-K+1):
				dp[i][K] = min(dp[i][K], cost(s[i:j+1])+dp[j+1][K-1])
	return dp[0][k]
```

时间复杂度 O(N^3*k)，980 ms

### #3

可以预先保存 s 所有子串的 cost 值，节省时间。

```python
def palindromePartition(self, s: str, k: int) -> int:
	cost = lambda s: sum(s[i] != s[-1-i] for i in range(len(s)//2))
	n = len(s)
	costs = [[cost(s[l:r+1]) for r in range(n)] for l in range(n)]
	dp = [[float('inf')]*(k+1) for _ in range(n)]
	for i in range(n-1, -1, -1):
		dp[i][1] = costs[i][n-1]
		for K in range(2, k+1):
			for j in range(i, n-K+1):
				dp[i][K] = min(dp[i][K], costs[i][j]+dp[j+1][K-1])
	return dp[0][k]
```

时间复杂度 O(N^3)，196 ms

### #4

cost 的计算也可以用动态规划，状态转移方程为：
	
	if l>=r:			costs[l][r] = 0
	elif s[l]==s[r]:	costs[l][r] = costs[l+1][r-1]
	else:				osts[l][r] = costs[l+1][r-1] + 1

## 解答

```python
def palindromePartition(self, s: str, k: int) -> int:
	n = len(s)
	costs = [[0]*n for _ in range(n)]
	for span in range(1, n):
		for l in range(n-span):
			r = l+span
			costs[l][r] = costs[l+1][r-1]+(0 if s[l]==s[r] else 1)
	dp = [[float('inf')]*(k+1) for _ in range(n)]
	for i in range(n-1, -1, -1):
		dp[i][1] = costs[i][n-1]
		for K in range(2, k+1):
			for j in range(i, n-K+1):
				dp[i][K] = min(dp[i][K], costs[i][j]+dp[j+1][K-1])
	return dp[0][k]
```

时间复杂度 O(N^2*k)，152 ms


