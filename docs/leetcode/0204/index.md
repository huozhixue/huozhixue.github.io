# 0204：计数质数（★★★★★）


## 题目

给定整数 n ，返回 所有小于非负整数 n 的质数的数量 。


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
	 

提示：
- 0 <= n <= 5 * 10^6

 

## 分析

本题有个经典的埃氏筛法。当遍历到质数 x ，可以将之后以 x 为因数的合数都标记为 0。
那么整个遍历过程中，遇到的没标记的数就是质数。

## 解答

```python
def countPrimes(self, n: int) -> int:
    flags = [0] * 2 + [1] * (n - 2)
    for i in range(2, int(sqrt(n)) + 1):
        if flags[i]:
            flags[i*i:n:i] = [0] * ((n-1-i*i)//i+1)
    return sum(flags)
```
时间复杂度 O(N log N)，784 ms

## *附加

### #1

基于埃氏筛法还有个很巧妙的动态规划方法。

令 dp[p][v] 代表埃氏筛法遍历到数 p 时没有标记的 [2, v] 内的个数：
- 如果 p*p > v 或者 p 是合数: p 筛不到数，$dp[p][v] = dp[p-1][v]$。
- 如果 p*p <= v 且 p 是质数:	
	- p 能筛掉合数 C=p*x 当且仅当 x 的最小质因数大于等于 p
    
			因此 C 的个数 = x 的个数 = [p, v//p] 内最小质因数大于等于 p 的个数
						= 遍历到 p-1 时还没标记的 [p, v//p] 内的个数
						= dp[p-1][v//p] - dp[p-1][p-1]
    - 所以 $dp[p][v] = dp[p-1][v] - (dp[p-1][v//p] - dp[p-1][p-1])$
- 另外，p 是质数则不会被标记，可以用 $dp[p-1][p]>dp[p-1][p-1]$ 来判断
- 要求的即是 $dp[\lfloor \sqrt n \rfloor][n-1]$，可以递推得到

> 注意 dp[p][v] 只和 v'=v//x 形式的 v' 相关，不需要递推整个 [2, n-1] 范围。
>
> v' 的个数是 $O(\sqrt n)$，所以总的时间复杂度为 O(N)。

```python
def countPrimes(self, n: int) -> int:
    n -= 1
    if n < 2:
        return 0
    r = int(sqrt(n))
    V = list(range(1, n//r)) + [n//x for x in range(r, 0, -1)]
    dp = [{} for _ in range(r+1)]
    dp[1] = {v: v-1 for v in V}
    for p in range(2, r+1):
        for v in V:
            dp[p][v] = dp[p-1][v]
            if p*p <= v and dp[p-1][p]>dp[p-1][p-1]:
                dp[p][v] -= dp[p-1][v//p]-dp[p-1][p-1]
    return dp[r][n]
```
时间复杂度 O(N)，7548 ms

### #2

> 注意反向遍历 v 就可以优化为一维数组。
>
> 并且当 p*p > v 或者 p 是合数时，可以直接跳出遍历，极大地优化时间。
 
```python
def countPrimes(self, n: int) -> int:
    n -= 1
    if n < 2:
        return 0
    r = int(sqrt(n))
    V = [n//x for x in range(1, r)] + list(range(n//r, 0, -1))
    dp = {v: v-1 for v in V}
    for p in range(2, r+1):
        for v in V:
            if dp[p]==dp[p-1] or p*p>v:
                break
            dp[v] -= dp[v//p]-dp[p-1]
    return dp[n]
```
时间复杂度 O(N)，196 ms
