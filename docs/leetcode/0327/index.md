# 0327：区间和的个数（★★）


> <u>**[力扣第 327 题](https://leetcode.cn/problems/count-of-range-sum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 以及两个整数 <code>lower</code> 和 <code>upper</code> 。求数组中，值位于范围 <code>[lower, upper]</code> （包含 <code>lower</code> 和 <code>upper</code>）之内的 <strong>区间和的个数</strong> 。</p>

<p><strong>区间和</strong> <code>S(i, j)</code> 表示在 <code>nums</code> 中，位置从 <code>i</code> 到 <code>j</code> 的元素之和，包含 <code>i</code> 和 <code>j</code> (<code>i</code> ≤ <code>j</code>)。</p>


<strong>示例 1：</strong>

<pre>
<strong>输入：</strong>nums = [-2,5,-1], lower = -2, upper = 2
<strong>输出：</strong>3
<strong>解释：</strong>存在三个区间：[0,0]、[2,2] 和 [0,2] ，对应的区间和分别是：-2 、-1 、2 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0], lower = 0, upper = 0
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>-2<sup>31</sup> <= nums[i] <= 2<sup>31</sup> - 1</code></li>
<li><code>-10<sup>5</sup> <= lower <= upper <= 10<sup>5</sup></code></li>
<li>题目数据保证答案是一个 <strong>32 位</strong> 的整数</li>
</ul>


**相似问题：**
- [0315：计算右侧小于当前元素的个数](/leetcode/0315)
- [0493：翻转对](/leetcode/0493)
- [2563：统计公平数对的数目（1720 分）](/leetcode/2563)


## 分析

- 区间和容易想到前缀和，先得到前缀和数组 P
- 遍历 j，在 P[:j] 中找 [P[j]-upper,P[j]-lower] 范围内的个数即可
- 可以维护有序集合，二分即可

## 解答

```python
class Solution:
    def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
        from sortedcontainers import SortedList
        res, sl = 0, SortedList()
        for x in accumulate([0]+nums):
            res += sl.bisect_right(x-lower)-sl.bisect_left(x-upper)
            sl.add(x)
        return res
```
833 ms

## *附加

还可以用 cdq 分治，分成排好序的两部分，计算前半部分对后半部分的贡献。

```python
class Solution:
    def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
        def cdq(A,l,r):
            if l==r:
                return 0
            m = (l+r)//2
            B,C = [],[]
            for i in A:
                (C if i>m else B).append(i)
            res = cdq(B,l,m)+cdq(C,m+1,r)
            j,k=0,0
            for i in C:
                while k<len(B) and P[B[k]]<=P[i]-lower:
                    k += 1
                while j<len(B) and P[B[j]]<P[i]-upper:
                    j += 1
                res += k-j
            return res
        P = [0]+list(accumulate(nums))
        n = len(P)
        A = sorted(range(n),key=lambda i:P[i])
        return cdq(A,0,n-1)
```
1067 ms
