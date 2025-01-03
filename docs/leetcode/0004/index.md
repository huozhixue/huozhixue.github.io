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


**相似问题：**
- [2387：行排序矩阵的中位数](/leetcode/2387)


## 分析

- 假设中位数为 x，那么可以用 x 将 nums1 和 nums2 划分为两部分，满足
	- nums1[i-1]<=x<=nums1[i]
	- nums2[j-1]<=x<=nums2[j]
	- i+j=(m+n)//2
- 反过来，如果找到一组 (i,j)，满足
	- nums1[i-1]<=nums2[j]
	- num2[j-1]<=nums1[i]
	- i+j=(m+n)//2
	便定位了中位数
- 注意到 nums1 和 nums2 都递增，那么只需找到第一个 i 满足
	- nums2[(m+n)//2-i-1]<=nums1[i]
- 这就是典型的二分查找了

再考虑边界情况：
- 为了方便，当 m>n 时，交换 nums1、nums2，不需计算 i 的边界
- m+n 为偶数时，要找到两个中位数取平均
- 为了方便处理 i 或 j 在最左/右的情况，在 nums1/nums2 前后添加哨兵
## 解答

```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A,B = [-inf]+nums1+[inf],[-inf]+nums2+[inf]
        if len(A)>len(B):
            A,B = B,A
        m,n = len(A),len(B)
        k = (m+n)//2
        i = bisect_left(range(m),True,key=lambda i:A[i]>=B[k-i-1])
        a = max(A[i-1],B[k-i-1])
        b = min(A[i],B[k-i])
        return b if (m+n)%2 else (a+b)/2
```
时间 $O(log \ min(M,N))$，0 ms

