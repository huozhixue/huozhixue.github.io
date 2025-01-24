# 0913：猫和老鼠（2566 分）


> <u>**[力扣第 104 场周赛第 4 题](https://leetcode.cn/problems/cat-and-mouse/)**</u>

## 题目

<p>两位玩家分别扮演猫和老鼠，在一张 <strong>无向</strong> 图上进行游戏，两人轮流行动。</p>

<p>图的形式是：<code>graph[a]</code> 是一个列表，由满足 <code>ab</code> 是图中的一条边的所有节点 <code>b</code> 组成。</p>

<p>老鼠从节点 <code>1</code> 开始，第一个出发；猫从节点 <code>2</code> 开始，第二个出发。在节点 <code>0</code> 处有一个洞。</p>

<p>在每个玩家的行动中，他们 <strong>必须</strong> 沿着图中与所在当前位置连通的一条边移动。例如，如果老鼠在节点 <code>1</code> ，那么它必须移动到 <code>graph[1]</code> 中的任一节点。</p>

<p>此外，猫无法移动到洞中（节点 <code>0</code>）。</p>

<p>然后，游戏在出现以下三种情形之一时结束：</p>

<ul>
<li>如果猫和老鼠出现在同一个节点，猫获胜。</li>
<li>如果老鼠到达洞中，老鼠获胜。</li>
<li>如果某一位置重复出现（即，玩家的位置和移动顺序都与上一次行动相同），游戏平局。</li>
</ul>

<p>给你一张图 <code>graph</code> ，并假设两位玩家都都以最佳状态参与游戏：</p>

<ul>
<li>如果老鼠获胜，则返回 <code>1</code>；</li>
<li>如果猫获胜，则返回 <code>2</code>；</li>
<li>如果平局，则返回 <code>0</code> 。</li>
</ul>


<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/17/cat1.jpg" style="width: 300px; height: 300px;" />
<pre>
<strong>输入：</strong>graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]
<strong>输出：</strong>0
</pre>

<p><strong class="example">示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/17/cat2.jpg" style="width: 200px; height: 200px;" />
<pre>
<strong>输入：</strong>graph = [[1,3],[0],[3],[0,2]]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= graph.length &lt;= 50</code></li>
<li><code>1 &lt;= graph[i].length &lt; graph.length</code></li>
<li><code>0 &lt;= graph[i][j] &lt; graph.length</code></li>
<li><code>graph[i][j] != i</code></li>
<li><code>graph[i]</code> 互不相同</li>
<li>猫和老鼠在游戏中总是可以移动</li>
</ul>


**相似问题：**
- [1728：猫和老鼠 II（2849 分）](/leetcode/1728)


## 分析

- 经典的博弈问题，直接递归的话状态数太多，更优且更通用的做法是从终态反推
	- 终态有两种
		- 猫的必胜态：猫和老鼠在同一个节点
		- 鼠的必胜态：老鼠在节点 0
	- 考虑与终态相邻的状态
		- 对于轮到猫走的状态
			- 情况一：假如能转移到猫的必胜态，该状态便也是猫的必胜态
			- 情况二：假如能转移到的状态都是鼠的必胜态，该状态便也是鼠的必胜态
			- 否则，状态待定
		- 对于轮到鼠走的状态也同理
	- 把确定的状态转为终态，继续一步步反推，直到所有剩下待定的状态，便都是平局状态
- 这个过程非常类似拓扑排序，只是判断入队的条件复杂一些
	- 令状态 st=<i,j,1>或<i,j,2>，分别代表鼠在节点 i，猫在节点 j（注意 j!=0），轮到鼠/猫走
	- 令 f[st]=1或2，分别代表状态 st 是鼠/猫的必胜态
	- 针对状态 st 建图并统计出度，将终态入队
		- 注意建图是反向转移，出度是统计的正向转移
	- 出队终态 u，遍历 相邻的状态 v
		- 若 f[u]=v[-1]，对应上面分析的情况一，f[v]=f[u]
		- 否则，v 的出度减一，若出度为 0，对应上面的情况二，f[v]=f[u]
		- 两种情况的 v 都入队
	- 循环直到状态 <1,2,1> 入队，或队空，返回平局态 0
## 解答


```python
class Solution:
    def catMouseGame(self, graph: List[List[int]]) -> int:
        n = len(graph)
        g, deg = {}, {}
        for i, j in product(range(n), range(1,n)):
            g[(i,j,1)] = [(i,y,2) for y in graph[j] if y!=0]
            g[(i,j,2)] = [(x,j,1) for x in graph[i]]
            deg[(i,j,1)] = len(graph[i])
            deg[(i,j,2)] = sum(y!=0 for y in graph[j])
        f = {}
        for j in range(1,n):
            f[(j,j,1)] = f[(j,j,2)] = 2
            f[(0,j,1)] = f[(0,j,2)] = 1
        Q = deque(f)
        while Q:
            u = Q.popleft()
            if u==(1,2,1):
                return f[u]
            for v in g[u]:
                if v in f:
                    continue
                if v[-1]==f[u]:
                    f[v] = f[u]
                    Q.append(v)
                else:
                    deg[v] -= 1
                    if deg[v] == 0:
                        f[v] = f[u]
                        Q.append(v)
        return 0
```
541 ms
