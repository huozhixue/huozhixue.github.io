# 0265：粉刷房子 II（★★）


> <u>**[力扣第 265 题](https://leetcode.cn/problems/paint-house-ii/)**</u>

## 题目

<p>假如有一排房子共有 <code>n</code> 幢，每个房子可以被粉刷成 <code>k</code> 种颜色中的一种。房子粉刷成不同颜色的花费成本也是不同的。你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。</p>

<p>每个房子粉刷成不同颜色的花费以一个 <code>n x k</code> 的矩阵表示。</p>

<ul>
<li>例如，<code>costs[0][0]</code> 表示第 <code>0</code> 幢房子粉刷成 <code>0</code> 号颜色的成本；<code>costs[1][2]</code> 表示第 <code>1</code> 幢房子粉刷成 <code>2</code> 号颜色的成本，以此类推。</li>
</ul>

<p>返回 <em>粉刷完所有房子的最低成本</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入: </strong>costs = [[1,5,3],[2,9,4]]
<strong>输出: </strong>5
<strong>解释:
</strong>将房子 0 刷成 0 号颜色，房子 1 刷成 2 号颜色。花费: 1 + 4 = 5;
或者将 房子 0 刷成 2 号颜色，房子 1 刷成 0 号颜色。花费: 3 + 2 = 5. </pre>

<p><strong>示例 <strong>2:</strong></strong></p>

<pre>
<strong>输入:</strong> costs = [[1,3],[2,4]]
<strong>输出:</strong> 5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>costs.length == n</code></li>
<li><code>costs[i].length == k</code></li>
<li><code>1 &lt;= n &lt;= 100</code></li>
<li><code>2 &lt;= k &lt;= 20</code></li>
<li><code>1 &lt;= costs[i][j] &lt;= 20</code></li>
</ul>



<p><strong>进阶：</strong>您能否在 <code>O(nk)</code> 的时间复杂度下解决此问题？</p>


## 分析

- {{< lc "0256" >}} 升级版
- 按最后房子的颜色即可递推
- 相邻颜色不能相等，就保存前一个房子的最小值和次小值，选择即可

## 解答

```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        n, k = len(costs), len(costs[0])
        f = [0]*k
        for A in costs:
            m1,m2 = nsmallest(2,f)
            for j in range(k):
                f[j] = A[j] + (m2 if f[j]==m1 else m1)
        return min(f)
```
11 ms

