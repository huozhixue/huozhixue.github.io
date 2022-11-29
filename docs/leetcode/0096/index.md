# 0096：不同的二叉搜索树（★★）


## 题目

给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？
返回满足题意的二叉搜索树的种数。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg)

    输入：n = 3
    输出：5

示例 2：

    输入：n = 1
    输出：1

提示： 1 <= n <= 19

## 分析

按左右子树的节点数可以转为递归子问题。

显然有重复子问题，所以用动态规划。

## 解答

```python
def numTrees(self, n: int) -> int:
    dp = [1] * (n+1)
    for i in range(1, n+1):
        dp[i] = sum(dp[j]*dp[i-1-j] for j in range(i))
    return dp[-1]
```
36 ms

## *附加

这个递推式得到的 dp[n] 在数学上被称为卡塔兰数，有个更简单的表达式：

    dp[n] = (2n)!/(n!*(n+1)!)

```python
def numTrees(self, n: int) -> int:
    res = 1
    for i in range(1, n+1):
        res = res*(i+n)//i
    return res//(n+1)
```
32 ms

