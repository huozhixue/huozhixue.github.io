# 0718：最长重复子数组（★）


> <u>**[力扣第 718 题](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)**</u>

## 题目

<p>给两个整数数组 <code>nums1</code> 和 <code>nums2</code> ，返回 <em>两个数组中 <strong>公共的</strong> 、长度最长的子数组的长度 </em>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
<strong>输出：</strong>3
<strong>解释：</strong>长度最长的公共子数组是 [3,2,1] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
<strong>输出：</strong>5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums1.length, nums2.length &lt;= 1000</code></li>
<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 100</code></li>
</ul>


## 分析

### #1

令 dp[i][j] 代表最长的长度 size 使得 nums1[i-size:i]==nums2[j-size:j]，显然可以递推。

最后 dp 数组中的最大值即为所求。

				
```python
def findLength(self, nums1: List[int], nums2: List[int]) -> int:
    m, n = len(nums1), len(nums2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            dp[i][j] = 0 if nums1[i-1] != nums2[j-1] else 1+dp[i-1][j-1]
    return max(max(row) for row in dp)
```
时间复杂度 O(N*M)，2540 ms

### #2

还有个巧妙的方法，如果 nums1 和 nums2 存在长度 x 的公共子数组，那么对任意 y<x，必然也存在长度 y 的公共子数组。

因此令 check(x) 代表 nums1 和 nums2 是否存在长度 x 的公共子数组，该函数具有单调性，可以二分查找最大的 x，即为所求。

具体实现 check(x) 时，可以用滚动哈希在 O(N+M) 时间得到 nums1 和 nums2 所有长 x 的子数组的哈希值，判断是否有交集即可。

> 元素种类最多 100，用到的窗口种类最多 10^4，因此考虑 base 取 113，mod 取 10^9+7

## 解答

```python
def findLength(self, nums1: List[int], nums2: List[int]) -> int:
    def gen(A, L):
        ans, w, bL = set(), 0, pow(base, L, mod)
        for j, a in enumerate(A):
            w = w*base+a
            if j>=L:
                w -= A[j-L]*bL
            w %= mod
            if j>=L-1:
                ans.add(w)
        return ans

    base, mod = 113, 10**9+7
    self.__class__.__getitem__ = lambda self, L: not gen(nums1, L)&gen(nums2, L)
    return bisect_left(self, True, 1, len(nums1)+1)-1
```
时间复杂度 O((N+M)*logN)，108 ms

