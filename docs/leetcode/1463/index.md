# 1463：摘樱桃 II（1956 分）


> <u>**[力扣第 27 场双周赛第 4 题](https://leetcode.cn/problems/cherry-pickup-ii/)**</u>

## 题目

<p>给你一个 <code>rows x cols</code> 的矩阵 <code>grid</code> 来表示一块樱桃地。 <code>grid</code> 中每个格子的数字表示你能获得的樱桃数目。</p>

<p>你有两个机器人帮你收集樱桃，机器人 1 从左上角格子 <code>(0,0)</code> 出发，机器人 2 从右上角格子 <code>(0, cols-1)</code> 出发。</p>

<p>请你按照如下规则，返回两个机器人能收集的最多樱桃数目：</p>

<ul>
<li>从格子 <code>(i,j)</code> 出发，机器人可以移动到格子 <code>(i+1, j-1)</code>，<code>(i+1, j)</code> 或者 <code>(i+1, j+1)</code> 。</li>
<li>当一个机器人经过某个格子时，它会把该格子内所有的樱桃都摘走，然后这个位置会变成空格子，即没有樱桃的格子。</li>
<li>当两个机器人同时到达同一个格子时，它们中只有一个可以摘到樱桃。</li>
<li>两个机器人在任意时刻都不能移动到 <code>grid</code> 外面。</li>
<li>两个机器人最后都要到达 <code>grid</code> 最底下一行。</li>
</ul>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/30/sample_1_1802.png" style="height: 182px; width: 139px;"></strong></p>

<pre><strong>输入：</strong>grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
<strong>输出：</strong>24
<strong>解释：</strong>机器人 1 和机器人 2 的路径在上图中分别用绿色和蓝色表示。
机器人 1 摘的樱桃数目为 (3 + 2 + 5 + 2) = 12 。
机器人 2 摘的樱桃数目为 (1 + 5 + 5 + 1) = 12 。
樱桃总数为： 12 + 12 = 24 。
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/30/sample_2_1802.png" style="height: 257px; width: 284px;"></strong></p>

<pre><strong>输入：</strong>grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
<strong>输出：</strong>28
<strong>解释：</strong>机器人 1 和机器人 2 的路径在上图中分别用绿色和蓝色表示。
机器人 1 摘的樱桃数目为 (1 + 9 + 5 + 2) = 17 。
机器人 2 摘的樱桃数目为 (1 + 3 + 4 + 3) = 11 。
樱桃总数为： 17 + 11 = 28 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>grid = [[1,0,0,3],[0,0,0,3],[0,0,3,3],[9,0,3,3]]
<strong>输出：</strong>22
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>grid = [[1,1],[1,1]]
<strong>输出：</strong>4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>rows == grid.length</code></li>
<li><code>cols == grid[i].length</code></li>
<li><code>2 &lt;= rows, cols &lt;= 70</code></li>
<li><code>0 &lt;= grid[i][j] &lt;= 100 </code></li>
</ul>




## 分析

- 类似 {{< lc "0741" >}}，只是移动方式变了
- 由于每一步都会下移一行，令 f(i,j1,j2) 代表两个机器人到达 (i,j1) 和 (i,j2) 位置时的最大值，递推即可

## 解答


```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        m,n = len(grid),len(grid[0])
        f = {(0,n-1):grid[0][0]+grid[0][-1]}
        for i in range(1,m):
            g = defaultdict(int)
            for (j1,j2),w in f.items():
                for y1,y2 in product(range(j1-1,j1+2),range(j2-1,j2+2)):
                    if 0<=y1<y2<n:
                        w2 = w+grid[i][y1]+grid[i][y2]
                        g[(y1,y2)] = max(g[(y1,y2)],w2)
            f = g
        return max(f.values())
```
877 ms
