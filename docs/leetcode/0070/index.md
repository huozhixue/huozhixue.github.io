# 0070：爬楼梯


> <u>**[力扣第 70 题](https://leetcode.cn/problems/climbing-stairs/)**</u>

## 题目

<p>假设你正在爬楼梯。需要 <code>n</code> 阶你才能到达楼顶。</p>

<p>每次你可以爬 <code>1</code> 或 <code>2</code> 个台阶。你有多少种不同的方法可以爬到楼顶呢？</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>2
<strong>解释：</strong>有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>3
<strong>解释：</strong>有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 45</code></li>
</ul>


## 分析

- 经典 dp，dp[i]=dp[i-1]+dp[i-2]
- 还可以优化为两个变量

## 解答

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        a,b = 1,1
        for _ in range(n-1):
            a,b = b,a+b
        return b
```
41 ms


## *附加

这是固定的线性递推，可以用矩阵快速幂优化。

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        import numpy as np
        dp = np.mat([[1],[1]])
        A = np.mat([[0,1],[1,1]])
        dp = pow(A,n-1)*dp
        return int(dp[-1])
```
100 ms
