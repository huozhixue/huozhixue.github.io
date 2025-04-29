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

- 令 f(i,j,k) 代表 house[:j+1] 涂色且以颜色 k 结尾，刚好 i 个街区的最小花费
- 要么 j 单独一个社区，转为 f(i-1,j-1,非k的颜色)
- 要么 j 和前面的颜色相同，转为 f(i,j-1,k)
- 注意若 house[j]>0，k!=house[j] 是不合法的
- 若 house[j]=0，需要加上 cost[j][k-1]

### #1

```python
class Solution:
    def minCost(self, houses: List[int], cost: List[List[int]], m: int, n: int, target: int) -> int:
        f = [[inf]*(n+1) for _ in range(m+1)]
        f[0] = [0]*(n+1)
        for i in range(1,target+1):
            g = [[inf]*(n+1) for _ in range(m+1)]
            for j in range(i,m+1):
                c = houses[j-1]
                for k in range(1,n+1):
                    s = g[j-1][k]
                    for a in range(n+1):
                        if a!=k:
                            s = min(s,f[j-1][a])
                    w = cost[j-1][k-1] if c==0 else 0 if c==k else inf
                    g[j][k] = s+w
            f = g
        res = min(f[-1])
        return res if res<inf else -1
```
1007 ms

### #2

- 求 min(f[j-1][a]),a!=k 可以预处理 f[j-1] 的最小值和次小值，即可快速得到
## 解答

```python
class Solution:
    def minCost(self, houses: List[int], cost: List[List[int]], m: int, n: int, target: int) -> int:
        f = [[inf]*(n+1) for _ in range(m+1)]
        f[0] = [0]*(n+1)
        for i in range(1,target+1):
            g = [[inf]*(n+1) for _ in range(m+1)]
            for j in range(i,m+1):
                c = houses[j-1]
                x,y = nsmallest(2,f[j-1])
                for k in range(1,n+1):
                    s = min(g[j-1][k],y if f[j-1][k]==x else x)
                    w = cost[j-1][k-1] if c==0 else 0 if c==k else inf
                    g[j][k] = s+w
            f = g
        res = min(f[-1])
        return res if res<inf else -1
```

159 ms


