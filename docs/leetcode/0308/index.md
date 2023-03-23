# 0308：二维区域和检索 - 可变（★★）


> <u>**[力扣第 308 题](https://leetcode.cn/problems/range-sum-query-2d-mutable/)**</u>

## 题目

<p>给你一个二维矩阵 <code>matrix</code> ，处理以下类型的多个查询:</p>

<ol>
<li><strong>更新</strong> <code>matrix</code> 中单元格的值。</li>
<li>计算由 <strong>左上角</strong> <code>(row1, col1)</code> 和 <strong>右下角</strong> <code>(row2, col2)</code> 定义的 <code>matrix</code> 内矩阵元素的 <strong>和</strong>。</li>
</ol>

<p>实现 <code>NumMatrix</code> 类：</p>

<ul>
<li><code>NumMatrix(int[][] matrix)</code> 用整数矩阵 <code>matrix</code> 初始化对象。</li>
<li><code>void update(int row, int col, int val)</code> <strong>更新</strong> <code>matrix[row][col]</code> 的值到 <code>val</code> 。</li>
<li><code>int sumRegion(int row1, int col1, int row2, int col2)</code> 返回矩阵 <code>matrix</code> 中指定矩形区域元素的 <strong>和</strong> ，该区域由 <strong>左上角</strong> <code>(row1, col1)</code> 和 <strong>右下角</strong> <code>(row2, col2)</code> 界定。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/summut-grid.jpg" style="height: 222px; width: 500px;" />
<pre>
<strong>输入</strong>
["NumMatrix", "sumRegion", "update", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [3, 2, 2], [2, 1, 4, 3]]
<strong>输出</strong>
[null, 8, null, 10]

<strong>解释</strong>
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // 返回 8 (即, 左侧红色矩形的和)
numMatrix.update(3, 2, 2);       // 矩阵从左图变为右图
numMatrix.sumRegion(2, 1, 4, 3); // 返回 10 (即，右侧红色矩形的和)
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>-10<sup>5</sup> &lt;= matrix[i][j] &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= row &lt; m</code></li>
<li><code>0 &lt;= col &lt; n</code></li>
<li><code>-10<sup>5</sup> &lt;= val &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= row1 &lt;= row2 &lt; m</code></li>
<li><code>0 &lt;= col1 &lt;= col2 &lt; n</code></li>
<li>最多调用<code>10<sup>4</sup></code> 次 <code>sumRegion</code> 和 <code>update</code> 方法</li>
</ul>


## 分析

{{< lc "0304" >}} 升级版，元素不固定了。

朴素的想法是维护每一行的前缀和即可，update 时间 O(N)，sumRegion 时间 O(M)。

## 解答

```python
class NumMatrix:

    def __init__(self, matrix: List[List[int]]):
        self.matrix = matrix
        self.P = [list(accumulate([0]+sub)) for sub in matrix]

    def update(self, row: int, col: int, val: int) -> None:
        self.matrix[row][col] = val
        self.P[row] = list(accumulate([0]+self.matrix[row]))

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return sum(self.P[r][col2+1]-self.P[r][col1] for r in range(row1, row2+1))
```
52 ms

## *附加

类似 {{< lc "0307" >}} ，也可以用树状数组解决，采用二维树状数组。

```python
class NumMatrix:

    def __init__(self, matrix: List[List[int]]):
        m, n = len(matrix), len(matrix[0])
        self.matrix = matrix
        self.tree = [[0]*(n+1) for _ in range(m+1)]
        for i, j in product(range(m), range(n)):
            self.add(i+1, j+1, matrix[i][j])

    def lowbit(self, x):
        return x & -x

    def add(self, i, j, x):
        while i < len(self.tree):
            k = j
            while k < len(self.tree[0]):
                self.tree[i][k] += x
                k += self.lowbit(k)
            i += self.lowbit(i)

    def query(self, i, j):
        res = 0
        while i:
            k = j
            while k:
                res += self.tree[i][k]
                k -= self.lowbit(k)
            i -= self.lowbit(i)
        return res

    def update(self, row: int, col: int, val: int) -> None:
        self.add(row+1, col+1, val-self.matrix[row][col])
        self.matrix[row][col] = val

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return self.query(row2+1, col2+1)-self.query(row1, col2+1)-self.query(row2+1, col1)+self.query(row1, col1)
```
320 ms

