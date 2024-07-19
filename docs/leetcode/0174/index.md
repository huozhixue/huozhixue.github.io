# 0174：地下城游戏（★★）


> <u>**[力扣第 174 题](https://leetcode.cn/problems/dungeon-game/)**</u>

## 题目

<style type="text/css">table.dungeon, .dungeon th, .dungeon td {
border:3px solid black;
}

.dungeon th, .dungeon td {
text-align: center;
height: 70px;
width: 70px;
}
</style>
<p>恶魔们抓住了公主并将她关在了地下城 <code>dungeon</code> 的 <strong>右下角</strong> 。地下城是由 <code>m x n</code> 个房间组成的二维网格。我们英勇的骑士最初被安置在 <strong>左上角</strong> 的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。</p>

<p>骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。</p>

<p>有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为<em>负整数</em>，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 <em>0</em>），要么包含增加骑士健康点数的魔法球（若房间里的值为<em>正整数</em>，则表示骑士将增加健康点数）。</p>

<p>为了尽快解救公主，骑士决定每次只 <strong>向右</strong> 或 <strong>向下</strong> 移动一步。</p>

<p>返回确保骑士能够拯救到公主所需的最低初始健康点数。</p>

<p><strong>注意：</strong>任何房间都可能对骑士的健康点数造成威胁，也可能增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/13/dungeon-grid-1.jpg" style="width: 253px; height: 253px;" />
<pre>
<strong>输入：</strong>dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
<strong>输出：</strong>7
<strong>解释：</strong>如果骑士遵循最佳路径：右 -&gt; 右 -&gt; 下 -&gt; 下 ，则骑士的初始健康点数至少为 7 。</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>dungeon = [[0]]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == dungeon.length</code></li>
<li><code>n == dungeon[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>-1000 &lt;= dungeon[i][j] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0062：不同路径](/leetcode/0062)
- [0064：最小路径和](/leetcode/0064)
- [0741：摘樱桃](/leetcode/0741)
- [2304：网格中的最小路径代价（1658 分）](/leetcode/2304)
- [2214：通关游戏所需的最低生命值](/leetcode/2214)
- [2435：矩阵中和能被 K 整除的路径（1951 分）](/leetcode/2435)
- [2510：检查是否有路径经过相同数量的 0 和 1](/leetcode/2510)


## 分析

矩阵 dp，按第一步向右或向下递归即可。注意保证点数一直大于 0。
 
## 解答

```python
class Solution:
    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        m,n = len(dungeon),len(dungeon[0])
        dp = [[inf]*(n+1) for _ in range(m+1)]
        dp[-1][-2] = 1
        for i in range(m-1,-1,-1):
            for j in range(n-1,-1,-1):
                dp[i][j]=max(1,min(dp[i+1][j],dp[i][j+1])-dungeon[i][j])
        return dp[0][0]
```
72 ms



