# 1074：元素和为目标值的子矩阵数量（2189 分）


> <u>**[力扣第 139 场周赛第 4 题](https://leetcode.cn/problems/number-of-submatrices-that-sum-to-target/)**</u>

## 题目

<p>给出矩阵 <code>matrix</code> 和目标值 <code>target</code>，返回元素总和等于目标值的非空子矩阵的数量。</p>

<p>子矩阵 <code>x1, y1, x2, y2</code> 是满足 <code>x1 &lt;= x &lt;= x2</code> 且 <code>y1 &lt;= y &lt;= y2</code> 的所有单元 <code>matrix[x][y]</code> 的集合。</p>

<p>如果 <code>(x1, y1, x2, y2)</code> 和 <code>(x1', y1', x2', y2')</code> 两个子矩阵中部分坐标不同（如：<code>x1 != x1'</code>），那么这两个子矩阵也不同。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/09/02/mate1.jpg" style="width: 242px; height: 242px;" /></p>

<pre>
<strong>输入：</strong>matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
<strong>输出：</strong>4
<strong>解释：</strong>四个只含 0 的 1x1 子矩阵。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[1,-1],[-1,1]], target = 0
<strong>输出：</strong>5
<strong>解释：</strong>两个 1x2 子矩阵，加上两个 2x1 子矩阵，再加上一个 2x2 子矩阵。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[904]], target = 0
<strong>输出：</strong>0
</pre>



<p><strong><strong>提示：</strong></strong></p>

<ul>
<li><code>1 &lt;= matrix.length &lt;= 100</code></li>
<li><code>1 &lt;= matrix[0].length &lt;= 100</code></li>
<li><code>-1000 &lt;= matrix[i][j] &lt;= 1000</code></li>
<li><code>-10^8 &lt;= target &lt;= 10^8</code></li>
</ul>


**相似问题：**
- [2556：二进制矩阵中翻转最多一次使路径不连通（2368 分）](/leetcode/2556)


## 分析

- 类似 {{< lc "0363" >}}，还更简单一点
- 假如 m>n，可以将矩阵转置，节省时间
## 解答


```python
class Solution:
    def numSubmatrixSumTarget(self, matrix: List[List[int]], target: int) -> int:
        res = 0
        m,n = len(matrix),len(matrix[0])
        if m>n:
            m,n,matrix = n,m,list(zip(*matrix))
        for x1 in range(m):
            A = [0]*n
            for x2 in range(x1,m):
                A = [a+b for a,b in zip(A,matrix[x2])]
                d = defaultdict(int)
                for s in accumulate([0]+A):
                    res += d[s-target]
                    d[s] += 1
        return res
```
580 ms
