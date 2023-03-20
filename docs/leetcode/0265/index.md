# 0265：粉刷房子 II（★★★）


## 题目

假如有一排房子共有 n 幢，每个房子可以被粉刷成 k 种颜色中的一种。
房子粉刷成不同颜色的花费成本也是不同的。你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。

每个房子粉刷成不同颜色的花费以一个 n x k 的矩阵表示。
- 例如，costs[0][0] 表示第 0 幢房子粉刷成 0 号颜色的成本；
costs[1][2] 表示第 1 幢房子粉刷成 2 号颜色的成本，以此类推。

返回 粉刷完所有房子的最低成本 。

示例 1：

	输入: costs = [[1,5,3],[2,9,4]]
	输出: 5
	解释: 
	将房子 0 刷成 0 号颜色，房子 1 刷成 2 号颜色。花费: 1 + 4 = 5; 
	或者将 房子 0 刷成 2 号颜色，房子 1 刷成 0 号颜色。花费: 3 + 2 = 5. 

示例 2:

	输入: costs = [[1,3],[2,4]]
	输出: 5
 

提示：
- costs.length == n
- costs[i].length == k
- 1 <= n <= 100
- 2 <= k <= 20
- 1 <= costs[i][j] <= 20
 

进阶：您能否在 O(nk) 的时间复杂度下解决此问题？

## 分析

{{< lc "0256" >}} 升级版。同样令 dp[i][j] 代表第 i 个房子刷成 j 颜色时，前 i 个房子所需的最低成本，即可递推。

	dp[i][j] = costs[i][j]+min(dp[i-1][:j]+dp[i-1][j+1:])
	
注意令 left[j] 代表 min(dp[i-1][:j])，right[j] 代表 min(dp[i-1][j+1:])，
那么 left，right 数组可以一趟得到，即可优化时间为 O(N*K)。

因为 dp[i] 只依赖于 dp[i-1]，所以可以优化为一维数组。

## 解答

```python
def minCostII(self, costs: List[List[int]]) -> int:
    n, k = len(costs), len(costs[0])
    dp = [0]*k
    for row in costs:
        left = list(accumulate([inf]+dp[:-1], min))
        right = list(accumulate([inf]+dp[:0:-1], min))[::-1]
        dp = [x+min(l, r) for x,l,r in zip(row, left, right)]
    return min(dp)
```
52 ms

