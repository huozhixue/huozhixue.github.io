# 0264：丑数 II（★★★）


## 题目

给你一个整数 n ，请你找出并返回第 n 个 丑数 。

丑数 就是只包含质因数 2、3 和/或 5 的正整数。
 
示例 1：

    输入：n = 10
    输出：12
    解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。

示例 2：

    输入：n = 1
    输出：1
    解释：1 通常被视为丑数。
	
提示：1 <= n <= 1690
     
## 分析

{{< lc "0263" >}} 升级版，有个巧妙的 dp 方法。

显然后面的丑数必然是前面的某个丑数乘 2/3/5 得到。令 dp[n] 代表第 n 个丑数，那么：

    dp[n]=min(dp[j]*p for j in range(n) for p in [2,3,5] if dp[j]*p>dp[n-1])
    
> 观察发现，对于 p=2/3/5，只需要考虑第一个使得 dp[j]*p>dp[n-1] 的 j。

于是用 A[p] 维护第一个使得 dp[j]*p>dp[n-1] 的 j，递推式转为：

    dp[n]=min(dp[A[p]]*p for p in [2,3,5])
    
维护 A[p] 很简单，当 dp[A[p]]*p==dp[n] 时，将 A[p] 增 1 即可。

## 解答

```python
def nthUglyNumber(self, n: int) -> int:
    dp, A = [1] * n, defaultdict(int)
    for i in range(1, n):
        dp[i] = min(dp[A[p]]*p for p in [2,3,5])
        for p in [2,3,5]:
            if dp[A[p]]*p == dp[i]:
                A[p] += 1
    return dp[-1]
```
时间复杂度 O(N)，224 ms

