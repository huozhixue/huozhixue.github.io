# 0004：寻找两个正序数组的中位数（★★）


> <u>**[力扣第 4 题](https://leetcode.cn/problems/median-of-two-sorted-arrays/)**</u>

## 题目

<p>给定两个大小分别为 <code>m</code> 和 <code>n</code> 的正序（从小到大）数组 <code>nums1</code> 和 <code>nums2</code>。请你找出并返回这两个正序数组的 <strong>中位数</strong> 。</p>

<p>算法的时间复杂度应该为 <code>O(log (m+n))</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,3], nums2 = [2]
<strong>输出：</strong>2.00000
<strong>解释：</strong>合并数组 = [1,2,3] ，中位数 2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,2], nums2 = [3,4]
<strong>输出：</strong>2.50000
<strong>解释：</strong>合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
</pre>





<p><strong>提示：</strong></p>

<ul>
<li><code>nums1.length == m</code></li>
<li><code>nums2.length == n</code></li>
<li><code>0 &lt;= m &lt;= 1000</code></li>
<li><code>0 &lt;= n &lt;= 1000</code></li>
<li><code>1 &lt;= m + n &lt;= 2000</code></li>
<li><code>-10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

### #1

最直接的就是合并后排序得到中位数。

```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
	nums, m, n = sorted(nums1+nums2), len(nums1), len(nums2)
	return (nums[(m+n-1)//2] + nums[(m+n)//2]) / 2
```
时间 $O((M+N)*log(M+N))$，44 ms

### #2

有个巧妙的想法:
- 假设 nums1[i-1]<=nums2[j] 且 nums2[j-1]<=nums1[i]，nums1[:i] 和 nums2[:j] 就是最小的 i+j 个数
- 当 i+j==(m+n)//2 时，即找到了最小的一半数，即可求出中位数
- 因此遍历和为 (m+n)//2 的  <i, j> 对，找到满足 nums1[i-1]<=nums2[j] 且 nums2[j-1]<=nums1[i] 的即可
- 注意 i 递增时，nums1[i-1]、nums1[i] 递增，nums2[j]、nums2[j-1] 递减，因此遍历找到第一个满足 nums2[j-1]<=nums1[i] 的即可。

为了方便，当 m>n 时，可以交换 nums1、nums2 使得 m<=n，排除边界情况。


```python
def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
    m, n = len(nums1), len(nums2)
    if m > n:
        return self.findMedianSortedArrays(nums2, nums1)
    i, j = 0, (m+n)//2
    while i < m and nums1[i] < nums2[j-1]:
        i += 1
        j -= 1
    left = max(nums1[i-1] if i else -inf, nums2[j-1] if j else -inf)
    right = min(nums1[i] if i<m else inf, nums2[j] if j<n else inf)
    return right if (m+n)%2 else (left+right)/2
```
时间 $O(min(M,N))$，40 ms

### #3

注意到如果 nums1[i] >= nums2[j-1]，必然有 nums1[i+1] >= nums2[j-2]，符合单调性，因此可以二分查找 i。

## 解答

```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        m, n = len(nums1), len(nums2)
        if m > n:
            return self.findMedianSortedArrays(nums2, nums1)
        i = bisect_left(range(m), True, key=lambda i:nums1[i]>=nums2[(m+n)//2-i-1])
        j = (m+n)//2-i
        left = max(nums1[i-1] if i else -inf, nums2[j-1] if j else -inf)
        right = min(nums1[i] if i<m else inf, nums2[j] if j<n else inf)
        return right if (m+n)%2 else (left+right)/2
```
时间 $O(log \ min(M,N))$，48 ms

