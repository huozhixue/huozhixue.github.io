# 0980：不同路径 III（1830 分）


> <u>**[力扣第 120 场周赛第 4 题](https://leetcode.cn/problems/unique-paths-iii/)**</u>

## 题目

<p>在二维网格 <code>grid</code> 上，有 4 种类型的方格：</p>

<ul>
<li><code>1</code> 表示起始方格。且只有一个起始方格。</li>
<li><code>2</code> 表示结束方格，且只有一个结束方格。</li>
<li><code>0</code> 表示我们可以走过的空方格。</li>
<li><code>-1</code> 表示我们无法跨越的障碍。</li>
</ul>

<p>返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目<strong>。</strong></p>

<p><strong>每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格</strong>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
<strong>输出：</strong>2
<strong>解释：</strong>我们有以下两条路径：
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>[[1,0,0,0],[0,0,0,0],[0,0,0,2]]
<strong>输出：</strong>4
<strong>解释：</strong>我们有以下四条路径：
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>[[0,1],[2,0]]
<strong>输出：</strong>0
<strong>解释：</strong>
没有一条路能完全穿过每一个空的方格一次。
请注意，起始和结束方格可以位于网格中的任意位置。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= grid.length * grid[0].length &lt;= 20</code></li>
</ul>


**相似问题：**
- [0037：解数独](/leetcode/0037)
- [0063：不同路径 II](/leetcode/0063)
- [0212：单词搜索 II](/leetcode/0212)


## 分析


典型的状压 dp，令 dfs(st,i,j) 代表还没通过的集合是 st，当前在方格 (i,j) 情况下的路径数目，即可递归 

## 解答

```python
class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        m,n = len(grid),len(grid[0])
        st,si,sj = 0,0,0
        for i,row in enumerate(grid):
            for j,x in enumerate(row):
                if x in [0,2]:
                    st |= 1<<(i*n+j)
                elif x==1:
                    si,sj = i,j
        @cache
        def dfs(st,i,j):
            if grid[i][j]==2:
                return st==0
            res = 0
            for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                if 0<=x<m and 0<=y<n and st&1<<(x*n+y):
                    res += dfs(st^1<<(x*n+y),x,y)
            return res
        return dfs(st,si,sj)
```
15 ms

## *附加

还有更优的插头 dp 方法，入门学习见 [【算法】插头 dp——从入门到跳楼 ——litble](https://www.mina.moe/archives/4217)
- 先理清算回路且无障碍的做法
	- 维护长 n+1 的轮廓线上的插头状态，0,1,2 分别代表无/左/右插头
		- 轮廓线之前的格子形成若干条道路，每条道路必然有左右端点，即是对应的左右插头
	- 因为是回路，每个格子必然刚好两个插头
	- 设左侧和上侧的插头状态分别是 a,b
		- 若 a=b=0，右侧和下侧需要添加插头
			- 根据定义，下侧的是左插头 1，右侧的是右插头 2
			- 新的轮廓线状态即是将 a,b 原位置改为 1 和 2
			- 注意若越界了，该状态不合法，因为不满足刚好两个插头
		- 若 a=0,b=1，需要添加一个插头
			- 若右侧添加，则轮廓线状态不变
			- 若下侧添加，新的轮廓线状态即是将 a,b 原位置改为 1 和 0
			- 同样注意不能越界
		- a,b 中有一个为 0 的其它情况同理
		- 若 a=b=1，不需要添加插头了
			- 注意 a 和 b 所属的两条道路经过当前格子合并成一条了
			- 那么两条道路中靠左的那个右插头 k，是新的道路的左插头
			- 因此需要找到位置 k，改为 1，得到新的轮廓线状态
			- 找左/右插头的匹配位置，类似于括号匹配，用栈即可
		- a=b=2 同理
		- 若 a=2,b=1，两条道路合并，且轮廓线状态不变
		- 若 a=1,b=2，注意一旦合并，就形成回路了
			- 因此只有最后一个格子可以合并，这里也得到最终结果
- 有障碍的情况需要注意两点
	- 遍历到障碍格子时，只有 a=b=0 才是合法的，并且不添加插头，轮廓线状态不变
	- 提前找到最后一个非障碍格子，只有这个格子可以合并成回路，并得到最终结果
- 本题固定了起始和结束格子，而不是回路，需要特殊处理
	- 考虑新加一个插头状态 3 代表和起始/结束格子相连
	- 注意起始/结束格子只能有 1 个插头，空格子依然 2 个插头
	- 那么对于空格子
		- 若 a=b=3，合并成满足要求的道路，同样的，只有最后一个非障碍格子可以合并
		- 若 a=0,b=3，和 a=0,b=1 的情况相同处理即可
		- 若 a=1,b=3，合并后要将 a 所属道路的右插头改为 3
		- a,b 中有一个为 3 的其它情况同理
	- 对于起始/结束格子
		- 若 a=0,b=3，合并成满足要求的道路，同样的，只有最后一个非障碍格子可以合并
		- 若 a=b=0，右侧或下侧添加一个插头，注意状态为 3
		- 若 a=0,b=1，将 b 所属道路的右插头改为 3
		- 其它情况同理，注意 a 和 b 至少一个为 0，因为只能有 1 个插头

```python
class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        def pair(st):
            d,sk = {},[]
            for i,c in enumerate(st):
                if c=='1':
                    sk.append(i)
                elif c=='2':
                    j = sk.pop()
                    d[i],d[j] = j,i
            return d
        m,n = len(grid),len(grid[0])
        if m<n:
            m,n,grid = n,m,list(zip(*grid))
        ei,ej = [(i,j) for i in range(m) for j in range(n) if grid[i][j]!=-1][-1]
        f = Counter({'0'*(n+1):1})
        for i in range(ei+1):
            f = {'0'+st[:-1]:w for st,w in f.items()}
            for j in range(ej if i==ei else n):
                x = grid[i][j]
                g = defaultdict(int)
                for st,w in f.items():
                    d = pair(st)
                    a,b = st[j],st[j+1]
                    if x==-1:
                        if a==b=='0':
                            g[st] += w
                    elif x==0:
                        if a==b=='0':
                            if i+1<m and j+1<n:
                                g[st[:j]+'12'+st[j+2:]] += w
                        elif '0' in a+b:
                            if (a=='0' and j+1<n) or (b=='0' and i+1<m):
                                g[st] += w
                            if (a=='0' and i+1<m) or (b=='0' and j+1<n):
                                g[st[:j]+b+a+st[j+2:]] += w
                        else:
                            st = st[:j]+'00'+st[j+2:]
                            if a=='2' and b=='1':
                                g[st] += w
                            elif a==b!='3':
                                k = min(d[j],d[j+1]) if a=='1' else max(d[j],d[j+1])
                                g[st[:k]+a+st[k+1:]] += w
                            elif '3' in a+b and a+b!='33':
                                k = d[j+1] if a=='3' else d[j]
                                g[st[:k]+'3'+st[k+1:]] += w
                    else:
                        if a==b=='0':
                            if i+1<m:
                                g[st[:j]+'30'+st[j+2:]] += w
                            if j+1<n:
                                g[st[:j]+'03'+st[j+2:]] += w 
                        elif '3' not in a+b and '0' in a+b:
                            st = st[:j]+'00'+st[j+2:]
                            k = d[j+1] if a=='0' else d[j]
                            g[st[:k]+'3'+st[k+1:]] += w
                f = g
        x = grid[ei][ej]
        c = '33' if x==0 else '030'
        return sum(f[st] for st in f if st[ej:ej+2] in c)
```
0 ms
