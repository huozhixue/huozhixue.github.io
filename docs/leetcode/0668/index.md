# 0668：乘法表中第k小的数（★★）


> <u>**[力扣第 668 题](https://leetcode.cn/problems/kth-smallest-number-in-multiplication-table/)**</u>

## 题目

<p>几乎每一个人都用 <a href="https://baike.baidu.com/item/%E4%B9%98%E6%B3%95%E8%A1%A8">乘法表</a>。但是你能在乘法表中快速找到第 <code>k</code> 小的数字吗？</p>

<p>乘法表是大小为 <code>m x n</code> 的一个整数矩阵，其中 <code>mat[i][j] == i * j</code>（下标从 <strong>1</strong> 开始）。</p>

<p>给你三个整数 <code>m</code>、<code>n</code> 和 <code>k</code>，请你在大小为 <code>m x n</code> 的乘法表中，找出并返回第 <code>k</code> 小的数字。</p>

<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/02/multtable1-grid.jpg" style="width: 500px; height: 254px;" />
<pre>
<strong>输入：</strong>m = 3, n = 3, k = 5
<strong>输出：</strong>3
<strong>解释：</strong>第 5 小的数字是 3 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/02/multtable2-grid.jpg" style="width: 493px; height: 293px;" />
<pre>
<strong>输入：</strong>m = 2, n = 3, k = 6
<strong>输出：</strong>6
<strong>解释：</strong>第 6 小的数字是 6 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= m, n &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= k &lt;= m * n</code></li>
</ul>
</div>
</div>


**相似问题：**
- [0378：有序矩阵中第 K 小的元素](/leetcode/0378)
- [0719：找出第 K 小的数对距离](/leetcode/0719)
- [0786：第 K 个最小的质数分数（2168 分）](/leetcode/0786)
- [2604：吃掉所有谷子的最短时间](/leetcode/2604)
- [3116：单面值组合的第 K 小金额（2387 分）](/leetcode/3116)


## 分析

典型的二分问题，对于数字 x，计算表中 <=x 的个数即可。

## 解答


```python
class Solution:
    def findKthNumber(self, m: int, n: int, k: int) -> int:
        def cal(x):
            return sum(min(x//i,n) for i in range(1,m+1))
        return bisect_left(range(m*n),k,key=cal)
```
606 ms
