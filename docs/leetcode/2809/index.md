# 2809：使数组和小于等于 x 的最少时间（2978 分）


> <u>**[力扣第 110 场双周赛第 4 题](https://leetcode.cn/problems/minimum-time-to-make-array-sum-at-most-x/)**</u>

## 题目

<p>给你两个长度相等下标从 <strong>0</strong> 开始的整数数组 <code>nums1</code> 和 <code>nums2</code> 。每一秒，对于所有下标 <code>0 &lt;= i &lt; nums1.length</code> ，<code>nums1[i]</code> 的值都增加 <code>nums2[i]</code> 。操作 <strong>完成后</strong> ，你可以进行如下操作：</p>

<ul>
<li>选择任一满足 <code>0 &lt;= i &lt; nums1.length</code> 的下标 <code>i</code> ，并使 <code>nums1[i] = 0</code> 。</li>
</ul>

<p>同时给你一个整数 <code>x</code> 。</p>

<p>请你返回使 <code>nums1</code> 中所有元素之和 <strong>小于等于</strong> <code>x</code> 所需要的 <strong>最少</strong> 时间，如果无法实现，那么返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>nums1 = [1,2,3], nums2 = [1,2,3], x = 4
<b>输出：</b>3
<b>解释：</b>
第 1 秒，我们对 i = 0 进行操作，得到 nums1 = [0,2+2,3+3] = [0,4,6] 。
第 2 秒，我们对 i = 1 进行操作，得到 nums1 = [0+1,0,6+3] = [1,0,9] 。
第 3 秒，我们对 i = 2 进行操作，得到 nums1 = [1+1,0+2,0] = [2,2,0] 。
现在 nums1 的和为 4 。不存在更少次数的操作，所以我们返回 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>nums1 = [1,2,3], nums2 = [3,3,3], x = 4
<b>输出：</b>-1
<b>解释：</b>不管如何操作，nums1 的和总是会超过 x 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums1.length &lt;= 10<sup>3</sup></code></li>
<li><code>1 &lt;= nums1[i] &lt;= 10<sup>3</sup></code></li>
<li><code>0 &lt;= nums2[i] &lt;= 10<sup>3</sup></code></li>
<li><code>nums1.length == nums2.length</code></li>
<li><code>0 &lt;= x &lt;= 10<sup>6</sup></code></li>
</ul>




## 分析

- 首先，每个下标最多操作一次（否则第一次多余）
- 假设不操作，令 s1=sum(nums1),s2=sum(nums2)，第 i 秒的和为 s1+s2 * i
- 如果要操作的 i 个下标依次是 a1,a2,...,ai，减少的即是 f(i)=sum(nums[a1]+nums2[a1]*i) 
- 根据排序不等式，nums2[ai] 应该递增，f(i) 才会最大
- 因此，将下标按 nums2 排序，dp 即可求出 f(i)
- 枚举 i，判断是否 s1+s2 * i-f(i)<=x 即可

## 解答

```python []
class Solution:
    def minimumTime(self, nums1: List[int], nums2: List[int], x: int) -> int:
        A = sorted(zip(nums2,nums1))
        n = len(A)
        f = [0]*(n+1)
        for a,b in A:
            for i in range(n,0,-1):
                f[i] = max(f[i],f[i-1]+a*i+b)
        s1,s2 = sum(nums1),sum(nums2)
        for i in range(n+1):
            if s1+s2*i-f[i]<=x:
                return i    
        return -1
```
1094 ms


