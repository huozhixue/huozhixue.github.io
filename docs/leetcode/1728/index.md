# 1728：猫和老鼠 II（2849 分）


> <u>**[力扣第 224 场周赛第 4 题](https://leetcode.cn/problems/cat-and-mouse-ii/)**</u>

## 题目

<p>一只猫和一只老鼠在玩一个叫做猫和老鼠的游戏。</p>

<p>它们所处的环境设定是一个 <code>rows x cols</code> 的方格 <code>grid</code> ，其中每个格子可能是一堵墙、一块地板、一位玩家（猫或者老鼠）或者食物。</p>

<ul>
<li>玩家由字符 <code>'C'</code> （代表猫）和 <code>'M'</code> （代表老鼠）表示。</li>
<li>地板由字符 <code>'.'</code> 表示，玩家可以通过这个格子。</li>
<li>墙用字符 <code>'#'</code> 表示，玩家不能通过这个格子。</li>
<li>食物用字符 <code>'F'</code> 表示，玩家可以通过这个格子。</li>
<li>字符 <code>'C'</code> ， <code>'M'</code> 和 <code>'F'</code> 在 <code>grid</code> 中都只会出现一次。</li>
</ul>

<p>猫和老鼠按照如下规则移动：</p>

<ul>
<li>老鼠 <strong>先移动</strong> ，然后两名玩家轮流移动。</li>
<li>每一次操作时，猫和老鼠可以跳到上下左右四个方向之一的格子，他们不能跳过墙也不能跳出 <code>grid</code> 。</li>
<li><code>catJump</code> 和 <code>mouseJump</code> 是猫和老鼠分别跳一次能到达的最远距离，它们也可以跳小于最大距离的长度。</li>
<li>它们可以停留在原地。</li>
<li>老鼠可以跳跃过猫的位置。</li>
</ul>

<p>游戏有 4 种方式会结束：</p>

<ul>
<li>如果猫跟老鼠处在相同的位置，那么猫获胜。</li>
<li>如果猫先到达食物，那么猫获胜。</li>
<li>如果老鼠先到达食物，那么老鼠获胜。</li>
<li>如果老鼠不能在 1000 次操作以内到达食物，那么猫获胜。</li>
</ul>

<p>给你 <code>rows x cols</code> 的矩阵 <code>grid</code> 和两个整数 <code>catJump</code> 和 <code>mouseJump</code> ，双方都采取最优策略，如果老鼠获胜，那么请你返回 <code>true</code> ，否则返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/17/sample_111_1955.png" style="width: 580px; height: 239px;" /></strong></p>

<pre>
<b>输入：</b>grid = ["####F","#C...","M...."], catJump = 1, mouseJump = 2
<b>输出：</b>true
<b>解释：</b>猫无法抓到老鼠，也没法比老鼠先到达食物。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/17/sample_2_1955.png" style="width: 580px; height: 175px;" /></p>

<pre>
<b>输入：</b>grid = ["M.C...F"], catJump = 1, mouseJump = 4
<b>输出：</b>true
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>grid = ["M.C...F"], catJump = 1, mouseJump = 3
<b>输出：</b>false
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<b>输入：</b>grid = ["C...#","...#F","....#","M...."], catJump = 2, mouseJump = 5
<b>输出：</b>false
</pre>

<p><strong>示例 5：</strong></p>

<pre>
<b>输入：</b>grid = [".M...","..#..","#..#.","C#.#.","...#F"], catJump = 3, mouseJump = 1
<b>输出：</b>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>rows == grid.length</code></li>
<li><code>cols = grid[i].length</code></li>
<li><code>1 <= rows, cols <= 8</code></li>
<li><code>grid[i][j]</code> 只包含字符 <code>'C'</code> ，<code>'M'</code> ，<code>'F'</code> ，<code>'.'</code> 和 <code>'#'</code> 。</li>
<li><code>grid</code> 中只包含一个 <code>'C'</code> ，<code>'M'</code> 和 <code>'F'</code> 。</li>
<li><code>1 <= catJump, mouseJump <= 8</code></li>
</ul>


**相似问题：**
- [0789：逃脱阻碍者（1611 分）](/leetcode/0789)
- [0913：猫和老鼠（2566 分）](/leetcode/0913)


## 分析

### #1

- {{< lc "0913" >}} 进阶版，只是建图更麻烦点
- 直觉上来说，老鼠如果能到达食物，必然少于 1000 次操作，可以忽略这个条件

```python
class Solution:
    def canMouseWin(self, grid: List[str], catJump: int, mouseJump: int) -> bool:
        @cache
        def gen(i,jump):
            res = set()
            x,y = divmod(i,n)
            if grid[x][y] != '#':
                for dx,dy in [(0,1),(0,-1),(1,0),(-1,0)]:
                    for k in range(jump+1):
                        x2,y2 = x+k*dx,y+k*dy
                        if 0<=x2<m and 0<=y2<n:
                            if grid[x2][y2]=='#':
                                break
                            res.add(x2*n+y2)
            return res
        m,n = len(grid), len(grid[0])
        d = {grid[i][j]:(i,j) for i in range(m) for j in range(n)}
        C,M,F = [d[c][0]*n+d[c][1] for c in 'CMF']
        g,deg = defaultdict(list), defaultdict(int)
        for i,j in product(range(m*n),range(m*n)):
            for k in gen(i,mouseJump):
                g[(k,j,2)].append((i,j,1))
                deg[(i,j,1)] += 1
            for k in gen(j,catJump):
                g[(i,k,1)].append((i,j,2))
                deg[(i,j,2)] += 1
        f = {}
        for i in range(m*n):
            f[(F,i,1)] = f[(F,i,2)] = 1
            f[(i,i,1)] = f[(i,i,2)] = 2
            f[(i,F,1)] = f[(i,F,2)] = 2
        Q = deque(f)                  
        while Q:
            u = Q.popleft()
            if u==(M,C,1):                
                return f[u]==1
            for v in g[u]:
                if v in f:
                    continue
                if v[-1]==f[u]:
                    f[v] = f[u]
                    Q.append(v)
                else:
                    deg[v]-=1
                    if deg[v]==0:
                        f[v] = f[u]
                        Q.append(v)
        return False
```
640 ms

### #2

- 保险起见，也可以在拓扑排序时，维护操作次数
- 
## 解答


```python
class Solution:
    def canMouseWin(self, grid: List[str], catJump: int, mouseJump: int) -> bool:
        @cache
        def gen(i,jump):
            res = set()
            x,y = divmod(i,n)
            if grid[x][y] != '#':
                for dx,dy in [(0,1),(0,-1),(1,0),(-1,0)]:
                    for k in range(jump+1):
                        x2,y2 = x+k*dx,y+k*dy
                        if 0<=x2<m and 0<=y2<n:
                            if grid[x2][y2]=='#':
                                break
                            res.add(x2*n+y2)
            return res
        m,n = len(grid), len(grid[0])
        d = {grid[i][j]:(i,j) for i in range(m) for j in range(n)}
        C,M,F = [d[c][0]*n+d[c][1] for c in 'CMF']
        g,deg = defaultdict(list), defaultdict(int)
        for i,j in product(range(m*n),range(m*n)):
            for k in gen(i,mouseJump):
                g[(k,j,2)].append((i,j,1))
                deg[(i,j,1)] += 1
            for k in gen(j,catJump):
                g[(i,k,1)].append((i,j,2))
                deg[(i,j,2)] += 1
        f = {}
        for i in range(m*n):
            f[(F,i,1)] = f[(F,i,2)] = 1
            f[(i,i,1)] = f[(i,i,2)] = 2
            f[(i,F,1)] = f[(i,F,2)] = 2
        Q = deque([(u,0) for u in f])                  
        while Q:
            u,w = Q.popleft()
            if u==(M,C,1):                
                return f[u]==1
            if w==1000:
                return False
            for v in g[u]:
                if v in f:
                    continue
                if v[-1]==f[u]:
                    f[v] = f[u]
                    Q.append((v,w+1))
                else:
                    deg[v]-=1
                    if deg[v]==0:
                        f[v] = f[u]
                        Q.append((v,w+1))
        return False
```
671 ms
