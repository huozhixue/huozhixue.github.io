# 0215：数组中的第K个最大元素（★）


> <u>**[力扣第 215 题](https://leetcode.cn/problems/kth-largest-element-in-an-array/)**</u>

## 题目

<p>给定整数数组 <code>nums</code> 和整数 <code>k</code>，请返回数组中第 <code><strong>k</strong></code> 个最大的元素。</p>

<p>请注意，你需要找的是数组排序后的第 <code>k</code> 个最大的元素，而不是第 <code>k</code> 个不同的元素。</p>

<p>你必须设计并实现时间复杂度为 <code>O(n)</code> 的算法解决此问题。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> <code>[3,2,1,5,6,4],</code> k = 2
<strong>输出:</strong> 5
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> <code>[3,2,3,1,2,4,5,5,6], </code>k = 4
<strong>输出:</strong> 4</pre>



<p><strong>提示： </strong></p>

<ul>
<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

### #1

要求 O(N)，考虑到值域较小，可以用计数排序。

```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        mi = min(nums)
        A = [x-mi for x in nums]
        ma = max(A)
        ct = [0]*(ma+1)
        for x in A:
            ct[x] += 1
        s = 0
        for x in range(ma,-1,-1):
            s += ct[x]
            if s>=k:
                return x+mi
```
91 ms

### #2

更通用的方法是用快排的思想：
- 为了避免大量重复元素引起的退化，采用三路划分
- 随机取一个数 x，按小于等于大于分为三个组 A、B、C
- 设三个组元素个数分别为 a,b,c
	- c>=k，转为求 C 中第 k 大的数
	- b+c<k，转为求 A 中第 k-b-c 大的数
	- c<k<=b+c，x 即为所求
- 每次只递归一边，时间复杂度 O(N)

## 解答


```python
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        def quick(A,k):
            x = random.choice(A)
            B = [[] for _ in range(3)]
            for a in A:
                i = 0 if a<x else 1 if a==x else 2 
                B[i].append(a)
            if len(B[2])>=k:
                return quick(B[2],k)
            if len(B[1])+len(B[2])<k:
                return quick(B[0],k-len(B[1])-len(B[2]))
            return x
        return quick(nums,k)
```
100 ms


