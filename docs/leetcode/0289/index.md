# 0289：生命游戏（★）


> <u>**[力扣第 289 题](https://leetcode.cn/problems/game-of-life/)**</u>

## 题目

<p>根据 <a href="https://baike.baidu.com/item/%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F/2926434?fr=aladdin" target="_blank">百度百科</a> ， <strong>生命游戏</strong> ，简称为 <strong>生命</strong> ，是英国数学家约翰·何顿·康威在 1970 年发明的细胞自动机。</p>

<p>给定一个包含 <code>m × n</code> 个格子的面板，每一个格子都可以看成是一个细胞。每个细胞都具有一个初始状态： <code>1</code> 即为 <strong>活细胞</strong> （live），或 <code>0</code> 即为 <strong>死细胞</strong> （dead）。每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：</p>

<ol>
<li>如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；</li>
<li>如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；</li>
<li>如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；</li>
<li>如果死细胞周围正好有三个活细胞，则该位置死细胞复活；</li>
</ol>

<p>下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是同时发生的。给你 <code>m x n</code> 网格面板 <code>board</code> 的当前状态，返回下一个状态。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/26/grid1.jpg" />
<pre>
<strong>输入：</strong>board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
<strong>输出：</strong>[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/26/grid2.jpg" />
<pre>
<strong>输入：</strong>board = [[1,1],[1,0]]
<strong>输出：</strong>[[1,1],[1,1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == board.length</code></li>
<li><code>n == board[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 25</code></li>
<li><code>board[i][j]</code> 为 <code>0</code> 或 <code>1</code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>你可以使用原地算法解决本题吗？请注意，面板上所有格子需要同时被更新：你不能先更新某些格子，然后使用它们的更新后的值再更新其他格子。</li>
<li>本题中，我们使用二维数组来表示面板。原则上，面板是无限的，但当活细胞侵占了面板边界时会造成问题。你将如何解决这些问题？</li>
</ul>


**相似问题：**
- [0073：矩阵置零](/leetcode/0073)


## 分析

### #1

- 额外数组的方法很简单，下一个状态是存活只有两种情况：
	- 周围共三个活细胞
	- 周围加自身共三个活细胞
- 要求原地算法，考虑用 board 自身来保存信息
- 最简单的就是用两位 bit 分别表示当轮和下一轮状态
- 注意遍历中要 %2 取得当轮状态
## 解答

```python
class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        m,n = len(board),len(board[0])
        for i,j in product(range(m),range(n)):
            a = board[i][j]
            w = 0
            for x,y in product(range(i-1,i+2),range(j-1,j+2)):
                if 0<=x<m and 0<=y<n and (x,y)!=(i,j):
                    w += board[x][y]%2
            board[i][j] += 2*(w==3 or w+a==3)
        for i,j in product(range(m),range(n)): 
            board[i][j] //= 2
```
41 ms

