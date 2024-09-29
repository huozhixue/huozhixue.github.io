# 0598：区间加法 II


> <u>**[力扣第 598 题](https://leetcode.cn/problems/range-addition-ii/)**</u>

## 题目

<p>给你一个 <code>m x n</code> 的矩阵 <code>M</code><strong> </strong>和一个操作数组 <code>op</code> 。矩阵初始化时所有的单元格都为 <code>0</code> 。<code>ops[i] = [ai, bi]</code> 意味着当所有的 <code>0 &lt;= x &lt; ai</code> 和 <code>0 &lt;= y &lt; bi</code> 时， <code>M[x][y]</code> 应该加 1。</p>

<p>在 <em>执行完所有操作后</em> ，计算并返回 <em>矩阵中最大整数的个数</em> 。</p>



<p><strong>示例 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/10/02/ex1.jpg" style="height: 176px; width: 750px;" /></p>

<pre>
<strong>输入:</strong> m = 3, n = 3，ops = [[2,2],[3,3]]
<strong>输出:</strong> 4
<strong>解释:</strong> M 中最大的整数是 2, 而且 M 中有4个值为2的元素。因此返回 4。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> m = 3, n = 3, ops = [[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3]]
<strong>输出:</strong> 4
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> m = 3, n = 3, ops = []
<strong>输出:</strong> 9
</pre>



<p><strong>提示:</strong></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>1 &lt;= m, n &lt;= 4 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= ops.length &lt;= 10<sup>4</sup></code></li>
<li><code>ops[i].length == 2</code></li>
<li><code>1 &lt;= a<sub>i</sub> &lt;= m</code></li>
<li><code>1 &lt;= b<sub>i</sub> &lt;= n</code></li>
</ul>


**相似问题：**
- [0370：区间加法](/leetcode/0370)
- [2718：查询后矩阵的和（1768 分）](/leetcode/2718)


## 分析

只需考虑所有操作的重复区域即可。

## 解答


```python
class Solution:
    def maxCount(self, m: int, n: int, ops: List[List[int]]) -> int:
        for a,b in ops:
            m,n = min(m,a),min(n,b)
        return m*n
```
43 ms
