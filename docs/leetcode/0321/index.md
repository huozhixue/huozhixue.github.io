# 0321：拼接最大数（★★★）


> <u>**[力扣第 321 题](https://leetcode.cn/problems/create-maximum-number/)**</u>

## 题目

<p>给定长度分别为 <code>m</code> 和 <code>n</code> 的两个数组，其元素由 <code>0-9</code> 构成，表示两个自然数各位上的数字。现在从这两个数组中选出 <code>k (k &lt;= m + n)</code> 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。</p>

<p>求满足该条件的最大数。结果返回一个表示该最大数的长度为 <code>k</code> 的数组。</p>

<p><strong>说明: </strong>请尽可能地优化你算法的时间和空间复杂度。</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong>
nums1 = <code>[3, 4, 6, 5]</code>
nums2 = <code>[9, 1, 2, 5, 8, 3]</code>
k = <code>5</code>
<strong>输出:</strong>
<code>[9, 8, 6, 5, 3]</code></pre>

<p><strong>示例 2:</strong></p>

<pre><strong>输入:</strong>
nums1 = <code>[6, 7]</code>
nums2 = <code>[6, 0, 4]</code>
k = <code>5</code>
<strong>输出:</strong>
<code>[6, 7, 6, 0, 4]</code></pre>

<p><strong>示例 3:</strong></p>

<pre><strong>输入:</strong>
nums1 = <code>[3, 9]</code>
nums2 = <code>[8, 9]</code>
k = <code>3</code>
<strong>输出:</strong>
<code>[9, 8, 9]</code></pre>


## 分析

假设 nums1 取出 x 个，nums2 取出 k-x 个：
- 显然应该使 nums1 取出的 x 个数拼成的数最大，这等价于 {{< lc "0402" >}} 
- 同理取出 nums2 的数
- 可以归求出这 k 个数能拼成的最大数

那么遍历 x，分别计算即可。

> 注意归并时当两个指针指向元素相等，要比较后面的元素。为了方便，可以直接比较数组后缀。

	
## 解答

```python
def maxNumber(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
    def select(A, i):
        stack, j = [], len(A)-i
        for x in A:
            while j and stack and stack[-1]<x:
                stack.pop()
                j -= 1
            stack.append(x)
        return stack[:i]

    def gen(i):
        A, B = select(nums1, i), select(nums2, k-i)
        return [max(A,B).pop(0) for _ in range(k)]

    m, n = len(nums1), len(nums2)
    return max(gen(i) for i in range(max(0, k-n), min(m,k)+1))
```
224 ms
