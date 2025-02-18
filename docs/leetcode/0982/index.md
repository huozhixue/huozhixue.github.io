# 0982：按位与为零的三元组（2084 分）


> <u>**[力扣第 121 场周赛第 4 题](https://leetcode.cn/problems/triples-with-bitwise-and-equal-to-zero/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，返回其中 <strong>按位与三元组</strong> 的数目。</p>

<p><strong>按位与三元组</strong> 是由下标 <code>(i, j, k)</code> 组成的三元组，并满足下述全部条件：</p>

<ul>
<li><code>0 &lt;= i &lt; nums.length</code></li>
<li><code>0 &lt;= j &lt; nums.length</code></li>
<li><code>0 &lt;= k &lt; nums.length</code></li>
<li><code>nums[i] &amp; nums[j] &amp; nums[k] == 0</code> ，其中 <code>&amp;</code> 表示按位与运算符。</li>
</ul>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,1,3]
<strong>输出：</strong>12
<strong>解释：</strong>可以选出如下 i, j, k 三元组：
(i=0, j=0, k=1) : 2 &amp; 2 &amp; 1
(i=0, j=1, k=0) : 2 &amp; 1 &amp; 2
(i=0, j=1, k=1) : 2 &amp; 1 &amp; 1
(i=0, j=1, k=2) : 2 &amp; 1 &amp; 3
(i=0, j=2, k=1) : 2 &amp; 3 &amp; 1
(i=1, j=0, k=0) : 1 &amp; 2 &amp; 2
(i=1, j=0, k=1) : 1 &amp; 2 &amp; 1
(i=1, j=0, k=2) : 1 &amp; 2 &amp; 3
(i=1, j=1, k=0) : 1 &amp; 1 &amp; 2
(i=1, j=2, k=0) : 1 &amp; 3 &amp; 2
(i=2, j=0, k=1) : 3 &amp; 2 &amp; 1
(i=2, j=1, k=0) : 3 &amp; 1 &amp; 2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,0,0]
<strong>输出：</strong>27
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>0 &lt;= nums[i] &lt; 2<sup>16</sup></code></li>
</ul>




## 分析

### #1

考虑将二元组的结果存在计数器中，然后再遍历第三个数即可。

```python
class Solution:
    def countTriplets(self, nums: List[int]) -> int:
        ct = Counter(x&y for x in nums for y in nums)
        return sum(ct[y] for x in nums for y in ct if x&y==0)
```
2463 ms

### #2

位运算卷积问题，可以用 [快速沃尔什变换](https://oi.wiki/math/poly/fwt/)优化。

```python
def fwt(A,L,tp):
    for x in range(L):
        k = 1<<x
        for i in range(0,1<<L,k<<1):
            for j in range(k):
                A[i+j] += A[i+j+k]*tp

class Solution:
    def countTriplets(self, nums: List[int]) -> int:
        L = max(nums).bit_length()
        A = [0]*(1<<L)
        for x in nums:
            A[x] += 1
        fwt(A,L,1)
        C = [a*a*a for a in A]
        fwt(C,L,-1)
        return C[0]
```
652 ms

### #3

由于最后只求 C[0]，可以直接根据 fwt 的过程计算 。

## 解答


```python
def fwt(A,L,tp):
    for x in range(L):
        k = 1<<x
        for i in range(0,1<<L,k<<1):
            for j in range(k):
                A[i+j] += A[i+j+k]*tp

class Solution:
    def countTriplets(self, nums: List[int]) -> int:
        L = max(nums).bit_length()
        A = [0]*(1<<L)
        for x in nums:
            A[x] += 1
        fwt(A,L,1)
        return sum(a*a*a*(-1 if i.bit_count()%2 else 1) for i,a in enumerate(A))
```
359 ms
