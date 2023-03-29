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


## 分析

### #1

最简单的就是遍历每行，二分查找即可。

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    return any(target <= row[-1] and row[bisect_left(row, target)]==target for row in matrix)
```
时间 $O(M*logN)$，156ms

### #2

上一方法只利用了每行升序的条件，没有利用到每列升序的条件。

先在第 i=m//2 行二分查找到第一个 >=target 的位置 j，如果 matrix[i][j] != target，则：
- 位于矩形  (<0, 0>, <i, j-1>) 内的元素必然小于 target
- 位于矩形  (<i, j>, <m-1, n-1>) 内的元素必然大于 target
- 转为搜索矩形 (<i+1, 0>, <m-1, j-1>) 和矩形 (<0, j>, <i-1, n-1>)

搜索范围至少缩小了一半，递归搜索即可

## 解答

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    def help(x0, y0, x1, y1):
        if x0 > x1 or y0 > y1:
            return False
        i = x0 + (x1 - x0) // 2
        j = bisect_left(matrix[i], target, y0, y1+1)
        if j <= y1 and matrix[i][j] == target:
            return True
        return help(i+1, y0, x1, j-1) or help(x0, j, i - 1, y1)

    m, n = len(matrix), len(matrix[0])
    return help(0, 0, m-1, n-1)
```
时间 $O(log(M*N))$，176 ms

## *附加

还有个巧妙的双指针方法。
- 方法一中每行二分查找 target 得到的位置 j 必然是递减的
- 初始令 <i,j>=<0,n-1>
- 遍历每一行，移动 j 直到 matrix[i][j]<=target 即可
- j 最多移动 n 步，总共最多 m+n 步即可完成

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    i, j = 0, n-1
    for i in range(m):
        while j >= 0 and matrix[i][j] > target:
            j -= 1
        if j >= 0 and matrix[i][j] == target:
            return True
    return False
```
时间 $O(M+N)$，152 ms

