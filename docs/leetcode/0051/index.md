# 0051：N 皇后（★★）


> <u>**[力扣第 51 题](https://leetcode.cn/problems/n-queens/)**</u>

## 题目

<p>按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。</p>

<p><strong>n 皇后问题</strong> 研究的是如何将 <code>n</code> 个皇后放置在 <code>n×n</code> 的棋盘上，并且使皇后彼此之间不能相互攻击。</p>

<p>给你一个整数 <code>n</code> ，返回所有不同的 <strong>n<em> </em>皇后问题</strong> 的解决方案。</p>

<div class="original__bRMd">
<div>
<p>每一种解法包含一个不同的 <strong>n 皇后问题</strong> 的棋子放置方案，该方案中 <code>'Q'</code> 和 <code>'.'</code> 分别代表了皇后和空位。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/queens.jpg" style="width: 600px; height: 268px;" />
<pre>
<strong>输入：</strong>n = 4
<strong>输出：</strong>[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
<strong>解释：</strong>如上图所示，4 皇后问题存在两个不同的解法。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>[["Q"]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 9</code></li>
</ul>
</div>
</div>


## 分析

回溯法的典型应用。每一行只能有一个棋子，所以可以直接按行放，节省时间。

## 解答

```python
def solveNQueens(self, n: int) -> List[List[str]]:
    def dfs(i):
        if i == n:
            res.append(['.'*j+'Q'+'.'*(n-j-1) for j in path])
            return
        for j in range(n):
            if col[j] == dia1[i+j] == dia2[i-j] == 0:
                col[j] = dia1[i+j] = dia2[i-j] = 1
                path.append(j)
                dfs(i + 1)
                path.pop()
                col[j] = dia1[i+j] = dia2[i-j] = 0

    res, path = [], []
    col, dia1, dia2 = (defaultdict(int) for _ in range(3))
    dfs(0)
    return res
```
44 ms
