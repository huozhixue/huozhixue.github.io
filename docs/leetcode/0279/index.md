# 0279：完全平方数（★）


## 题目

你给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。
你需要让组成和的完全平方数的个数最少。

给你一个整数 n ，返回和为 n 的完全平方数的 最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。
例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

示例 1：

    输入：n = 12
    输出：3 
    解释：12 = 4 + 4 + 4

示例 2：
    
    输入：n = 13
    输出：2
    解释：13 = 4 + 9

提示：1 <= n <= 10^4

## 分析

典型的线性 dp，按分割递归即可。

## 解答

```python
def numSquares(self, n: int) -> int:
    dp = [0] * (n+1)
    for i in range(1, n+1):
        dp[i] = 1 + min(dp[i - j * j] for j in range(1, int(sqrt(i)) + 1))
    return dp[-1]
```
时间复杂度 $O(N*\sqrt N)$，1648 ms

## *附加

根据数学上的 
[四平方和定理](https://baike.baidu.com/item/%E5%9B%9B%E5%B9%B3%E6%96%B9%E5%92%8C%E5%AE%9A%E7%90%86)
，每个正整数均可表示为4个整数的平方和。

因此只需逐层遍历 i 个正整数平方的和，找到 n 即可。

```python
def numSquares(self, n: int) -> int:
    queue, vis = deque([(0, 0)]), {0}
    while True:
        u, step = queue.popleft()
        for j in range(1, int(sqrt(n-u))+1):
            v = u + j*j
            if v not in vis:
                if v == n:
                    return step+1
                vis.add(v)
                queue.append((v, step+1))
```
时间复杂度 $O(\sqrt N)$，192 ms

