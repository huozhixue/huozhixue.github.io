# 0321：拼接最大数（★★）


> <u>**[力扣第 321 题](https://leetcode.cn/problems/create-maximum-number/)**</u>

## 题目

<p>给你两个整数数组 <code>nums1</code> 和 <code>nums2</code>，它们的长度分别为 <code>m</code> 和 <code>n</code>。数组 <code>nums1</code> 和 <code>nums2</code> 分别代表两个数各位上的数字。同时你也会得到一个整数 <code>k</code>。</p>

<p>请你利用这两个数组中的数字中创建一个长度为 <code>k &lt;= m + n</code> 的最大数，在这个必须保留来自同一数组的数字的相对顺序。</p>

<p>返回代表答案的长度为 <code>k</code> 的数组。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5
<strong>输出：</strong>[9,8,6,5,3]
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [6,7], nums2 = [6,0,4], k = 5
<strong>输出：</strong>[6,7,6,0,4]
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [3,9], nums2 = [8,9], k = 3
<strong>输出：</strong>[9,8,9]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == nums1.length</code></li>
<li><code>n == nums2.length</code></li>
<li><code>1 &lt;= m, n &lt;= 500</code></li>
<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 9</code></li>
<li><code>1 &lt;= k &lt;= m + n</code></li>
</ul>


## 分析

- 假设 nums1 取出 i 个，nums2 取出 k-i 个
- 显然应该使 nums1 取出的 i 个数拼成的数最大，这等价于 {{< lc "0402" >}} 
	- 同理取出 nums2 的数
- 归求出这 k 个数能拼成的最大数
	- 为了方便，归并时直接比较整个数组

	
## 解答

```python
class Solution:
    def maxNumber(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
        def gen(A,i):
            sk,j = [],len(A)-i
            for c in A:
                while j and sk and sk[-1]<c:
                    sk.pop()
                    j -= 1
                sk.append(c)
            return sk[:i]

        m,n = len(nums1),len(nums2)
        res = [0]*k
        for i in range(max(0, k-n),min(m,k)+1):
            A = gen(nums1,i)
            B = gen(nums2,k-i)
            res = max(res,[max(A,B).pop(0) for _ in range(k)])
        return res
```
164 ms
