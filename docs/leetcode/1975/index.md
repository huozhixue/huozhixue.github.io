# 1975：最大方阵和（1648 分）


> <u>**[力扣第 59 场双周赛第 2 题](https://leetcode.cn/problems/maximum-matrix-sum/)**</u>

## 题目

<p>给你一个 <code>n x n</code> 的整数方阵 <code>matrix</code> 。你可以执行以下操作 <strong>任意次</strong> ：</p>

<ul>
<li>选择 <code>matrix</code> 中 <strong>相邻</strong> 两个元素，并将它们都 <strong>乘以</strong> <code>-1</code> 。</li>
</ul>

<p>如果两个元素有 <strong>公共边</strong> ，那么它们就是 <strong>相邻</strong> 的。</p>

<p>你的目的是 <strong>最大化</strong> 方阵元素的和。请你在执行以上操作之后，返回方阵的 <strong>最大</strong> 和。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/16/pc79-q2ex1.png" style="width: 401px; height: 81px;">
<pre><b>输入：</b>matrix = [[1,-1],[-1,1]]
<b>输出：</b>4
<b>解释：</b>我们可以执行以下操作使和等于 4 ：
- 将第一行的 2 个元素乘以 -1 。
- 将第一列的 2 个元素乘以 -1 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/16/pc79-q2ex2.png" style="width: 321px; height: 121px;">
<pre><b>输入：</b>matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
<b>输出：</b>16
<b>解释：</b>我们可以执行以下操作使和等于 16 ：
- 将第二行的最后 2 个元素乘以 -1 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == matrix.length == matrix[i].length</code></li>
<li><code>2 &lt;= n &lt;= 250</code></li>
<li><code>-10<sup>5</sup> &lt;= matrix[i][j] &lt;= 10<sup>5</sup></code></li>
</ul>




## 分析

- 通过多次操作可以等价于将任意两个数同时乘以 -1
- 因此统计负数个数，若偶数个，可以全部转正
- 若奇数个，可以选一个绝对值最小的数作为唯一的负数

## 解答

```python []
class Solution:
    def maxMatrixSum(self, matrix: List[List[int]]) -> int:
        A = [abs(x) for row in matrix for x in row]
        c = sum(x<0 for row in matrix for x in row)
        if c%2==0:
            return sum(A)
        return sum(A)-min(A)*2
```
49 ms

