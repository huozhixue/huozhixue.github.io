# 0062：不同路径（★）


## 题目

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？


示例 1:

![img](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

	输入：m = 3, n = 7
	输出：28

示例 2：

    输入：m = 3, n = 2
    输出：3
    解释：
    从左上角开始，总共有 3 条路径可以到达右下角。
    1. 向右 -> 向下 -> 向下
    2. 向下 -> 向下 -> 向右
    3. 向下 -> 向右 -> 向下

示例 3：

    输入：m = 7, n = 3
    输出：28

示例 4：

    输入：m = 3, n = 3
    输出：6

提示：
- 1 <= m, n <= 100
- 题目数据保证答案小于等于 2 * 10^9

## 分析

### #1

要到达位置 (i, j)，只能从 (i-1, j) 或 (i, j-1) 到达，可以转为递归子问题。

显然有重复子问题，所以用动态规划。

```python
def uniquePaths(self, m: int, n: int) -> int:
    dp = [[0]*n for _ in range(m)]
    for i, j in product(range(m), range(n)):
        dp[i][j] = 1 if i==0 or j==0 else dp[i-1][j] + dp[i][j-1]
    return dp[-1][-1]
```
36 ms

### #2

dp[i][j] 只依赖于 dp[i-1][j] 和 dp[i][j-1]，可以优化为一维数组。

## 解答

```python
def uniquePaths(self, m: int, n: int) -> int:
    dp = [1] * n
    for _, j in product(range(1, m), range(1, n)):
        dp[j] += dp[j-1]
    return dp[-1]
```
32 ms

## *附加

还可以直接用排列组合解决：
- 机器人要到达右下角，要走 m+n-2 步，其中 m-1 步向下，n-1 步向右
- 路径一一对应于由 m-1 个'下'和 n-1 个'右'组成的序列
- 路径数即为 m+n-2 中选 m-1 个的方案数

```python
def uniquePaths(self, m: int, n: int) -> int:
	return comb(m+n-2, n-1)
```
32 ms
