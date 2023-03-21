# 0741：摘樱桃（★★）


> <u>**[力扣第 61 场双周赛第 3 题](https://leetcode.cn/problems/cherry-pickup/)**</u>

## 题目

<p>一个N x N的网格<code>(grid)</code> 代表了一块樱桃地，每个格子由以下三种数字的一种来表示：</p>

<ul>
<li>0 表示这个格子是空的，所以你可以穿过它。</li>
<li>1 表示这个格子里装着一个樱桃，你可以摘到樱桃然后穿过它。</li>
<li>-1 表示这个格子里有荆棘，挡着你的路。</li>
</ul>

<p>你的任务是在遵守下列规则的情况下，尽可能的摘到最多樱桃：</p>

<ul>
<li>从位置 (0, 0) 出发，最后到达 (N-1, N-1) ，只能向下或向右走，并且只能穿越有效的格子（即只可以穿过值为0或者1的格子）；</li>
<li>当到达 (N-1, N-1) 后，你要继续走，直到返回到 (0, 0) ，只能向上或向左走，并且只能穿越有效的格子；</li>
<li>当你经过一个格子且这个格子包含一个樱桃时，你将摘到樱桃并且这个格子会变成空的（值变为0）；</li>
<li>如果在 (0, 0) 和 (N-1, N-1) 之间不存在一条可经过的路径，则没有任何一个樱桃能被摘到。</li>
</ul>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> grid =
[[0, 1, -1],
[1, 0, -1],
[1, 1,  1]]
<strong>输出:</strong> 5
<strong>解释：</strong>
玩家从（0,0）点出发，经过了向下走，向下走，向右走，向右走，到达了点(2, 2)。
在这趟单程中，总共摘到了4颗樱桃，矩阵变成了[[0,1,-1],[0,0,-1],[0,0,0]]。
接着，这名玩家向左走，向上走，向上走，向左走，返回了起始点，又摘到了1颗樱桃。
在旅程中，总共摘到了5颗樱桃，这是可以摘到的最大值了。
</pre>

<p><strong>说明:</strong></p>

<ul>
<li><code>grid</code> 是一个 <code>N</code> * <code>N</code> 的二维数组，N的取值范围是<code>1 &lt;= N &lt;= 50</code>。</li>
<li>每一个 <code>grid[i][j]</code> 都是集合 <code>{-1, 0, 1}</code>其中的一个数。</li>
<li>可以保证起点 <code>grid[0][0]</code> 和终点 <code>grid[N-1][N-1]</code> 的值都不会是 -1。</li>
</ul>


## 分析

单程是个很显然的 dp 问题，双程则会互相影响，不能分开求。

那么考虑一起递推，到 (i,j) 位置的双程的最大值，依赖于上一步两条线路的结尾。

为了递推，令 dfs(i1,j1,i2,j2) 代表两条线路分别到 (i1,j1)、(i2,j2) 位置时的最大值，即可递推。

注意到递推过程中 i1+j1==i2+j2，因此可以简化为 dfs(k, i1, i2) 代表第 k 步
两条线路分别到 (i1,k-i1)、(i2,k-i2) 位置时的最大值。

## 解答

```python
class Solution:
def cherryPickup(self, grid: List[List[int]]) -> int:
    @lru_cache(None)
    def dfs(k, i1, i2):
        if k==0:
            return grid[0][0]
        if grid[i1][k-i1] == -1 or grid[i2][k-i2] == -1:
            return float('-inf')
        res, cur = float('-inf'), sum(grid[i][k-i] for i in {i1, i2})
        for x1, x2 in product([i1, i1-1], [i2, i2-1]):
            if min(x1, k-1-x1, x2, k-1-x2)>=0:
                res = max(res, cur+dfs(k-1, x1, x2))
        return res
    
    n = len(grid)
    return max(0, dfs(2*n-2, n-1, n-1))
```
1040 ms

