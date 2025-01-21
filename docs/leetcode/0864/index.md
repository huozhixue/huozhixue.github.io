# 0864：获取所有钥匙的最短路径（2258 分）


> <u>**[力扣第 92 场周赛第 4 题](https://leetcode.cn/problems/shortest-path-to-get-all-keys/)**</u>

## 题目

<p>给定一个二维网格 <code>grid</code> ，其中：</p>

<ul>
<li><font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">'.'</span></span></font></font> 代表一个空房间</li>
<li><font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">'#'</span></span></font></font> 代表一堵墙</li>
<li><font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">'@'</span></span></font></font> 是起点</li>
<li>小写字母代表钥匙</li>
<li>大写字母代表锁</li>
</ul>

<p>我们从起点开始出发，一次移动是指向四个基本方向之一行走一个单位空间。我们不能在网格外面行走，也无法穿过一堵墙。如果途经一个钥匙，我们就把它捡起来。除非我们手里有对应的钥匙，否则无法通过锁。</p>

<p>假设 k 为 钥匙/锁 的个数，且满足 <code>1 &lt;= k &lt;= 6</code>，字母表中的前 <code>k</code> 个字母在网格中都有自己对应的一个小写和一个大写字母。换言之，每个锁有唯一对应的钥匙，每个钥匙也有唯一对应的锁。另外，代表钥匙和锁的字母互为大小写并按字母顺序排列。</p>

<p>返回获取所有钥匙所需要的移动的最少次数。如果无法获取所有钥匙，返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/23/lc-keys2.jpg" /></p>

<pre>
<strong>输入：</strong>grid = ["@.a..","###.#","b.A.B"]
<strong>输出：</strong>8
<strong>解释：</strong>目标是获得所有钥匙，而不是打开所有锁。
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/23/lc-key2.jpg" /></p>

<pre>
<strong>输入：</strong>grid = ["@..aA","..B#.","....b"]
<strong>输出：</strong>6
</pre>

<p><strong>示例 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-keys3.jpg" />
<pre>
<strong>输入:</strong> grid = ["@Aa"]
<strong>输出:</strong> -1</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 30</code></li>
<li><code>grid[i][j]</code> 只含有 <code>'.'</code>, <code>'#'</code>, <code>'@'</code>, <code>'a'-</code><code>'f</code><code>'</code> 以及 <code>'A'-'F'</code></li>
<li>钥匙的数目范围是 <code>[1, 6]</code> </li>
<li>每个钥匙都对应一个 <strong>不同</strong> 的字母</li>
<li>每个钥匙正好打开一个对应的锁</li>
</ul>




## 分析

### #1

将状态 <位置,钥匙集合> 看作顶点，就是典型的 bfs 问题，遍历即可。

```python
class Solution:
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        m, n = len(grid), len(grid[0])
        d = {grid[i][j]:(i,j) for i in range(m) for j in range(n)}
        si, sj = d['@']
        tg = sum(1<<i for i in range(6) if chr(ord('a')+i) in d)
        Q, vis = deque([(0,si,sj,0)]), {(si,sj,0)}
        while Q:
            w,i,j,st = Q.popleft()
            if st==tg:
                return w
            for x,y in [(i+1,j),(i-1,j),(i,j+1),(i,j-1)]:
                if 0<=x<m and 0<=y<n and grid[x][y]!='#':
                    c = grid[x][y]
                    if c in 'ABCDEF' and not st&1<<(ord(c)-ord('A')):
                        continue
                    st2 = st|1<<(ord(c)-ord('a')) if c in 'abcdef' else st
                    if (x,y,st2) not in vis:
                        Q.append((w+1,x,y,st2))
                        vis.add((x,y,st2))
        return -1
```
183 ms

### #2

- 注意到只有钥匙和锁的位置是重要的，它们之间的距离是固定的
- 因此建立新图，只包含起点和钥匙、锁的位置，预处理它们之间的距离
	- 注意预处理时不能越过锁，但要记录到锁的距离
- 仍然以状态 <位置,钥匙集合> 作为顶点，变为典型的最短路问题，用 dijkstra 即可

## 解答


```python
class Solution:
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        def bfs(i,j):
            Q = deque([(0,i,j)])
            d = defaultdict(lambda:inf)
            d[(i,j)] = 0
            while Q:
                w,i,j = Q.popleft()
                for x,y in [(i+1,j),(i-1,j),(i,j+1),(i,j-1)]:
                    if 0<=x<m and 0<=y<n and grid[x][y]!='#' and (x,y) not in d:
                        d[(x,y)] = w+1
                        if grid[x][y] not in 'ABCDEF':
                            Q.append((w+1,x,y))
            return [d[(x,y)] for x,y in A]

        m,n = len(grid),len(grid[0])
        g = defaultdict(list)
        for i,j in product(range(m),range(n)):
            g[grid[i][j]].append((i,j))
        tg = sum(1<<i for i in range(6) if chr(ord('a')+i) in g)
        A = [(i,j) for c in '@abcdefABCDEF' for i,j in g[c]]
        f = [bfs(i,j) for i,j in A]
        pq = [(0,0,0)]
        d = defaultdict(lambda:inf)
        d[(0,0)] = 0
        while pq:
            w,u,st = heappop(pq)
            if st==tg:
                return w
            if w>d[(u,st)]:
                continue
            for v,(i,j) in enumerate(A):
                c = grid[i][j]
                if c in 'ABCDEF' and not st&1<<(ord(c)-ord('A')):
                    continue
                w2 = w+f[u][v]
                st2 = st|1<<(ord(c)-ord('a')) if c in 'abcdef' else st
                if w2<d[(v,st2)]:
                    d[(v,st2)]=w2
                    heappush(pq,(w2,v,st2))
        return -1
```
71 ms
