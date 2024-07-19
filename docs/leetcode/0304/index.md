# 0304：二维区域和检索 - 矩阵不可变（★）


> <u>**[力扣第 304 题](https://leetcode.cn/problems/range-sum-query-2d-immutable/)**</u>

## 题目

<p><big><small>给定一个二维矩阵 <code>matrix</code>，</small></big>以下类型的多个请求：</p>

<ul>
<li><big><small>计算其子矩形范围内元素的总和，该子矩阵的 <strong>左上角</strong> 为 <code>(row1, col1)</code> ，<strong>右下角</strong> 为 <code>(row2, col2)</code> 。</small></big></li>
</ul>

<p>实现 <code>NumMatrix</code> 类：</p>

<ul>
<li><code>NumMatrix(int[][] matrix)</code> 给定整数矩阵 <code>matrix</code> 进行初始化</li>
<li><code>int sumRegion(int row1, int col1, int row2, int col2)</code> 返回<big><small> <strong>左上角</strong></small></big><big><small> <code>(row1, col1)</code> 、<strong>右下角</strong> <code>(row2, col2)</code></small></big> 所描述的子矩阵的元素 <strong>总和</strong> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<p><img src="https://pic.leetcode-cn.com/1626332422-wUpUHT-image.png" style="width: 200px;" /></p>

<pre>
<strong>输入:</strong>
["NumMatrix","sumRegion","sumRegion","sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]
<strong>输出:</strong>
[null, 8, 11, 12]

<strong>解释:</strong>
NumMatrix numMatrix = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (红色矩形框的元素总和)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (绿色矩形框的元素总和)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (蓝色矩形框的元素总和)
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code><meta charset="UTF-8" /></li>
<li><code>-10<sup>5</sup> &lt;= matrix[i][j] &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= row1 &lt;= row2 &lt; m</code></li>
<li><code>0 &lt;= col1 &lt;= col2 &lt; n</code></li>
<li><meta charset="UTF-8" />最多调用 <code>10<sup>4</sup></code> 次 <code>sumRegion</code> 方法</li>
</ul>


**相似问题：**
- [0303：区域和检索 - 数组不可变](/leetcode/0303)
- [0308：二维区域和检索 - 可变](/leetcode/0308)
- [3030：找出网格的区域平均强度（1896 分）](/leetcode/3030)


## 分析

- {{< lc "0303" >}} 的升级版，需要用二维前缀和
- 令 $ P[i][j]  = \sum_{\substack {0 \le r<i  \\\ 0 \le c<j }} matrix[r][c] $
- 则 $sumRegion(r1, c1, r2, c2) = P[r2+1][c2+1] -P[r1][c2+1]-P[r2+1][c1]+P[r1][c1]$


## 解答

```python
class NumMatrix:

    def __init__(self, matrix: List[List[int]]):
        self.P = [[0]+list(accumulate(col)) for col in zip(*matrix)]
        self.P = [[0]+list(accumulate(col)) for col in zip(*self.P)]


    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return self.P[row2+1][col2+1]-self.P[row1][col2+1]-self.P[row2+1][col1]+self.P[row1][col1]
```
355 ms

