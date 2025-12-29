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


**相似问题：**
- [0402：移掉 K 位数字](/leetcode/0402)
- [0670：最大交换](/leetcode/0670)


## 分析

- 假设 nums1 删除 i 个，nums2 删除 m+n-k-i 个
- 删除 i 个得到的序列最大，即是问题 {{< lc "0402" >}} 
- 归并求出剩下 k 个数能拼成的最大数
	- 为了方便，归并时直接比较整个数组

## 解答

```python
class Solution:
    def maxNumber(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
        def gen(A,i):
            sk = []
            for c in A:
                while i and sk and sk[-1]<c:
                    sk.pop()
                    i -= 1
                sk.append(c)
            return sk[:-i] if i else sk

        m,n = len(nums1),len(nums2)
        res = [0]*k
        for i in range(min(m,m+n-k)+1):
            A = gen(nums1,i)
            B = gen(nums2,m+n-k-i)
            res = max(res,[max(A,B).pop(0) for _ in range(k)])
        return res
```
165 ms


## *附加

- 还有种依次选择每一位的贪心方法
- 先看第一位，为了尽可能大，先考虑选 9
	- 找到 nums1 第一个 9 的下标 i
		- 剩下的数在 nums1[i+1:] 和 nums2 中选
		- 如果够选，这即是一个最佳候选，可记为 <i+1,0>
	- 同理在 nums2 中看是否有一个最佳候选 <0,j+1>
	- 只要存在最佳候选，第一位便确定为 9，同时所有最佳候选参与下一轮
- 若 9 不可能，就继续考虑 8，依此类推
- 依此循环，选出 k 位即可

```python
class Solution:
    def maxNumber(self, nums1: List[int], nums2: List[int], k: int) -> List[int]:
        m,n = len(nums1),len(nums2)
        A1,A2 = ([[] for _ in range(10)] for _ in range(2))
        for i,x in enumerate(nums1):
            A1[x].append(i)
        for i,x in enumerate(nums2):
            A2[x].append(i)
        res = []
        Q = {(0,0)}
        for _ in range(k):
            for x in range(9,-1,-1):
                tmp = set()
                B1,B2 = A1[x],A2[x]
                for i,j in Q:
                    p1 = bisect_left(B1,i)
                    if p1<len(B1) and m-B1[p1]+n-j+len(res)>=k:
                        tmp.add((B1[p1]+1,j))
                    p2 = bisect_left(B2,j)
                    if p2<len(B2) and m-i+n-B2[p2]+len(res)>=k:
                        tmp.add((i,B2[p2]+1))
                if tmp:
                    Q = tmp
                    res.append(x)
                    break
        return res
```
73 ms
