# 1284：转化为全零矩阵的最少反转次数（1810 分）


> <u>**[力扣第 166 场周赛第 4 题](https://leetcode.cn/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix/)**</u>

## 题目

<p>给你一个 <code>m x n</code> 的二进制矩阵 <code>mat</code>。每一步，你可以选择一个单元格并将它反转（反转表示 <code>0</code> 变 <code>1</code> ，<code>1</code> 变 <code>0</code> ）。如果存在和它相邻的单元格，那么这些相邻的单元格也会被反转。相邻的两个单元格共享同一条边。</p>

<p>请你返回将矩阵 <code>mat</code> 转化为全零矩阵的<em>最少反转次数</em>，如果无法转化为全零矩阵，请返回 <code>-1</code> 。</p>

<p><strong>二进制矩阵</strong> 的每一个格子要么是 <code>0</code> 要么是 <code>1</code> 。</p>

<p><strong>全零矩阵</strong> 是所有格子都为 <code>0</code> 的矩阵。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/12/13/matrix.png" /></p>

<pre>
<strong>输入：</strong>mat = [[0,0],[0,1]]
<strong>输出：</strong>3
<strong>解释：</strong>一个可能的解是反转 (1, 0)，然后 (0, 1) ，最后是 (1, 1) 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>mat = [[0]]
<strong>输出：</strong>0
<strong>解释：</strong>给出的矩阵是全零矩阵，所以你不需要改变它。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>mat = [[1,0,0],[1,0,0]]
<strong>输出：</strong>-1
<strong>解释：</strong>该矩阵无法转变成全零矩阵
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == mat.length</code></li>
<li><code>n == mat[0].length</code></li>
<li><code>1 &lt;= m &lt;= 3</code></li>
<li><code>1 &lt;= n &lt;= 3</code></li>
<li><code>mat[i][j]</code> 是 0 或 1 。</li>
</ul>


**相似问题：**
- [2123：使矩阵中的 1 互不相邻的最小操作数](/leetcode/2123)
- [2128：通过翻转行或列来去除所有的 1](/leetcode/2128)
- [2174：通过翻转行或列来去除所有的 1 II](/leetcode/2174)


## 分析

### #1

把整个矩阵看作状态，即是典型的 bfs 

```python
class Solution:
    def minFlips(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        st = sum(mat[i][j]<<(i*n+j) for i in range(m) for j in range(n))
        Q, vis = deque([(0,st)]), {st}
        while Q:
            w,st = Q.popleft()
            if st==0:
                return w
            for i,j in product(range(m),range(n)):
                st2 = st
                st2 ^= 1<<(i*n+j)
                for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                    if 0<=x<m and 0<=y<n:
                        st2 ^= 1<<(x*n+y)
                if st2 not in vis:
                    Q.append((w+1,st2))
                    vis.add(st2)
        return -1
```
7 ms

### #2

还有更优的做法
- 注意到只要确定了第一行翻转哪些格子，为了保证全零，后面的都只有一种选法
- 因此，枚举第一行翻转的子集，确定后面的翻转格子，判断能否全零即可
- m 比 n 小时，可以转置矩阵，节省时间
## 解答


```python
class Solution:
    def minFlips(self, mat: List[List[int]]) -> int:
        m,n = len(mat), len(mat[0])
        if m<n:
            m,n,mat = n,m,list(zip(*mat))
        A = [sum(row[j]<<j for j in range(n)) for row in mat]
        res = inf
        for st in range(1<<n):
            s,a,b = 0,0,st
            for x in A:
                s += b.bit_count()
                a,b = b,x^a^b^(b>>1)^((b<<1)%(1<<n))
            if b==0 and s<res:
                res = s
        return res if res<inf else -1 
```
0 ms
