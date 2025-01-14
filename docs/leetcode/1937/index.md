# 1937：扣分后的最大得分（2105 分）


> <u>**[力扣第 250 场周赛第 3 题](https://leetcode.cn/problems/maximum-number-of-points-with-cost/)**</u>

## 题目

<p>给你一个 <code>m x n</code> 的整数矩阵 <code>points</code> （下标从 <strong>0</strong> 开始）。一开始你的得分为 <code>0</code> ，你想最大化从矩阵中得到的分数。</p>

<p>你的得分方式为：<strong>每一行</strong> 中选取一个格子，选中坐标为 <code>(r, c)</code> 的格子会给你的总得分 <strong>增加</strong> <code>points[r][c]</code> 。</p>

<p>然而，相邻行之间被选中的格子如果隔得太远，你会失去一些得分。对于相邻行 <code>r</code> 和 <code>r + 1</code> （其中 <code>0 <= r < m - 1</code>），选中坐标为 <code>(r, c<sub>1</sub>)</code> 和 <code>(r + 1, c<sub>2</sub>)</code> 的格子，你的总得分 <b>减少</b> <code>abs(c<sub>1</sub> - c<sub>2</sub>)</code> 。</p>

<p>请你返回你能得到的 <strong>最大</strong> 得分。</p>

<p><code>abs(x)</code> 定义为：</p>

<ul>
<li>如果 <code>x >= 0</code> ，那么值为 <code>x</code> 。</li>
<li>如果 <code>x < 0</code> ，那么值为 <code>-x</code> 。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/12/screenshot-2021-07-12-at-13-40-26-diagram-drawio-diagrams-net.png" style="width: 300px; height: 300px;" />
<pre>
<b>输入：</b>points = [[1,2,3],[1,5,1],[3,1,1]]
<b>输出：</b>9
<strong>解释：</strong>
蓝色格子是最优方案选中的格子，坐标分别为 (0, 2)，(1, 1) 和 (2, 0) 。
你的总得分增加 3 + 5 + 3 = 11 。
但是你的总得分需要扣除 abs(2 - 1) + abs(1 - 0) = 2 。
你的最终得分为 11 - 2 = 9 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/12/screenshot-2021-07-12-at-13-42-14-diagram-drawio-diagrams-net.png" style="width: 200px; height: 299px;" />
<pre>
<b>输入：</b>points = [[1,5],[2,3],[4,2]]
<b>输出：</b>11
<strong>解释：</strong>
蓝色格子是最优方案选中的格子，坐标分别为 (0, 1)，(1, 1) 和 (2, 0) 。
你的总得分增加 5 + 3 + 4 = 12 。
但是你的总得分需要扣除 abs(1 - 1) + abs(1 - 0) = 1 。
你的最终得分为 12 - 1 = 11 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == points.length</code></li>
<li><code>n == points[r].length</code></li>
<li><code>1 <= m, n <= 10<sup>5</sup></code></li>
<li><code>1 <= m * n <= 10<sup>5</sup></code></li>
<li><code>0 <= points[r][c] <= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0064：最小路径和](/leetcode/0064)
- [1981：最小化目标值与所选元素的差（2009 分）](/leetcode/1981)


## 分析

- 令 f[i][j] 代表前 i 行中，第 i 行选第 j 个格子的最大分，即得递推式
	- f[i][j] = points[i][j]+max(f[i-1][k]-|k-j|)
- 拆掉绝对值，即是要求
	- points[i][j]-j+max(f[i-1][k]+k)，k<=j
	- points[i][j]+j+max(f[i-1][k]-k)，k>=j
- 显然可以预处理前/后缀最值，即可 O(1) 转移

## 解答


```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        m,n = len(points),len(points[0])
        f = [0]*n
        for row in points:
            L = list(accumulate([f[k]+k for k in range(n)],max))
            R = list(accumulate([f[k]-k for k in range(n-1,-1,-1)],max))[::-1]
            for j,x in enumerate(row):
                f[j] = x+max(L[j]-j,R[j]+j)
        return max(f)
```
578 ms
