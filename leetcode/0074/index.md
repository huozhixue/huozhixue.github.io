# 0074：搜索二维矩阵（★）


## 题目

编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

- 每行中的整数从左到右按升序排列。
- 每行的第一个整数大于前一行的最后一个整数。


<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/05/mat.jpg)

	输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
	输出：true
	
示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/mat2.jpg)

	输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
	输出：false


## 分析

### #1

显然按行拼接后就是个排序数组，然后用二分查找即可。

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
	arr = [num for row in matrix for num in row]
	i = bisect_left(arr, target)
	return i < len(arr) and arr[i] == target
```

时间复杂度 O(M*N)，32 ms

### #2

其实不需要真的创建新数组，利用模在 matrix 上模拟即可。

## 解答

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
	m, n = len(matrix), len(matrix[0])
	i, j = 0, m*n-1
	while i <= j:
		mid = i + (j-i)//2
		value = matrix[mid//n][mid%n]
		if value == target:
			return True
		if value > target:
			j = mid - 1
		else:
			i = mid + 1
	return False
```

时间复杂度 O(log(M*N))，24 ms
