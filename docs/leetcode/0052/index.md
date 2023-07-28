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

类似 {{< lc "0037" >}} ，回溯法的典型应用。

每一行只能有一个棋子，所以可以直接按行放，节省时间。

## 解答

```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        def dfs(i):
            if i==n:
                self.res += 1
                return
            for j in range(n):
                if C[j]==D1[i+j]==D2[i-j]==0:
                    C[j]=D1[i+j]=D2[i-j]=1
                    dfs(i+1)
                    C[j]=D1[i+j]=D2[i-j]=0
        C,D1,D2 = [defaultdict(int) for _ in range(3)]
        self.res = 0
        dfs(0)
        return self.res
```
56 ms
