# 0493：翻转对（★★）


> <u>**[力扣第 493 题](https://leetcode.cn/problems/reverse-pairs/)**</u>

## 题目

<p>给定一个数组 <code>nums</code> ，如果 <code>i &lt; j</code> 且 <code>nums[i] &gt; 2*nums[j]</code> 我们就将 <code>(i, j)</code> 称作一个<strong><em>重要翻转对</em></strong>。</p>

<p>你需要返回给定数组中的重要翻转对的数量。</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入</strong>: [1,3,2,3,1]
<strong>输出</strong>: 2
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入</strong>: [2,4,3,5,1]
<strong>输出</strong>: 3
</pre>

<p><strong>注意:</strong></p>

<ol>
<li>给定数组的长度不会超过<code>50000</code>。</li>
<li>输入数组中的所有数字都在32位整数的表示范围内。</li>
</ol>


**相似问题：**
- [0315：计算右侧小于当前元素的个数](/leetcode/0315)
- [0327：区间和的个数](/leetcode/0327)


## 分析
  
- 遍历 j，找 nums[:j] 中大于 2*nums[j] 的个数。
- 容易想到用有序集合维护 nums[:j]，二分查找即可

## 解答

```python
class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        from sortedcontainers import SortedList
        res, sl = 0, SortedList()
        for x in nums:
            res += len(sl)-sl.bisect_right(x*2)
            sl.add(x)
        return res
```
479 ms

## *附加

还可以用 cdq 分治。

```python
class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        def cdq(A,l,r):
            if l==r:
                return 0
            m = (l+r)//2
            B,C = [],[]
            for i in A:
                (C if i>m else B).append(i)
            res = cdq(B,l,m)+cdq(C,m+1,r)
            k = 0
            for i in C:
                while k<len(B) and nums[B[k]]<=2*nums[i]:
                    k += 1
                res += len(B)-k
            return res
        n = len(nums)
        A = sorted(range(n),key=lambda i:nums[i])
        return cdq(A,0,n-1)
```
743 ms
