# 0204：计数质数（★★★★）


## 题目

统计所有小于非负整数 n 的质数的数量。

 <!--more--> 

示例 1：

	输入：n = 10
	输出：4
	解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。

示例 2：

	输入：n = 0
	输出：0

示例 3：

	输入：n = 1
	输出：0


## 分析

### #1

最直接的就是判断每一个数是否是质数。因为只有 2 是偶数质数，所以可以优化一下，只考虑奇数和奇因数。

```python
def countPrimes(self, n: int) -> int:
	def isPrime(n):
		return all(n%i != 0 for i in range(3, int(sqrt(n))+1, 2))
	
	return int(n>2) + sum(isPrime(i) for i in range(3, n, 2))
```

9052 ms，勉强 AC

### #2

本题有个经典的埃氏筛法。当遍历到质数 x ，可以将之后以 x 为因数的合数都标记。那么整个遍历过程中，遇到的没标记的数就是质数。

```python
def countPrimes(self, n: int) -> int:
	flags = [0] * 2 + [1] * (n-2)
	for i in range(2, int(sqrt(n))+1):
		if flags[i]:
			flags[i*i:n:i] = [0] * ((n-1-i*i)//i + 1)
	return sum(flags)
```

112 ms

### #3

基于埃氏筛法还有个很巧妙的动态规划方法。

令 dp[p][v] 代表埃氏筛法遍历到数 p 时还剩下的 [2, v] 范围内的整数个数。dp[p][v] 等价于 (<= v 的质数个数) + (<= v 且最小素因数 > p 的合数个数)。
本题所求的即是 dp[int(sqrt(n-1))][n-1]。

如果 p*p > v 或者 p 是合数，p 都筛不到数，那么 dp[p][v] = dp[p-1][v]。
	
如果 p*p <= v 且 p 是质数:	

	对于 p 能筛掉的任意合数 y，其最小素因数是 p，y/p 是最小素因数 >= p 的数。
	
	因此 y/p 的个数等价于 	(<= v//p 且最小素因数 > p-1 的合数个数) + (<= v//p 且 >= p 的质数个数)
						  =	dp[p-1][v//p] - (< p 的质数个数)
						  = dp[p-1][v//p]  - dp[p-1][p-1]
	
	故 p 能筛掉的合数个数为 dp[p-1][v//p]  - dp[p-1][p-1]
	
	所以 dp[p][v] = dp[p-1][v] - dp[p-1][v//p] + dp[p-1][p-1]
	
另外，p 是合数等价于 dp[p][p]==dp[p-1][p-1]，因此状态转移方程为：

	if p==1:									dp[p][v] = v - 1
	elif p*p > v or dp[p][p]==dp[p-1][p-1]:		dp[p][v] = dp[p-1][v]
	else:										dp[p][v] = dp[p-1][v] - dp[p-1][v//p] + dp[p-1][p-1]
	
注意到递推过程中和某个 v 相关的 v' 必然是 v//a 形式，因此本题只需要递推 (n-1)//a 形式的 v 即可。

```python
def countPrimes(self, n: int) -> int:
	if n < 3:
		return 0
	n -= 1
	r = int(n**0.5)
	V = list(range(1, n//r)) + [n//a for a in range(r, 0, -1)]
	dp = [{} for _ in range(r+1)]
	for p in range(1, r+1):
		for v in V:
			if p==1:
				dp[p][v] = v-1
			elif p*p > v or dp[p][p] == dp[p-1][p-1]:
				dp[p][v] = dp[p-1][v]
			else:
				dp[p][v] = dp[p-1][v] - dp[p-1][v//p] + dp[p-1][p-1]
	return dp[r][n]
```

944 ms

### #4

注意到 p 是合数其实也等价于 dp[p-1][p]==dp[p-1][p-1]（如果 1 到 p-1 都没筛掉 p，p 必然是质数）。
而当 p*p <= v 时，必然有 p、p-1、v//p 都小于 v。

因此反向遍历 v，即可将 dp 优化为一维数组。
 
## 解答

```python
def countPrimes(self, n: int) -> int:
	if n < 3:
		return 0
	n -= 1
	r = int(n**0.5)
	V = [n//a for a in range(1, r)] + list(range(n//r, 0, -1))
	dp = {v: v-1 for v in V}
	for p in range(2, r+1):
		for v in V:
			if dp[p] == dp[p-1] or p*p > v:
				break
			dp[v] += -dp[v//p] + dp[p-1]
	return dp[n]
```

48 ms
