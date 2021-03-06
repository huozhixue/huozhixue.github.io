# 0378：有序矩阵中第 K 小的元素（★★）



## 题目

给你一个 n x n 矩阵 matrix ，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
请注意，它是 排序后 的第 k 小元素，而不是第 k 个 不同 的元素。

提示：

- n == matrix.length
- n == matrix[i].length
- 1 <= n <= 300
- -10^9 <= matrix[i][j] <= 10^9
- 题目数据 保证 matrix 中的所有行和列都按 非递减顺序 排列
- 1 <= k <= n^2

 <!--more--> 
 
示例 1：

	输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
	输出：13
	解释：矩阵中的元素为 [1,5,9,10,11,12,13,13,15]，第 8 小元素是 13

示例 2：

	输入：matrix = [[-5]], k = 1
	输出：-5
 

## 分析

### #1

类似 {{< lc "0373" >}}，可以用堆实现归并排序 n 个列表，取第 k 项。

```python
def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
	n = len(matrix)
	pq = [(matrix[i][0], i, 0) for i in range(min(n, k))]
	for _ in range(k-1):
		_, i, j = heappop(pq)
		if j+1 < n:
			heappush(pq, (matrix[i][j+1], i, j+1))
	return heappop(pq)[0]
```

88 ms

### #2

还有个巧妙的二分查找方法。

## 解答

```python

```


