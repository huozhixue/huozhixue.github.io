# 0801：使序列递增的最小交换次数（2066 分）


> <u>**[力扣第 801 题](https://leetcode.cn/problems/minimum-swaps-to-make-sequences-increasing/)**</u>

## 题目

<p>我们有两个长度相等且不为空的整型数组 <code>nums1</code> 和 <code>nums2</code> 。在一次操作中，我们可以交换 <code>nums1[i]</code> 和 <code>nums2[i]</code>的元素。</p>

<ul>
<li>例如，如果 <code>nums1 = [1,2,3,<u>8</u>]</code> ， <code>nums2 =[5,6,7,<u>4</u>]</code> ，你可以交换 <code>i = 3</code> 处的元素，得到 <code>nums1 =[1,2,3,4]</code> 和 <code>nums2 =[5,6,7,8]</code> 。</li>
</ul>

<p>返回 <em>使 <code>nums1</code> 和 <code>nums2</code> <strong>严格递增 </strong>所需操作的最小次数</em> 。</p>

<p>数组 <code>arr</code> <strong>严格递增</strong> 且  <code>arr[0] &lt; arr[1] &lt; arr[2] &lt; ... &lt; arr[arr.length - 1]</code> 。</p>

<p><b>注意：</b></p>

<ul>
<li>用例保证可以实现操作。</li>
</ul>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums1 = [1,3,5,4], nums2 = [1,2,3,7]
<strong>输出:</strong> 1
<strong>解释: </strong>
交换 A[3] 和 B[3] 后，两个数组如下:
A = [1, 3, 5, 7] ， B = [1, 2, 3, 4]
两个数组均为严格递增的。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
<strong>输出:</strong> 1
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>2 &lt;= nums1.length &lt;= 10<sup>5</sup></code></li>
<li><code>nums2.length == nums1.length</code></li>
<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 2 * 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [2111：使数组 K 递增的最少操作次数（1940 分）](/leetcode/2111)
- [2934：最大化数组末位元素的最少操作次数（1802 分）](/leetcode/2934)


## 分析

最后一对元素交换/不交换是否有效只与倒数第二对元素的状态有关。

为了方便递推，令：
- dp[i][0] 代表第 i 对不交换的情况下使前 i 对有效的最小次数
- dp[i][1] 代表第 i 对交换的情况下使前 i 对有效的最小次数

即可由 dp[i] 递推得到 dp[i+1]。还可以用滚动数组优化。

## 解答

```python
def minSwap(self, nums1: List[int], nums2: List[int]) -> int:
    n = len(nums1)
    a, b = 0, 1
    for i in range(1, n):
        a2 = b2 = float('inf')
        if nums1[i]>nums1[i-1] and nums2[i]>nums2[i-1]:
            a2, b2 = min(a2, a), min(b2, b+1)
        if nums1[i]>nums2[i-1] and nums2[i]>nums1[i-1]:
            a2, b2 = min(a2, b), min(b2, a+1)
        a, b = a2, b2
    return min(a, b)
```
312 ms

