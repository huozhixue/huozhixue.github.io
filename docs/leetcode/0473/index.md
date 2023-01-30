# 0473：火柴拼正方形（★★★）


## 题目

你将得到一个整数数组 matchsticks ，其中 matchsticks[i] 是第 i 个火柴棒的长度。
你要用 所有的火柴棍 拼成一个正方形。你 不能折断 任何一根火柴棒，但你可以把它们连在一起，而且每根火柴棒必须 使用一次 。

如果你能使这个正方形，则返回 true ，否则返回 false 。

 

示例 1:

![img](https://assets.leetcode.com/uploads/2021/04/09/matchsticks1-grid.jpg)
    
    输入: matchsticks = [1,1,2,2,2]
    输出: true
    解释: 能拼成一个边长为2的正方形，每边两根火柴。
示例 2:

    输入: matchsticks = [3,3,3,3,4]
    输出: false
    解释: 不能用所有火柴拼成一个正方形。
     

提示:
- 1 <= matchsticks.length <= 15
- 1 <= matchsticks[i] <= 10^8



## 分析

为了方便，令 A=matchsticks，s=sum(A)。

显然当 s%4!=0 时非真。否则，要将 A 划分为四个和为 t=s//4 的子集。
- 暴力法就是遍历 A 的所有排列，判断是否能分割成功
- 假如排列的最后一个数是 x，那么只要 A-{x} 能组成 3 个和 t 的子集，即可成功
- 一般性地，令 dfs(B) 代表集合 B 能否组成 sum(B)//t 个和 t 的子集，尝试递推
- 从 B 中任选一个数 x，集合 C=B-x，只要 dfs(C) 为真且 x+sum(C)%t<=t，dfs(B) 即为真

为了方便，可以令 dfs(B) 返回 sum(B)%t，若集合 B 非真，则返回 -1。

同时，可以将集合状态压缩为一个数，方便递归。


## 解答

```python
def makesquare(self, matchsticks: List[int]) -> bool:
    s = sum(matchsticks)
    if s%4:
        return False
    A, n = matchsticks, len(matchsticks)
    dp = [0]+[-1]*((1<<n)-1)
    for st in range(1<<n):
        if dp[st]>=0:
            for i in range(n):
                if not st&(1<<i) and dp[st]+A[i]<=s//4:
                    dp[st|(1<<i)] = (dp[st]+A[i])%(s//4)
    return dp[-1]==0
```
2652 ms


