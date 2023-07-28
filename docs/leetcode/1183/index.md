# 1183：矩阵中 1 的最大数量（★★★）


> <u>**[力扣第 8 场双周赛第 4 题](https://leetcode.cn/problems/maximum-number-of-ones/)**</u>

## 题目

<p>现在有一个尺寸为 <code>width * height</code> 的矩阵 <code>M</code>，矩阵中的每个单元格的值不是 <code>0</code> 就是 <code>1</code>。</p>

<p>而且矩阵 <code>M</code> 中每个大小为 <code>sideLength * sideLength</code> 的 <strong>正方形</strong> 子阵中，<code>1</code> 的数量不得超过 <code>maxOnes</code>。</p>

<p>请你设计一个算法，计算矩阵中最多可以有多少个 <code>1</code>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>width = 3, height = 3, sideLength = 2, maxOnes = 1
<strong>输出：</strong>4
<strong>解释：</strong>
题目要求：在一个 3*3 的矩阵中，每一个 2*2 的子阵中的 1 的数目不超过 1 个。
最好的解决方案中，矩阵 M 里最多可以有 4 个 1，如下所示：
[1,0,1]
[0,0,0]
[1,0,1]
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>width = 3, height = 3, sideLength = 2, maxOnes = 2
<strong>输出：</strong>6
<strong>解释：</strong>
[1,0,1]
[1,0,1]
[1,0,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= width, height &lt;= 100</code></li>
<li><code>1 &lt;= sideLength &lt;= width, height</code></li>
<li><code>0 &lt;= maxOnes &lt;= sideLength * sideLength</code></li>
</ul>


## 分析

将矩阵从左到右，从上到下划分为不相交的正方形子阵（最边上可能不完整）。先放的位置应该是尽可能多的分块都有的位置。

## 解答

```python
class Solution:
    def maximumNumberOfOnes(self, width: int, height: int, sideLength: int, maxOnes: int) -> int:
        n = sideLength
        res = []
        for i,j in product(range(n),range(n)):
            x = (width-i-1)//n+1
            y = (height-j-1)//n+1
            res.append(x*y)
        return sum(nlargest(maxOnes,res))
```
56 ms
