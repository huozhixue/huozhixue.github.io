# 0441：排列硬币


> <u>**[力扣第 441 题](https://leetcode.cn/problems/arranging-coins/)**</u>

## 题目

<p>你总共有 <code>n</code><em> </em>枚硬币，并计划将它们按阶梯状排列。对于一个由 <code>k</code> 行组成的阶梯，其第 <code>i</code><em> </em>行必须正好有 <code>i</code><em> </em>枚硬币。阶梯的最后一行 <strong>可能</strong> 是不完整的。</p>

<p>给你一个数字 <code>n</code><em> </em>，计算并返回可形成 <strong>完整阶梯行</strong> 的总行数。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/09/arrangecoins1-grid.jpg" style="width: 253px; height: 253px;" />
<pre>
<strong>输入：</strong>n = 5
<strong>输出：</strong>2
<strong>解释：</strong>因为第三行不完整，所以返回 2 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/09/arrangecoins2-grid.jpg" style="width: 333px; height: 333px;" />
<pre>
<strong>输入：</strong>n = 8
<strong>输出：</strong>3
<strong>解释：</strong>因为第四行不完整，所以返回 3 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

二分查找最后一个满足 i*(i+1)//2<=n 的 i 即可。

## 解答


```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        return bisect_right(range(n+1),n,key=lambda i:i*(i+1)//2)-1
```
39 ms
