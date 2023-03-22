# 0052：N 皇后 II（★★）


> <u>**[力扣第 52 题](https://leetcode.cn/problems/n-queens-ii/)**</u>

## 题目

<p><strong>n 皇后问题</strong> 研究的是如何将 <code>n</code> 个皇后放置在 <code>n × n</code> 的棋盘上，并且使皇后彼此之间不能相互攻击。</p>

<p>给你一个整数 <code>n</code> ，返回 <strong>n 皇后问题</strong> 不同的解决方案的数量。</p>



<div class="original__bRMd">
<div>
<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/queens.jpg" style="width: 600px; height: 268px;" />
<pre>
<strong>输入：</strong>n = 4
<strong>输出：</strong>2
<strong>解释：</strong>如上图所示，4 皇后问题存在两个不同的解法。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 9</code></li>
</ul>
</div>
</div>


## 分析

类似 {{< lc "0051" >}} ，还更简单一点。

## 解答

```python
def totalNQueens(self, n: int) -> int:
    def dfs(i):
        if i == n:
            return 1
        res = 0
        for j in range(n):
            if col[j] == dia1[i + j] == dia2[i - j] == 0:
                col[j] = dia1[i + j] = dia2[i - j] = 1
                res += dfs(i + 1)
                col[j] = dia1[i + j] = dia2[i - j] = 0
        return res

    col, dia1, dia2 = (defaultdict(int) for _ in range(3))
    return dfs(0)
```
44 ms
