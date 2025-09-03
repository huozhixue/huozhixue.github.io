# 2814：避免淹死并到达目的地的最短时间（★★）


> <u>**[力扣第 2814 题](https://leetcode.cn/problems/minimum-time-takes-to-reach-destination-without-drowning/)**</u>

## 题目

<p>现给定一个 <code>n * m</code> 的索引从 <strong>0</strong> 开始的二维字符串网格 <code>land</code>，目前你站在为 <code>"S"</code> 的单元格上，你需要到达为 <code>"D"</code> 的单元格。在这片区域上还有另外三种类型的单元格：</p>

<ul>
<li><code>"."</code>：这些单元格是空的。</li>
<li><code>"X"</code>：这些单元格是石头。</li>
<li><code>"*"</code>：这些单元格被淹没了。</li>
</ul>

<p>每秒钟，你可以移动到与当前单元格共享边的单元格（如果它存在）。此外，每秒钟，与被淹没的单元格共享边的每个 <strong>空单元格</strong> 也会被淹没。</p>

<p>在你的旅程中，有两个需要注意的问题：</p>

<ul>
<li>你不能踩在石头单元格上。</li>
<li>你不能踩在被淹没的单元格上，因为你会淹死（同时，你也不能踩在在你踩上时会被淹没的单元格上）。</li>
</ul>

<p>返回从起始位置到达目标位置所需的 <strong>最小</strong> 时间（以秒为单位），如果不可能达到目标位置，则返回 <code>-1</code>。</p>

<p><strong>注意</strong>，目标位置永远不会被淹没。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>land = [["D",".","*"],[".",".","."],[".","S","."]]
<b>输出：</b>3
<strong>解释：</strong>下面的图片逐秒模拟了土地的变化。蓝色的单元格被淹没，灰色的单元格是石头。
图片（0）显示了初始状态，图片（3）显示了当我们到达目标时的最终状态。正如你所看到的，我们需要 3 秒才能到达目标位置，答案是 3。
可以证明 3 是从 S 到 D 所需的最小时间。
</pre>

<p><img alt="" src="https://assets.leetcode.com/uploads/2023/08/09/ex1.png" style="padding: 5px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 600px; height: 111px;" /></p>

<p><strong class="example">示例 2：</strong></p>

<pre>
<b>输入：</b>land = [["D","X","*"],[".",".","."],[".",".","S"]]
<b>输出：</b>-1
<b>解释：</b>下面的图片逐秒模拟了土地的变化。蓝色的单元格被淹没，灰色的单元格是石头。
图片（0）显示了初始状态。正如你所看到的，无论我们选择哪条路径，我们都会在第三秒淹没。并且从 S 到 D 的最小路径需要 4 秒。
所以答案是 -1。
</pre>

<p><img alt="" src="https://assets.leetcode.com/uploads/2023/08/09/ex2-2.png" style="padding: 7px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 600px; height: 107px;" /></p>

<p><strong class="example">示例 3：</strong></p>

<pre>
<b>输入：</b>land = [["D",".",".",".","*","."],[".","X",".","X",".","."],[".",".",".",".","S","."]]
<b>输出：</b>6
<b>解释：</b>可以证明我们可以在 6 秒内到达目标位置。同时也可以证明 6 是从 S 到 D 所需的最小秒数。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n, m &lt;= 100</code></li>
<li><code>land</code> 只由 <code>"S"</code>, <code>"D"</code>, <code>"."</code>, <code>"*"</code> 和 <code>"X"</code> 组成。</li>
<li><strong>恰好</strong>有一个单元格等于 <code>"S"</code>。</li>
<li><strong>恰好</strong>有一个单元格等于 <code>"D"</code>。</li>
</ul>




## 分析

- 先 bfs 一遍求出每个格子被淹的时间
- 再 bfs 一遍，不能走已经被淹的格子

## 解答


```python
class Solution:
    def minimumSeconds(self, land: List[List[str]]) -> int:
        m,n = len(land),len(land[0])
        d = defaultdict(list)
        for i in range(m):
            for j in range(n):
                d[land[i][j]].append((i,j))
        t = [[inf]*n for _ in range(m)]
        dq = d['*']
        for i,j in dq:
            t[i][j] = 0
        while dq:
            tmp,dq = dq,[]
            for i,j in tmp:
                for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                    if 0<=x<m and 0<=y<n and land[x][y]=='.' and t[x][y]==inf:
                        t[x][y] = t[i][j] + 1
                        dq.append((x,y))
        si,sj = d['S'][0]
        di,dj = d['D'][0]
        f = [[inf]*n for _ in range(m)]
        f[si][sj] = 0
        dq = [(si,sj,0)]
        while dq:
            tmp,dq = dq,[]
            for i,j,w in tmp:
                if (i,j)==(di,dj):
                    return w
                for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                    if 0<=x<m and 0<=y<n and land[x][y]!='X':
                        if f[x][y]==inf and w+1<t[x][y]:
                            f[x][y] = w+1
                            dq.append((x,y,w+1))
        return -1
```
647 ms
