# 0240：搜索二维矩阵 II（★）


> <u>**[力扣第 240 题](https://leetcode.cn/problems/search-a-2d-matrix-ii/)**</u>

## 题目

<p>编写一个高效的算法来搜索 <code><em>m</em> x <em>n</em></code> 矩阵 <code>matrix</code> 中的一个目标值 <code>target</code> 。该矩阵具有以下特性：</p>

<ul>
<li>每行的元素从左到右升序排列。</li>
<li>每列的元素从上到下升序排列。</li>
</ul>



<p><b>示例 1：</b></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/searchgrid2.jpg" />
<pre>
<b>输入：</b>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
<b>输出：</b>true
</pre>

<p><b>示例 2：</b></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/searchgrid.jpg" />
<pre>
<b>输入：</b>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
<b>输出：</b>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 &lt;= n, m &lt;= 300</code></li>
<li><code>-10<sup>9</sup> &lt;= matrix[i][j] &lt;= 10<sup>9</sup></code></li>
<li>每行的所有元素从左到右升序排列</li>
<li>每列的所有元素从上到下升序排列</li>
<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0074：搜索二维矩阵](/leetcode/0074)


## 分析

- 最简单的就是遍历每行，二分查找即可
- 注意到每行二分查找到的位置 j 是递减的
- 因此令 j 初始在最右边，遍历每行并移动 j，即可线性时间完成

## 解答

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        j = len(matrix[0])-1
        for row in matrix:
            while j>=0 and row[j]>target:
                j -= 1
            if row[j]==target:
                return True
        return False
```
153 ms


## *附加

还可以考虑直接对矩阵二分：
- 先在第 i=m//2 行二分查找到第一个 >=target 的位置 j，假如不等于 target
- 矩形 <0,0,i,j-1> 内的元素必然 < target
- 矩形  <i, j, m-1, n-1>)内的元素必然大于 target
- 只用再搜索矩形 <i+1, 0,m-1, j-1> 和矩形 <0, j, i-1, n-1> 即可

## 解答

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        def dfs(x1, y1, x2, y2):
            if x1>x2 or y1>y2:
                return False
            i = (x1+x2)//2
            j = bisect_left(matrix[i], target, y1, y2+1)
            if j<=y2 and matrix[i][j]==target:
                return True
            return dfs(i+1,y1,x2,j-1) or dfs(x1,j,i-1,y2)

        m, n = len(matrix), len(matrix[0])
        return dfs(0,0,m-1,n-1)
```
时间 $O(log(M*N))$，159 ms





