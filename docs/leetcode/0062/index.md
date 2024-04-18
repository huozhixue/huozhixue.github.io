# 0062：不同路径（★）


> <u>**[力扣第 62 题](https://leetcode.cn/problems/unique-paths/)**</u>

## 题目

<p>一个机器人位于一个 <code>m x n</code><em> </em>网格的左上角 （起始点在下图中标记为 “Start” ）。</p>

<p>机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。</p>

<p>问总共有多少条不同的路径？</p>



<p><strong>示例 1：</strong></p>
<img src="https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png" />
<pre>
<strong>输入：</strong>m = 3, n = 7
<strong>输出：</strong>28</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>m = 3, n = 2
<strong>输出：</strong>3
<strong>解释：</strong>
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>m = 7, n = 3
<strong>输出：</strong>28
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>m = 3, n = 3
<strong>输出：</strong>6</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= m, n <= 100</code></li>
<li>题目数据保证答案小于等于 <code>2 * 10<sup>9</sup></code></li>
</ul>


## 分析

### #1

典型的二维 dp，为了方便，可以增加一行一列作为哨兵。

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[0]*(n+1) for _ in range(m+1)]
        dp[0][1]=1
        for i in range(1,m+1):
            for j in range(1,n+1):
                dp[i][j] = dp[i-1][j]+dp[i][j-1]
        return dp[-1][-1]
```
35 ms

### #2

dp[i][j] 只依赖于 dp[i-1][j] 和 dp[i][j-1]，可以优化为一维数组。

## 解答

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [0]*(n+1) 
        dp[1]=1
        for _ in range(1,m+1):
            for j in range(1,n+1):
                dp[j] += dp[j-1]
        return dp[-1]
```
41 ms

## *附加

还可以直接用排列组合解决：
- 机器人要到达右下角，要走 m+n-2 步，其中 m-1 步向下，n-1 步向右
- 路径一一对应于由 m-1 个'下'和 n-1 个'右'组成的序列
- 路径数即为 m+n-2 中选 m-1 个的方案数

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        return comb(m+n-2,m-1)
```
35 ms
