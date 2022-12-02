# 0004：寻找两个正序数组的中位数（★★★）


## 题目

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。


示例 1：

	输入：nums1 = [1,3], nums2 = [2]
	输出：2.00000
	解释：合并数组 = [1,2,3] ，中位数 2

示例 2：

	输入：nums1 = [1,2], nums2 = [3,4]
	输出：2.50000
	解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 


提示：
- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10^6 <= nums1[i], nums2[i] <= 10^6

## 分析

### #1

最直接的就是合并后排序得到中位数。

```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
	nums, m, n = sorted(nums1+nums2), len(nums1), len(nums2)
	return (nums[(m+n-1)//2] + nums[(m+n)//2]) / 2
```
时间复杂度 $O((M+N)*log(M+N))$，44 ms

### #2

有个巧妙的想法:
- 假设 nums1[i-1]<=nums2[j] 且 nums2[j-1]<=nums1[i]，nums1[:i] 和 nums2[:j] 就是最小的 i+j 个数
- 当 i+j==(m+n)//2 时，即找到了最小的一半数，即可求出中位数
- 因此遍历和为 (m+n)//2 的  <i, j> 对，找到满足 nums1[i-1]<=nums2[j] 且 nums2[j-1]<=nums1[i] 的即可

注意 i 递增时，nums1[i-1]、nums1[i] 递增，nums2[j]、nums2[j-1] 递减，因此遍历找到第一个满足 nums2[j-1]<=nums1[i] 的即可。

为了方便，当 m>n 时，可以交换 nums1、nums2 使得 m<=n，排除边界情况。


```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
    m, n = len(nums1), len(nums2)
    if m > n:
        return self.findMedianSortedArrays(nums2, nums1)
    i, j = 0, (m+n) // 2
    while i < m and nums1[i] < nums2[j-1]:
        i += 1
        j -= 1
    left = max(nums1[i-1] if i else float('-inf'), nums2[j-1] if j else float('-inf'))
    right = min(nums1[i] if i<m else float('inf'), nums2[j]if j<n else float('inf'))
    return right if (m + n) % 2 else (left+right) / 2
```
时间复杂度 $O(min(M,N))$，40 ms

### #3

注意到如果 nums1[i] >= nums2[j-1]，必然有 nums1[i+1] >= nums2[j-2]，符合单调性，因此可以二分查找 i。

## 解答

```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
    m, n = len(nums1), len(nums2)
    if m > n:
        return self.findMedianSortedArrays(nums2, nums1)
    self.__class__.__getitem__ = lambda self, i: i == m or nums1[i] >= nums2[(m+n)//2-i-1]
    i = bisect_left(self, True, 0, m)
    j = (m+n)//2-i
    left = max(nums1[i - 1] if i else float('-inf'), nums2[j - 1] if j else float('-inf'))
    right = min(nums1[i] if i < m else float('inf'), nums2[j] if j < n else float('inf'))
    return right if (m + n) % 2 else (left + right) / 2
```
时间复杂度 $O(log \ min(M,N))$，28 ms

