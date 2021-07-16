# 0004：寻找两个正序数组的中位数（★★★）


## 题目

给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。

进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？


<!--more--> 

示例 1：

	输入：nums1 = [1,3], nums2 = [2]
	输出：2.00000
	解释：合并数组 = [1,2,3] ，中位数 2
	
示例 2：

	输入：nums1 = [1,2], nums2 = [3,4]
	输出：2.50000
	解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
	
示例 3：

	输入：nums1 = [0,0], nums2 = [0,0]
	输出：0.00000
	
示例 4：

	输入：nums1 = [], nums2 = [1]
	输出：1.00000
	
示例 5：

	输入：nums1 = [2], nums2 = []
	输出：2.00000

	
## 分析

### #1

最直接的就是合并后排序得到中位数。

```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
	nums, m, n = sorted(nums1+nums2), len(nums1), len(nums2)
	return (nums[(m+n-1)//2] + nums[(m+n)//2]) / 2
```

时间复杂度 O((M+N)*log(M+N))，44 ms

### #2

合并两个有序的数组，可以用归并在线性时间内完成。

因为只是找中位数，所以中途就可以返回。

```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
	m, n = len(nums1), len(nums2)
	res, i, j = 0, 0, 0
	while i < m or j < n:
		p = nums1[i] if i < m else float('inf')
		q = nums2[j] if j < n else float('inf')
		if i+j == (m+n-1) // 2:
			res += min(p, q)
		if i+j == (m+n) // 2:
			res += min(p, q)
			break
		if p < q:
			i += 1
		else:
			j += 1
	return res / 2
```

时间复杂度 O(M+N)，56 ms

### #3

这里有个巧妙的想法，上述的归并方法本质是找到最终的 i 和 j，使得 nums1[:i] 加 nums2[:j] 是两个数组中较小的 (m+n) // 2 个数。

所以问题可以转化为找到一对 (i, j=(m+n)//2-i) ，满足条件：
	
	i==m or j==0 or nums1[i] >= nums2[j-1]
	i==0 or j==n or nums2[j] >= nums1[i-1]

那么只要遍历 i，判断相应的 (i, j=(m+n)//2-i) 是否符合条件即可，时间复杂度减为 O(M)。

为了方便处理边界情况，可以令 left1、right1、left2、right2 分别代替 nums1[i-1]、nums1[i]、nums2[j-1]、nums2[j]，在边界处取无穷小或无穷大：

	left1 = nums1[i-1] if i > 0 else float('-inf')
	right1= nums1[i] if i < m else float('inf')
	left2 = nums2[j-1] if j > 0 else float('-inf')
	right2= nums2[j] if j < n else float('inf')

那么 (i, j=(m+n)//2-i) 要满足的条件变为：

	right1 >= left2
	right2 >= left1

找到符合条件的 (i, j) 后，即可确定中位数：

	若 m+n 是奇数，中位数是 min(right1, right2)
	若 m+n 是偶数，中位数是 (max(left1, left2) + min(right1,right2)) / 2

进一步的，遍历 i 和 j 都一样，因此可以遍历较短的数组。

```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
	m, n = len(nums1), len(nums2)
	if m > n:
		return self.findMedianSortedArrays(nums2, nums1)
	half = (m+n) // 2
	for i in range(m+1):
		j = half - i
		left1 = nums1[i-1] if i > 0 else float('-inf')
		left2 = nums2[j-1] if j > 0 else float('-inf')
		right1= nums1[i] if i < m else float('inf')
		right2= nums2[j] if j < n else float('inf')
		if right1 >= left2 and right2 >= left1:
			break
	return min(right1, right2) if (m+n)%2 else (max(left1, left2)+min(right1,right2)) / 2
```

时间复杂度 O(min(M,N))，48 ms

### #4

当 i 从 0 到 m 遍历时，right1-left2 是递增的，因此若对于某位置 i 处有 right1-left2 < 0，那么可以直接排除 i 之前的位置。

同理，right2-left1 是递减的，若在位置 i 处有 right2-left1 < 0，则可以直接排除 i 之后的位置。

若位置 i 满足了 right1 >= left2 and right2 >= left1，i 即是最终位置。

这正符合二分查找的条件，所以可以进一步优化时间。

## 解答

```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
	m, n = len(nums1), len(nums2)
	if m > n:
		return self.findMedianSortedArrays(nums2, nums1)
	half, l, r = (m+n) // 2, 0, m
	while l <= r:
		i = l + (r-l) // 2
		j = half - i
		left1 = nums1[i-1] if i > 0 else float('-inf')
		left2 = nums2[j-1] if j > 0 else float('-inf')
		right1= nums1[i] if i < m else float('inf')
		right2= nums2[j] if j < n else float('inf')
		if right1 < left2:
			l = i + 1
		elif right2 < left1:
			r = i - 1
		else:
			break
	return min(right1, right2) if (m+n)%2 else (max(left1, left2)+min(right1,right2)) / 2
```

时间复杂度 O(log min(M,N))，36 ms

