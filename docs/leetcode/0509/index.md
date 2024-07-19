# 0509：斐波那契数


> <u>**[力扣第 509 题](https://leetcode.cn/problems/fibonacci-number/)**</u>

## 题目

<p><strong>斐波那契数</strong> （通常用 <code>F(n)</code> 表示）形成的序列称为 <strong>斐波那契数列</strong> 。该数列由 <code>0</code> 和 <code>1</code> 开始，后面的每一项数字都是前面两项数字的和。也就是：</p>

<pre>
F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n &gt; 1
</pre>

<p>给定 <code>n</code> ，请计算 <code>F(n)</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>1
<strong>解释：</strong>F(2) = F(1) + F(0) = 1 + 0 = 1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>2
<strong>解释：</strong>F(3) = F(2) + F(1) = 1 + 1 = 2
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 4
<strong>输出：</strong>3
<strong>解释：</strong>F(4) = F(3) + F(2) = 2 + 1 = 3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 30</code></li>
</ul>


**相似问题：**
- [0070：爬楼梯](/leetcode/0070)
- [0842：将数组拆分成斐波那契序列（1779 分）](/leetcode/0842)
- [0873：最长的斐波那契子序列的长度（1911 分）](/leetcode/0873)
- [1137：第 N 个泰波那契数（1142 分）](/leetcode/1137)


## 分析



递推即可。

## 解答

```python
class Solution:
    def fib(self, n: int) -> int:
        a,b = 0,1
        for _ in range(n):
            a,b = b,a+b
        return a
```
31 ms


## *附加

可以用矩阵快速幂优化时间。

```python
class Solution:
    def fib(self, n: int) -> int:
        import numpy as np
        dp = np.mat([[0],[1]])
        A = np.mat([[0,1],[1,1]])
        dp = pow(A,n)*dp
        return int(dp[0])
```
79 ms
