# 0063：不同路径 II（★）


> <u>**[力扣第 63 题](https://leetcode.cn/problems/unique-paths-ii/)**</u>

## 题目

<p>一个机器人位于一个<meta charset="UTF-8" /> <code>m x n</code> 网格的左上角 （起始点在下图中标记为 “Start” ）。</p>

<p>机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。</p>

<p>现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？</p>

<p>网格中的障碍物和空位置分别用 <code>1</code> 和 <code>0</code> 来表示。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg" />
<pre>
<strong>输入：</strong>obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
<strong>输出：</strong>2
<strong>解释：</strong>3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 <code>2</code> 条不同的路径：
1. 向右 -&gt; 向右 -&gt; 向下 -&gt; 向下
2. 向下 -&gt; 向下 -&gt; 向右 -&gt; 向右
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg" />
<pre>
<strong>输入：</strong>obstacleGrid = [[0,1],[0,0]]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == obstacleGrid.length</code></li>
<li><code>n == obstacleGrid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 100</code></li>
<li><code>obstacleGrid[i][j]</code> 为 <code>0</code> 或 <code>1</code></li>
</ul>


## 分析

{{< lc "0062">}} 进阶版，障碍处不计算即可。

## 解答

```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m,n = len(obstacleGrid),len(obstacleGrid[0])
        dp = [[0]*(n+1) for _ in range(m+1)]
        dp[0][1] = 1
        for i in range(1,m+1):
            for j in range(1,n+1):
                if not obstacleGrid[i-1][j-1]:
                    dp[i][j] = dp[i-1][j]+dp[i][j-1] 
        return dp[-1][-1]
```
33 ms
