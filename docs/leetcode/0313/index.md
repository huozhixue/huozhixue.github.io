# 0313：超级丑数（★★★）


## 题目

超级丑数 是一个正整数，并满足其所有质因数都出现在质数数组 primes 中。

给你一个整数 n 和一个整数数组 primes ，返回第 n 个 超级丑数 。

题目数据保证第 n 个 超级丑数 在 32-bit 带符号整数范围内。

 

示例 1：

    输入：n = 12, primes = [2,7,13,19]
    输出：32 
    解释：给定长度为 4 的质数数组 primes = [2,7,13,19]，前 12 个超级丑数序列为：
    [1,2,4,7,8,13,14,16,19,26,28,32] 。

示例 2：

    输入：n = 1, primes = [2,3,5]
    输出：1
    解释：1 不含质因数，因此它的所有质因数都在质数数组 primes = [2,3,5] 中。
 
提示：
- 1 <= n <= 10^6
- 1 <= primes.length <= 100
- 2 <= primes[i] <= 1000
- 题目数据 保证 primes[i] 是一个质数
- primes 中的所有值都 互不相同 ，且按 递增顺序 排列 

## 分析

### #1

类似 {{< lc "0264" >}}，只不过质数数组不固定了。

```python
def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
    dp, A = [1] * n, defaultdict(int)
    for i in range(1, n):
        dp[i] = min(dp[A[p]] * p for p in primes)
        for p in primes:
            if dp[A[p]] * p == dp[i]:
                A[p] += 1
    return dp[-1]
```

时间复杂度 O(N*M)，超时了

### #2

注意到每次是取最小的 dp[A[p]]*p，想到可以用堆来维护 <dp[A[p]]*p, A[p], p> 三元组，可以快速获得最小值。

## 解答

```python
def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
    dp = [1] * n
    pq = [(p, 0, p) for p in primes]
    for i in range(1, n):
        dp[i] = pq[0][0]
        while pq and pq[0][0] == dp[i]:
            _, idx, p = heappop(pq)
            heappush(pq, (dp[idx+1] * p, idx+1, p))
    return dp[-1]
```
时间复杂度 O(N*logM)，2548 ms

