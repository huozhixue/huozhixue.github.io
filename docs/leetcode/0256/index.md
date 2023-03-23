# 0256：粉刷房子（★）


> <u>**[力扣第 256 题](https://leetcode.cn/problems/paint-house/)**</u>

## 题目

<p>假如有一排房子，共 <code>n</code> 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。</p>

<p>当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 <code>n x 3</code><em> </em>的正整数矩阵 <code>costs</code> 来表示的。</p>

<p>例如，<code>costs[0][0]</code> 表示第 0 号房子粉刷成红色的成本花费；<code>costs[1][2]</code> 表示第 1 号房子粉刷成绿色的花费，以此类推。</p>

<p>请计算出粉刷完所有房子最少的花费成本。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入: </strong>costs = [[17,2,17],[16,16,5],[14,3,19]]
<strong>输出: </strong>10
<strong>解释: </strong>将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色<strong>。</strong>
最少花费: 2 + 5 + 3 = 10。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入: </strong>costs = [[7,6,2]]
<strong>输出: 2</strong>
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>costs.length == n</code></li>
<li><code>costs[i].length == 3</code></li>
<li><code>1 <= n <= 100</code></li>
<li><code>1 <= costs[i][j] <= 20</code></li>
</ul>


## 分析

可以令 dp[i][j] 代表第 i 个房子刷成 j 颜色时，前 i 个房子所需的最低成本，即可递推。

因为 dp[i] 只依赖于 dp[i-1]，所以可以优化为三个参数。

## 解答

```python
def minCost(self, costs: List[List[int]]) -> int:
    a, b, c = 0, 0, 0
    for x,y,z in costs:
        a, b, c = x+min(b,c), y+min(a,c), z+min(a,b)
    return min(a,b,c)
```
40 ms
