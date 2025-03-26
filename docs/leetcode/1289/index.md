# 1289：下降路径最小和  II（1697 分）


> <u>**[力扣第 15 场双周赛第 4 题](https://leetcode.cn/problems/minimum-falling-path-sum-ii/)**</u>

## 题目

<p>给你一个 <code>n x n</code> 整数矩阵 <code>grid</code> ，请你返回 <strong>非零偏移下降路径</strong> 数字和的最小值。</p>

<p><strong>非零偏移下降路径</strong> 定义为：从 <code>grid</code> 数组中的每一行选择一个数字，且按顺序选出来的数字中，相邻数字不在原数组的同一列。</p>



<p><strong class="example">示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/08/10/falling-grid.jpg" style="width: 244px; height: 245px;" /></p>

<pre>
<strong>输入：</strong>grid = [[1,2,3],[4,5,6],[7,8,9]]
<strong>输出：</strong>13
<strong>解释：</strong>
所有非零偏移下降路径包括：
[1,5,9], [1,5,7], [1,6,7], [1,6,8],
[2,4,8], [2,4,9], [2,6,7], [2,6,8],
[3,4,8], [3,4,9], [3,5,7], [3,5,9]
下降路径中数字和最小的是 [1,5,7] ，所以答案是 13 。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[7]]
<strong>输出：</strong>7
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == grid.length == grid[i].length</code></li>
<li><code>1 &lt;= n &lt;= 200</code></li>
<li><code>-99 &lt;= grid[i][j] &lt;= 99</code></li>
</ul>


**相似问题：**
- [0931：下降路径最小和（1573 分）](/leetcode/0931)


## 分析

- 令 f(i,j) 代表前 i 行且第 i 行选第 j 个数字时的最小和，递推即可
- 递推时可以发现，只需要上一轮的最大和次大值即可

## 解答


```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)
        f = [0]*n
        for row in grid:
            A = nsmallest(2,f)
            f = [x+(A[-1] if y==A[0] else A[0]) for x,y in zip(row,f)]
        return min(f)
```
15 ms
