# 0074：搜索二维矩阵（★）


## 题目

编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

- 每行中的整数从左到右按升序排列。
- 每行的第一个整数大于前一行的最后一个整数。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/05/mat.jpg)

	输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
	输出：true
	
示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/mat2.jpg)

	输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
	输出：false


提示：
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 100
- -10^4 <= matrix[i][j], target <= 10^4

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
