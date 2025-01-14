# 0749：隔离病毒（2277 分）


> <u>**[力扣第 749 题](https://leetcode.cn/problems/contain-virus/)**</u>

## 题目

<p>病毒扩散得很快，现在你的任务是尽可能地通过安装防火墙来隔离病毒。</p>

<p>假设世界由 <code>m x n</code> 的二维矩阵 <code>isInfected</code> 组成， <code>isInfected[i][j] == 0</code> 表示该区域未感染病毒，而  <code>isInfected[i][j] == 1</code> 表示该区域已感染病毒。可以在任意 2 个相邻单元之间的共享边界上安装一个防火墙（并且只有一个防火墙）。</p>

<p>每天晚上，病毒会从被感染区域向相邻未感染区域扩散，除非被防火墙隔离。现由于资源有限，每天你只能安装一系列防火墙来隔离其中一个被病毒感染的区域（一个区域或连续的一片区域），且该感染区域对未感染区域的威胁最大且 <strong>保证唯一 </strong>。</p>

<p>你需要努力使得最后有部分区域不被病毒感染，如果可以成功，那么返回需要使用的防火墙个数; 如果无法实现，则返回在世界被病毒全部感染时已安装的防火墙个数。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/01/virus11-grid.jpg" style="height: 255px; width: 500px;" /></p>

<pre>
<strong>输入:</strong> isInfected = [[0,1,0,0,0,0,0,1],[0,1,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]]
<strong>输出:</strong> 10
<strong>解释:</strong>一共有两块被病毒感染的区域。
在第一天，添加 5 墙隔离病毒区域的左侧。病毒传播后的状态是:
<img src="https://assets.leetcode.com/uploads/2021/06/01/virus12edited-grid.jpg" style="height: 261px; width: 500px;" />
第二天，在右侧添加 5 个墙来隔离病毒区域。此时病毒已经被完全控制住了。
<img src="https://assets.leetcode.com/uploads/2021/06/01/virus13edited-grid.jpg" style="height: 261px; width: 500px;" />
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/01/virus2-grid.jpg" style="height: 253px; width: 653px;" /></p>

<pre>
<strong>输入:</strong> isInfected = [[1,1,1],[1,0,1],[1,1,1]]
<strong>输出:</strong> 4
<strong>解释:</strong> 虽然只保存了一个小区域，但却有四面墙。
注意，防火墙只建立在两个不同区域的共享边界上。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> isInfected = [[1,1,1,0,0,0,0,0,0],[1,0,1,0,1,1,1,1,1],[1,1,1,0,0,0,0,0,0]]
<strong>输出:</strong> 13
<strong>解释:</strong> 在隔离右边感染区域后，隔离左边病毒区域只需要 2 个防火墙。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>m == isInfected.length</code></li>
<li><code>n == isInfected[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 50</code></li>
<li><code>isInfected[i][j]</code> is either <code>0</code> or <code>1</code></li>
<li>在整个描述的过程中，总有一个相邻的病毒区域，它将在下一轮 <strong>严格地感染更多未受污染的方块</strong> </li>
</ul>




**相似问题：**
- [2954：统计感冒序列的数目（2644 分）](/leetcode/2954)


## 分析

- 模拟即可
	- 数据较小，可以每次遍历获取所有的病毒连通块
	- 对于某个连通块，相邻的 0 的个数即是威胁度，与 0 相邻的边即是防火墙个数
	- 隔离的连通块可以将值改为 -1，从而不影响后续操作
- 注意到重要的只是连通块的边界，因此维护边界集合，每轮只遍历边界即可
	- 只通过边界更新连通块，需要用到并查集

## 解答


```python
class Solution:
    def containVirus(self, isInfected: List[List[int]]) -> int:
        def find(x):
            if f[x]!=x:
                f[x] = find(f[x])
            return f[x]

        def union(x,y):
            f[find(x)] = find(y)

        A = isInfected
        m, n = len(A), len(A[0])
        res = 0
        f = list(range(m*n))
        V = {(i,j) for i in range(m) for j in range(n) if A[i][j]==1}
        while True:
            for i,j in V:
                for x,y in [(i-1,j),(i+1,j),(i,j-1),(i,j+1)]:
                    if (x,y) in V:
                        union(i*n+j,x*n+y)
            T = defaultdict(set)
            W = defaultdict(int)
            for i,j in V:
                for x,y in [(i-1,j),(i+1,j),(i,j-1),(i,j+1)]:
                    if 0<=x<m and 0<=y<n and A[x][y]==0:
                        T[find((i*n+j))].add((x,y))
                        W[find((i*n+j))] += 1
            if not T:
                break
            mp = max(T,key=lambda p:len(T[p]))
            res += W[mp]
            for i,j in V:
                if find(i*n+j)==mp:
                    A[i][j] = -1
            del T[mp]
            V = set()
            for p in T:
                for x,y in T[p]:
                    A[x][y] = 1
                    union(p,x*n+y)
                    V.add((x,y))
        return res
```
50 ms
