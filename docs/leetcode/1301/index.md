# 1301：最大得分的路径数目（1853 分）


> <u>**[力扣第 16 场双周赛第 4 题](https://leetcode.cn/problems/number-of-paths-with-max-score/)**</u>

## 题目

<p>给你一个正方形字符数组 <code>board</code> ，你从数组最右下方的字符 <code>&#39;S&#39;</code> 出发。</p>

<p>你的目标是到达数组最左上角的字符 <code>&#39;E&#39;</code> ，数组剩余的部分为数字字符 <code>1, 2, ..., 9</code> 或者障碍 <code>&#39;X&#39;</code>。在每一步移动中，你可以向上、向左或者左上方移动，可以移动的前提是到达的格子没有障碍。</p>

<p>一条路径的 「得分」 定义为：路径上所有数字的和。</p>

<p>请你返回一个列表，包含两个整数：第一个整数是 「得分」 的最大值，第二个整数是得到最大得分的方案数，请把结果对 <strong><code>10^9 + 7</code></strong> <strong>取余</strong>。</p>

<p>如果没有任何路径可以到达终点，请返回 <code>[0, 0]</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>board = [&quot;E23&quot;,&quot;2X2&quot;,&quot;12S&quot;]
<strong>输出：</strong>[7,1]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>board = [&quot;E12&quot;,&quot;1X1&quot;,&quot;21S&quot;]
<strong>输出：</strong>[4,2]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>board = [&quot;E11&quot;,&quot;XXX&quot;,&quot;11S&quot;]
<strong>输出：</strong>[0,0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= board.length == board[i].length &lt;= 100</code></li>
</ul>




## 分析

递推时同时保存最大得分和对应的方案数即可

## 解答


```python
class Solution:
    def pathsWithMaxScore(self, board: List[str]) -> List[int]:
        mod = 10**9+7
        n = len(board)
        f = [[-inf]*(n+1) for _ in range(n+1)]
        g = [[0]*(n+1) for _ in range(n+1)]
        f[-1][-1] = 0
        g[-1][-1] = 1
        for i in range(n-1,-1,-1):
            for j in range(n-1,-1,-1):
                c = board[i][j]
                if c=='X':
                    continue
                a,b = -inf,0
                for x,y in [(i+1,j),(i,j+1),(i+1,j+1)]:
                    if f[x][y]>a:
                        a,b = f[x][y],g[x][y]
                    elif f[x][y]==a:
                        b += g[x][y]
                f[i][j] = a+(0 if c in 'SE' else int(c))
                g[i][j] = b%mod
        return [max(0,f[0][0]),g[0][0]]
```
71 ms
