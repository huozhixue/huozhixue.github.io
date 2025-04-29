# 1036：逃离大迷宫（2164 分）


> <u>**[力扣第 134 场周赛第 4 题](https://leetcode.cn/problems/escape-a-large-maze/)**</u>

## 题目

<p>在一个 10<sup>6</sup> x 10<sup>6</sup> 的网格中，每个网格上方格的坐标为 <code>(x, y)</code> 。</p>

<p>现在从源方格 <code>source = [s<sub>x</sub>, s<sub>y</sub>]</code> 开始出发，意图赶往目标方格 <code>target = [t<sub>x</sub>, t<sub>y</sub>]</code> 。数组 <code>blocked</code> 是封锁的方格列表，其中每个 <code>blocked[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 表示坐标为 <code>(x<sub>i</sub>, y<sub>i</sub>)</code> 的方格是禁止通行的。</p>

<p>每次移动，都可以走到网格中在四个方向上相邻的方格，只要该方格 <strong>不</strong> 在给出的封锁列表 <code>blocked</code> 上。同时，不允许走出网格。</p>

<p>只有在可以通过一系列的移动从源方格 <code>source</code> 到达目标方格 <code>target</code> 时才返回 <code>true</code>。否则，返回 <code>false</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
<strong>输出：</strong>false
<strong>解释：</strong>
从源方格无法到达目标方格，因为我们无法在网格中移动。
无法向北或者向东移动是因为方格禁止通行。
无法向南或者向西移动是因为不能走出网格。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>blocked = [], source = [0,0], target = [999999,999999]
<strong>输出：</strong>true
<strong>解释：</strong>
因为没有方格被封锁，所以一定可以到达目标方格。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 <= blocked.length <= 200</code></li>
<li><code>blocked[i].length == 2</code></li>
<li><code>0 <= x<sub>i</sub>, y<sub>i</sub> < 10<sup>6</sup></code></li>
<li><code>source.length == target.length == 2</code></li>
<li><code>0 <= s<sub>x</sub>, s<sub>y</sub>, t<sub>x</sub>, t<sub>y</sub> < 10<sup>6</sup></code></li>
<li><code>source != target</code></li>
<li>题目数据保证 <code>source</code> 和 <code>target</code> 不在封锁列表内</li>
</ul>




## 分析

### #1

- 容易想到 bfs 找路径
- 网格很大，障碍物很少，遍历障碍物之间的大片空白太浪费时间
- 考虑将连续若干个空白行/列压缩成 1 行/列，不影响连通性
- 压缩后的新图跑 bfs 即可

```python
class Solution:
    def isEscapePossible(self, blocked: List[List[int]], source: List[int], target: List[int]) -> bool:
        def gen(A):
            d = {0:0}
            i = 0
            for a,b in pairwise(A):
                i += min(2,b-a)
                d[b] = i
            return d
        n = 10**6
        (sx,sy),(tx,ty) = source,target
        d1 = gen(sorted({x for x,_ in blocked}|{sx,tx,0,n}))
        d2 = gen(sorted({y for _,y in blocked}|{sy,ty,0,n}))
        m,n = d1[n],d2[n]
        sx,sy,tx,ty = d1[sx],d2[sy],d1[tx],d2[ty]
        vis = {(d1[x],d2[y]) for x,y in blocked}|{(sx,sy)}
        Q = deque([(sx,sy)])
        while Q:
            i,j = Q.popleft()
            if (i,j)==(tx,ty):
                return True
            for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                if 0<=x<m and 0<=y<n and (x,y) not in vis:
                    Q.append((x,y))
                    vis.add((x,y))
        return False
```
406 ms

### #2

- 还有个更优的做法
- 随意挑选一条从 source 到 target 的路径
	- 最简单的路径就是先水平走到与 target 同一列的位置，再竖直走到 target
- 如果路径上有障碍物，要么能绕着障碍物走回到路径上的某个位置，要么就不能达到 target
- 因此，只需要考虑障碍物周围（注意是八个相邻格子）和路径上的格子，基于这些格子 bfs 即可

## 解答


```python
class Solution:
    def isEscapePossible(self, blocked: List[List[int]], source: List[int], target: List[int]) -> bool:
        def gen(A):
            d = {0:0}
            i = 0
            for a,b in pairwise(A):
                i += min(2,b-a)
                d[b] = i
            return d
        n = 10**6
        (sx,sy),(tx,ty) = source,target
        d1 = gen(sorted({x for x,_ in blocked}|{sx,tx,0,n}))
        d2 = gen(sorted({y for _,y in blocked}|{sy,ty,0,n}))
        m,n = d1[n],d2[n]
        sx,sy,tx,ty = d1[sx],d2[sy],d1[tx],d2[ty]
        B = {(d1[x],d2[y]) for x,y in blocked}
        valid = set()
        for i,j in B:
            for x,y in product(range(i-1,i+2),range(j-1,j+2)):
                if 0<=x<m and 0<=y<n:
                    valid.add((x,y))
        for i in (range(sx,tx+1) if sx<tx else range(tx,sx+1)):
            valid.add((i,sy))
        for j in (range(sy,ty+1) if sy<ty else range(ty,sy+1)):
            valid.add((tx,j)) 
        Q = deque([(sx,sy)])
        B.add((sx,sy))
        while Q:
            i,j = Q.popleft()
            if (i,j)==(tx,ty):
                return True
            for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                if (x,y) in valid and (x,y) not in B:
                    Q.append((x,y))
                    B.add((x,y))
        return False
```
11 ms
