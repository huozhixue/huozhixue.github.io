# 1263：推箱子（2297 分）


> <u>**[力扣第 163 场周赛第 4 题](https://leetcode.cn/problems/minimum-moves-to-move-a-box-to-their-target-location/)**</u>

## 题目

<p>「推箱子」是一款风靡全球的益智小游戏，玩家需要将箱子推到仓库中的目标位置。</p>

<p>游戏地图用大小为 <code>m x n</code> 的网格 <code>grid</code> 表示，其中每个元素可以是墙、地板或者是箱子。</p>

<p>现在你将作为玩家参与游戏，按规则将箱子 <code>'B'</code> 移动到目标位置 <code>'T'</code> ：</p>

<ul>
<li>玩家用字符 <code>'S'</code> 表示，只要他在地板上，就可以在网格中向上、下、左、右四个方向移动。</li>
<li>地板用字符 <code>'.'</code> 表示，意味着可以自由行走。</li>
<li>墙用字符 <code>'#'</code> 表示，意味着障碍物，不能通行。 </li>
<li>箱子仅有一个，用字符 <code>'B'</code> 表示。相应地，网格上有一个目标位置 <code>'T'</code>。</li>
<li>玩家需要站在箱子旁边，然后沿着箱子的方向进行移动，此时箱子会被移动到相邻的地板单元格。记作一次「推动」。</li>
<li>玩家无法越过箱子。</li>
</ul>

<p>返回将箱子推到目标位置的最小 <strong>推动</strong> 次数，如果无法做到，请返回 <code>-1</code>。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/11/16/sample_1_1620.png" style="height: 335px; width: 500px;" /></strong></p>

<pre>
<strong>输入：</strong>grid = [["#","#","#","#","#","#"],
["#","T","#","#","#","#"],
["#",".",".","B",".","#"],
["#",".","#","#",".","#"],
["#",".",".",".","S","#"],
["#","#","#","#","#","#"]]
<strong>输出：</strong>3
<strong>解释：</strong>我们只需要返回推箱子的次数。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [["#","#","#","#","#","#"],
["#","T","#","#","#","#"],
["#",".",".","B",".","#"],
["#","#","#","#",".","#"],
["#",".",".",".","S","#"],
["#","#","#","#","#","#"]]
<strong>输出：</strong>-1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>grid = [["#","#","#","#","#","#"],
["#","T",".",".","#","#"],
["#",".","#","B",".","#"],
["#",".",".",".",".","#"],
["#",".",".",".","S","#"],
["#","#","#","#","#","#"]]
<strong>输出：</strong>5
<strong>解释：</strong>向下、向左、向左、向上再向上。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 20</code></li>
<li><code>grid</code> 仅包含字符 <code>'.'</code>, <code>'#'</code>,  <code>'S'</code> , <code>'T'</code>, 以及 <code>'B'</code>。</li>
<li><code>grid</code> 中 <code>'S'</code>, <code>'B'</code> 和 <code>'T'</code> 各只能出现一个。</li>
</ul>




## 分析

- 将 (玩家位置，箱子位置) 看作状态，即是典型的最短路问题
- 每次状态转移的成本为 0 或 1，因此用 01bfs 即可
	- 01bfs 和 dijkstra 的区别仅在于一个用队列，一个用堆

## 解答

```python
class Solution:
    def minPushBox(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        d = {grid[i][j]:(i,j) for i in range(m) for j in range(n)}
        (si,sj),(bi,bj), T = d['S'], d['B'], d['T']
        Q = deque([(0,si,sj,bi,bj)])
        d = defaultdict(lambda:inf)
        d[(si,sj,bi,bj)] = 0
        while Q:
            w,si,sj,bi,bj = Q.popleft()
            if (bi,bj)==T:
                return w
            if w>d[(si,sj,bi,bj)]:
                continue
            for di,dj in [(0,-1),(0,1),(1,0),(-1,0)]:
                sx,sy = si+di,sj+dj
                if 0<=sx<m and 0<=sy<n and grid[sx][sy]!='#':
                    if (sx,sy)!=(bi,bj):
                        if w<d[(sx,sy,bi,bj)]:
                            d[(sx,sy,bi,bj)] = w
                            Q.appendleft((w,sx,sy,bi,bj))
                    else:
                        bx,by = bi+di,bj+dj
                        if 0<=bx<m and 0<=by<n and grid[bx][by]!='#':
                            if w+1<d[(sx,sy,bx,by)]:
                                d[(sx,sy,bx,by)] = w+1
                                Q.append((w+1,sx,sy,bx,by))
        return -1
```
288 ms

