# 0962：最大宽度坡（★★）




## 题目

给定一个整数数组 A，坡是元组 (i, j)，其中  i < j 且 A[i] <= A[j]。这样的坡的宽度为 j - i。

找出 A 中的坡的最大宽度，如果不存在，返回 0 。

提示：

- 2 <= A.length <= 50000
- 0 <= A[i] <= 50000


 <!--more--> 
 
示例 1：

	输入：[6,0,8,2,1,5]
	输出：4
	解释：
	最大宽度的坡为 (i, j) = (1, 5): A[1] = 0 且 A[5] = 5.

示例 2：

	输入：[9,8,1,0,1,9,4,0,4,1]
	输出：7
	解释：
	最大宽度的坡为 (i, j) = (2, 9): A[2] = 1 且 A[9] = 1.
 


## 分析

### #1

暴力法就是遍历位置 j，在 A[:j] 中找最小的 i 使得 A[i] <= A[j]。

注意到如果 x < y 且 A[x] <= A[y]，显然 y 不可能是答案。
因此可以维护一个严格递减的列表 tmp，保存有用的位置。
然后每轮在 tmp 中二分查找第一个小于等于 A[j] 的位置即可。

```python
def maxWidthRamp(self, A: List[int]) -> int:
	res, tmp = 0, []
	self.__class__.__getitem__ = lambda self, x: A[tmp[x]] <= A[j]
	for j in range(len(A)):
		pos = bisect_left(self, True, 0, len(tmp))
		if pos < len(tmp):
			res = max(res, j - tmp[pos])
		if not tmp or A[j] < A[tmp[-1]]:
			tmp.append(j)
	return res
```

536 ms

### #2

还有个巧妙地单调栈解法。

先一趟遍历得到完整的 tmp，最大宽度坡的开头必然在 tmp 中。
然后反向遍历 j，对于 tmp 中满足 A[i] <= A[j] 的位置 i， i 能对应的最大宽度坡的结尾即为 j，可以弹出 i。

## 解答

```python
def maxWidthRamp(self, A: List[int]) -> int:
	stack, n = [], len(A)
	for i in range(n):
		if not stack or A[i] < A[stack[-1]]:
			stack.append(i)
	res = 0
	for j in range(n-1, -1, -1):
		while stack and A[stack[-1]] <= A[j]:
			res = max(res, j-stack.pop())
	return res
```

308 ms
