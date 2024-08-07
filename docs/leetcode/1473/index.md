# 1473：粉刷房子 III（2056 分）


> <u>**[力扣第 192 场周赛第 4 题](https://leetcode.cn/problems/paint-house-iii/)**</u>

## 题目

<p>在一个小城市里，有 <code>m</code> 个房子排成一排，你需要给每个房子涂上 <code>n</code> 种颜色之一（颜色编号为 <code>1</code> 到 <code>n</code> ）。有的房子去年夏天已经涂过颜色了，所以这些房子不可以被重新涂色。</p>

<p>我们将连续相同颜色尽可能多的房子称为一个街区。（比方说 <code>houses = [1,2,2,3,3,2,1,1]</code> ，它包含 5 个街区 <code> [{1}, {2,2}, {3,3}, {2}, {1,1}]</code> 。）</p>

<p>给你一个数组 <code>houses</code> ，一个 <code>m * n</code> 的矩阵 <code>cost</code> 和一个整数 <code>target</code> ，其中：</p>

<ul>
<li><code>houses[i]</code>：是第 <code>i</code> 个房子的颜色，<strong>0</strong> 表示这个房子还没有被涂色。</li>
<li><code>cost[i][j]</code>：是将第 <code>i</code> 个房子涂成颜色 <code>j+1</code> 的花费。</li>
</ul>

<p>请你返回房子涂色方案的最小总花费，使得每个房子都被涂色后，恰好组成 <code>target</code> 个街区。如果没有可用的涂色方案，请返回 <strong>-1</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>houses = [0,0,0,0,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
<strong>输出：</strong>9
<strong>解释：</strong>房子涂色方案为 [1,2,2,1,1]
此方案包含 target = 3 个街区，分别是 [{1}, {2,2}, {1,1}]。
涂色的总花费为 (1 + 1 + 1 + 1 + 5) = 9。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>houses = [0,2,1,2,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
<strong>输出：</strong>11
<strong>解释：</strong>有的房子已经被涂色了，在此基础上涂色方案为 [2,2,1,2,2]
此方案包含 target = 3 个街区，分别是 [{2,2}, {1}, {2,2}]。
给第一个和最后一个房子涂色的花费为 (10 + 1) = 11。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>houses = [0,0,0,0,0], cost = [[1,10],[10,1],[1,10],[10,1],[1,10]], m = 5, n = 2, target = 5
<strong>输出：</strong>5
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>houses = [3,1,2,3], cost = [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], m = 4, n = 3, target = 3
<strong>输出：</strong>-1
<strong>解释：</strong>房子已经被涂色并组成了 4 个街区，分别是 [{3},{1},{2},{3}] ，无法形成 target = 3 个街区。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == houses.length == cost.length</code></li>
<li><code>n == cost[i].length</code></li>
<li><code>1 <= m <= 100</code></li>
<li><code>1 <= n <= 20</code></li>
<li><code>1 <= target <= m</code></li>
<li><code>0 <= houses[i] <= n</code></li>
<li><code>1 <= cost[i][j] <= 10^4</code></li>
</ul>


**相似问题：**
- [2318：不同骰子序列的数目（2090 分）](/leetcode/2318)


## 分析

用辅助函数 help(i, j, t) 表示对 houses[i:] 涂色且 houses[i] 涂成颜色 j，恰好组成 t 个社区的最小花费。
若不可能则返回正无穷，便可以写出递推式。

## 解答

```python
def minCost(self, houses: List[int], cost: List[List[int]], m: int, n: int, target: int) -> int:
    @lru_cache(None)
    def help(i, j, t):
        if houses[i] not in [0, j] or t < 1:
            return float('inf')
        c = cost[i][j - 1] if houses[i] == 0 else 0
        if i == m - 1:
            return c if t == 1 else float('inf')
        return c + min(help(i + 1, k, t - (k != j)) for k in range(1, n + 1))

    res = min(help(0, j, target) for j in range(1, n + 1))
    return res if res < float('inf') else -1
```

1312 ms


