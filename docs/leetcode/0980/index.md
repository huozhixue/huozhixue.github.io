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

