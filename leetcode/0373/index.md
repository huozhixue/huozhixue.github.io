# 0373：查找和最小的 K 对数字（★★）



## 题目

给定两个以升序排列的整形数组 nums1 和 nums2, 以及一个整数 k。

定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2。

找到和最小的 k 对数字 (u1,v1), (u2,v2) ... (uk,vk)。


 <!--more--> 
 
示例 1:

	输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
	输出: [1,2],[1,4],[1,6]
	解释: 返回序列中的前 3 对数：
		 [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

示例 2:

	输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
	输出: [1,1],[1,1]
	解释: 返回序列中的前 2 对数：
		 [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

示例 3:

	输入: nums1 = [1,2], nums2 = [3], k = 3 
	输出: [1,3],[2,3]
	解释: 也可能序列中所有的数对都被返回:[1,3],[2,3]

 
## 分析

### #1

最简单的就是排序后输出前 k 项。注意 nums1 和 nums2 可以只取前 k 项，节省时间。

排序可以用 sort，也可以用堆排序的 nsmallest。

```python
def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
	return nsmallest(k, [[a, b] for a, b in product(nums1[:k], nums2[:k])], key=sum)
```

312 ms

### #2

还能进一步优化时间。令二维矩阵 A[i][j] 代表 nums1[i]+nums2[j]，每一行都是升序列表。
问题等价于归并排序 len(nums1) 个列表，取前 k 项。类似于 {{< lc "0023" >}}。

## 解答

```python
def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
	m, n = len(nums1), len(nums2)
	pq = [(nums1[i]+nums2[0], i, 0) for i in range(min(m, k))]
	res = []
	for _ in range(min(k, m*n)):
		_, i, j = heappop(pq)
		res.append([nums1[i], nums2[j]])
		if j+1 < n:
			heappush(pq, (nums1[i]+nums2[j+1], i, j+1))
	return res
```

40 ms

