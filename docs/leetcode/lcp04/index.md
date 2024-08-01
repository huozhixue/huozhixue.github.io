# LCP 04：覆盖（★★）


> <u>**[力扣第 LCP 04 题](https://leetcode.cn/problems/broken-board-dominoes/)**</u>

## 题目

<p>你有一块棋盘，棋盘上有一些格子已经坏掉了。你还有无穷块大小为<code>1 * 2</code>的多米诺骨牌，你想把这些骨牌<strong>不重叠</strong>地覆盖在<strong>完好</strong>的格子上，请找出你最多能在棋盘上放多少块骨牌？这些骨牌可以横着或者竖着放。</p>



<p>输入：<code>n, m</code>代表棋盘的大小；<code>broken</code>是一个<code>b * 2</code>的二维数组，其中每个元素代表棋盘上每一个坏掉的格子的位置。</p>

<p>输出：一个整数，代表最多能在棋盘上放的骨牌数。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 2, m = 3, broken = [[1, 0], [1, 1]]
<strong>输出：</strong>2
<strong>解释：</strong>我们最多可以放两块骨牌：[[0, 0], [0, 1]]以及[[0, 2], [1, 2]]。（见下图）</pre>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/09/09/domino_example_1.jpg" style="height: 204px; width: 304px;"></p>



<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 3, m = 3, broken = []
<strong>输出：</strong>4
<strong>解释：</strong>下图是其中一种可行的摆放方式
</pre>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/09/09/domino_example_2.jpg" style="height: 304px; width: 304px;"></p>



<p><strong>限制：</strong></p>

<ol>
<li><code>1 &lt;= n &lt;= 8</code></li>
<li><code>1 &lt;= m &lt;= 8</code></li>
<li><code>0 &lt;= b &lt;= n * m</code></li>
</ol>




## 分析

典型的轮廓线dp，遍历到某位置，按不放、竖着放、横着放分类递推即可。

## 解答


```python
class Solution:
    def domino(self, n: int, m: int, broken: List[List[int]]) -> int:
        A = [['0']*m for _ in range(n)]
        for i,j in broken:
            A[i][j] = '1'
        ct = Counter({'1'*m:0})
        for i in range(n):
            for j in range(m):
                ct2 = defaultdict(int)
                for st in ct:
                    st2 = st[1:]+A[i][j]
                    ct2[st2] = max(ct2[st2],ct[st])
                    if A[i][j]=='0':
                        if j and st[-1]=='0':
                            st2 = st[1:-1]+'11'
                            ct2[st2] = max(ct2[st2],ct[st]+1)
                        if st[0]=='0':
                            st2 = st[1:]+'1'
                            ct2[st2] = max(ct2[st2],ct[st]+1)
                ct = ct2
        return max(ct.values())
```
84 ms
