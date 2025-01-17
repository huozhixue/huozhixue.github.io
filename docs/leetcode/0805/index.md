# 0805：数组的均值分割（1982 分）


> <u>**[力扣第 805 题](https://leetcode.cn/problems/split-array-with-same-average/)**</u>

## 题目

<p>给定你一个整数数组<meta charset="UTF-8" /> <code>nums</code></p>

<p>我们要将<meta charset="UTF-8" /> <code>nums</code> 数组中的每个元素移动到 <code>A</code> 数组 或者 <code>B</code> 数组中，使得 <code>A</code> 数组和<meta charset="UTF-8" /> <code>B</code> 数组不为空，并且<meta charset="UTF-8" /> <code>average(A) == average(B)</code> 。</p>

<p>如果可以完成则返回<code>true</code> ， 否则返回 <code>false</code>  。</p>

<p><strong>注意：</strong>对于数组<meta charset="UTF-8" /> <code>arr</code> , <meta charset="UTF-8" /> <code>average(arr)</code> 是<meta charset="UTF-8" /> <code>arr</code> 的所有元素的和除以<meta charset="UTF-8" /> <code>arr</code> 长度。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,3,4,5,6,7,8]
<strong>输出:</strong> true
<strong>解释: </strong>我们可以将数组分割为 [1,4,5,8] 和 [2,3,6,7], 他们的平均值都是4.5。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [3,1]
<strong>输出:</strong> false
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 30</code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [2035：将数组分成两个数组并最小化数组和的差（2489 分）](/leetcode/2035)
- [2256：最小平均差（1394 分）](/leetcode/2256)


## 分析

### #1

- 类似 {{< lc "0416" >}}，不过分割条件从和相等变成了平均数相等
	- 设 nums 的平均数是 avg，即是要分割成平均数都为 avg
	- 考虑将所有数都减去 avg，即变为分割成平均数为 0，等价于和为 0
	- 由于 avg 可能是浮点数，将所有数再乘以 n 保证是整数即可
- 设得到的数组是 A，问题转为求 A一个非空真子集满足和为 0
	- 类似 {{< lc "0416" >}}，递推值的集合即可
	- 注意必须真子集，考虑只遍历 A[:-1]，因为假如存在分割，必有一边是不含 A[-1] 的

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n,s = len(nums),sum(nums)
        A = [n*x-s for x in nums]
        vis = set()
        for a in A[:-1]:
            vis |= {a+b for b in vis|{0}}
            if 0 in vis:
                return True
        return False
```
1944 ms

### #2

- 还可以类似 {{< lc "0416" >}} ，用状压优化
- 有个问题是集合中有负数，不能压缩，一个巧妙的想法是：
	- 先遍历正数，再遍历负数
	- 一旦值为负数，必然已经遍历到负数，后面不可能变为 0 了，无需保存


```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n,s = len(nums),sum(nums)
        A = [n*x-s for x in nums]
        st = 0
        for a in sorted(A[:-1])[::-1]:
            if a>=0:
                st |= (st|1)<<a
            else:
                st |= st>>(-a)
            if st&1:
                return True
        return False
```
11 ms

### #3

- 针对 n 小值域大的情况，更通用的方法是折半搜索
- 分别遍历 A 的前/后半部分 B=A[:n//2]、C=A[n//2:]，得到所有子集和的集合 L、R
	- 如果 L 或 R 中有 0，即找到 A 的一个子集和为 0
	- 如果对 R 中的某个 x，存在 -x 在 L 中，即找到一个 A 的子集和为 0
- 注意要求真子集，考虑只遍历 C[:-1]，因为假如存在分割，必有一边是不含 C[-1] 的
- 注意 n=1 时不可能分割，此时 B 为空，C 有一个元素，刚好符合，不用特判

## 解答

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n,s = len(nums),sum(nums)
        A = [n*x-s for x in nums]
        B,C = A[:n//2],A[n//2:]
        L = set()
        for a in B:
            L |= {a+b for b in L|{0}}
            if 0 in L:
                return True
        R = set()
        for a in C[:-1]:
            for b in R|{0}:
                R.add(a+b)
                if a+b==0 or -a-b in L:
                    return True
        return False 
```
31 ms

