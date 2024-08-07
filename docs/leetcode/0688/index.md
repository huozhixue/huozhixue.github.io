# 0688：骑士在棋盘上的概率（★）


> <u>**[力扣第 688 题](https://leetcode.cn/problems/knight-probability-in-chessboard/)**</u>

## 题目

<p>在一个 <code>n x n</code> 的国际象棋棋盘上，一个骑士从单元格 <code>(row, column)</code> 开始，并尝试进行 <code>k</code> 次移动。行和列是 <strong>从 0 开始</strong> 的，所以左上单元格是 <code>(0,0)</code> ，右下单元格是 <code>(n - 1, n - 1)</code> 。</p>

<p>象棋骑士有8种可能的走法，如下图所示。每次移动在基本方向上是两个单元格，然后在正交方向上是一个单元格。</p>

<p><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/knight.png" style="height: 300px; width: 300px;" /></p>

<p>每次骑士要移动时，它都会随机从8种可能的移动中选择一种(即使棋子会离开棋盘)，然后移动到那里。</p>

<p>骑士继续移动，直到它走了 <code>k</code> 步或离开了棋盘。</p>

<p>返回 <em>骑士在棋盘停止移动后仍留在棋盘上的概率</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> n = 3, k = 2, row = 0, column = 0
<strong>输出:</strong> 0.0625
<strong>解释:</strong> 有两步(到(1,2)，(2,1))可以让骑士留在棋盘上。
在每一个位置上，也有两种移动可以让骑士留在棋盘上。
骑士留在棋盘上的总概率是0.0625。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入:</strong> n = 1, k = 0, row = 0, column = 0
<strong>输出:</strong> 1.00000
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 25</code></li>
<li><code>0 &lt;= k &lt;= 100</code></li>
<li><code>0 &lt;= row, column &lt;= n - 1</code></li>
</ul>


**相似问题：**
- [0576：出界的路径数](/leetcode/0576)


## 分析

按第一步的移动方向即可转为递归子问题。

## 解答

```python
def knightProbability(self, n: int, k: int, row: int, column: int) -> float:
    @lru_cache(None)
    def dfs(i, j, k):
        if not (0<=i<n and 0<=j<n):
            return 0
        if k == 0:
            return 1
        return sum(dfs(i+dx, j+dy, k-1) for dx, dy in A)/len(A)

    A = [(1, 2), (-1, 2), (1, -2), (-1, -2), (2, 1), (-2, 1), (2, -1), (-2, -1)]
    return dfs(row, column, k)
```
196 ms

