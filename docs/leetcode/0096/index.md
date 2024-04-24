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

{{< lc "0095" >}}  变型，本题只需要计算数量，可以用 dp。

## 解答

```python
class Solution:
    def numTrees(self, n: int) -> int:
        dp = [1]*(n+1)
        for i in range(1,n+1):
            dp[i] = sum(dp[j-1]*dp[i-j] for j in range(1,i+1))
        return dp[-1]
```
29 ms

## *附加

这个递推式得到的 dp[n] 在数学上被称为卡塔兰数，有个更简单的表达式：

$$dp[n] = {(2n)! \over (n!*(n+1)!)} $$


```python
class Solution:
    def numTrees(self, n: int) -> int:
        return comb(2*n,n)//(n+1)
```
37 ms

