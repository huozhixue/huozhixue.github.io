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
