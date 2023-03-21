# 0096：不同的二叉搜索树（★）


> <u>**[力扣第 96 题](https://leetcode.cn/problems/unique-binary-search-trees/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，求恰由 <code>n</code> 个节点组成且节点值从 <code>1</code> 到 <code>n</code> 互不相同的 <strong>二叉搜索树</strong> 有多少种？返回满足题意的二叉搜索树的种数。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg" style="width: 600px; height: 148px;" />
<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>5
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 19</code></li>
</ul>


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

