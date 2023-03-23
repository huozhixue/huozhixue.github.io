# 0276：栅栏涂色（★）


> <u>**[力扣第 276 题](https://leetcode.cn/problems/paint-fence/)**</u>

## 题目

<p>有 <code>k</code> 种颜色的涂料和一个包含 <code>n</code> 个栅栏柱的栅栏，请你按下述规则为栅栏设计涂色方案：</p>

<ul>
<li>每个栅栏柱可以用其中 <strong>一种</strong> 颜色进行上色。</li>
<li>相邻的栅栏柱 <strong>最多连续两个 </strong>颜色相同。</li>
</ul>

<p>给你两个整数 <code>k</code> 和 <code>n</code> ，返回所有有效的涂色 <strong>方案数</strong> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/28/paintfenceex1.png" style="width: 507px; height: 313px;" />
<pre>
<strong>输入：</strong>n = 3, k = 2
<strong>输出：</strong>6
<strong>解释：</strong>所有的可能涂色方案如上图所示。注意，全涂红或者全涂绿的方案属于无效方案，因为相邻的栅栏柱 <strong>最多连续两个 </strong>颜色相同。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1, k = 1
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 7, k = 2
<strong>输出：</strong>42
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 50</code></li>
<li><code>1 <= k <= 10<sup>5</sup></code></li>
<li>题目数据保证：对于输入的 <code>n</code> 和 <code>k</code> ，其答案在范围 <code>[0, 2<sup>31</sup> - 1]</code> 内</li>
</ul>


## 分析

典型的 dp，令 dp[i][0] 代表前 i 个栅栏最后两个不连续的涂色方案数，
dp[i][1] 代表前 i 个栅栏最后两个连续的涂色方案数，即可递归。

因为 dp[i] 只依赖于 dp[i-1]，所以可以优化为两个参数。

## 解答

```python
def numWays(self, n: int, k: int) -> int:
    a, b = k, 0
    for _ in range(n-1):
        a, b = (k-1)*(a+b), a
    return a+b
```
36 ms

## *附加

这是完全的线性递推关系，因此可以用矩阵快速幂优化。

```python
def numWays(self, n: int, k: int) -> int:
    import numpy as np
    A = np.mat([[k-1,k-1],[1,0]])
    dp = np.mat([[k],[0]])
    dp = pow(A, n-1)*dp
    return int(sum(dp))
```
96 ms

