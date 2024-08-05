# 0542：01 矩阵（★）


> <u>**[力扣第 542 题](https://leetcode.cn/problems/01-matrix/)**</u>

## 题目

<p>给定一个由 <code>0</code> 和 <code>1</code> 组成的矩阵 <code>mat</code> ，请输出一个大小相同的矩阵，其中每一个格子是 <code>mat</code> 中对应位置元素到最近的 <code>0</code> 的距离。</p>

<p>两个相邻元素间的距离为 <code>1</code> 。</p>



<p><b>示例 1：</b></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626667201-NCWmuP-image.png" style="width: 150px; " /></p>

<pre>
<strong>输入：</strong>mat =<strong> </strong>[[0,0,0],[0,1,0],[0,0,0]]
<strong>输出：</strong>[[0,0,0],[0,1,0],[0,0,0]]
</pre>

<p><b>示例 2：</b></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626667205-xFxIeK-image.png" style="width: 150px; " /></p>

<pre>
<b>输入：</b>mat =<b> </b>[[0,0,0],[0,1,0],[1,1,1]]
<strong>输出：</strong>[[0,0,0],[0,1,0],[1,2,1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == mat.length</code></li>
<li><code>n == mat[i].length</code></li>
<li><code>1 <= m, n <= 10<sup>4</sup></code></li>
<li><code>1 <= m * n <= 10<sup>4</sup></code></li>
<li><code>mat[i][j] is either 0 or 1.</code></li>
<li><code>mat</code> 中至少有一个 <code>0 </code></li>
</ul>


**相似问题：**
- [1730：获取食物的最短路径](/leetcode/1730)
- [2123：使矩阵中的 1 互不相邻的最小操作数](/leetcode/2123)
- [2482：行和列中一和零的差值（1372 分）](/leetcode/2482)


## 分析

典型的多源 bfs。

## 解答


```python
class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        m,n = len(mat),len(mat[0])
        Q = deque((0,i,j) for i in range(m) for j in range(n) if mat[i][j]==0)
        res = [[0]*n for _ in range(m)]
        while Q:
            w,i,j = Q.popleft()
            for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                if 0<=x<m and 0<=y<n and mat[x][y]==1:
                    res[x][y] = w+1
                    Q.append((w+1,x,y))
                    mat[x][y] = 0
        return res
```
161 ms
