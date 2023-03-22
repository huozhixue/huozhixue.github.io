# 0074：搜索二维矩阵（★）


> <u>**[力扣第 74 题](https://leetcode.cn/problems/search-a-2d-matrix/)**</u>

## 题目

<p>编写一个高效的算法来判断 <code>m x n</code> 矩阵中，是否存在一个目标值。该矩阵具有如下特性：</p>

<ul>
<li>每行中的整数从左到右按升序排列。</li>
<li>每行的第一个整数大于前一行的最后一个整数。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/mat.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/mat2.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 <= m, n <= 100</code></li>
<li><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
</ul>


## 分析

### #1

可以先二分查找定位是哪一行，再在该行中二分查找。

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    i = bisect_right(matrix, target, 1, key=lambda x: x[0])-1
    j = bisect_right(matrix[i], target, 1)-1
    return matrix[i][j]==target
```
时间复杂度 O(log(M*N))，40 ms

### #2

也可以将 matrix 看作一维升序数组，进行二分查找。注意下标的转换即可。

## 解答

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    x = bisect_left(range(m*n-1), target, key=lambda x: matrix[x//n][x%n])
    return matrix[x//n][x%n] == target
```
时间复杂度 O(log(M*N))，40 ms
