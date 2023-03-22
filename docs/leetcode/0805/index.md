# 0805：数组的均值分割（★★）


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


## 分析

### #1

类似 {{< lc "0416" >}}，不过分割条件从和相等变成了平均数相等。

什么情况下两者等价？平均数为 0 的时候。于是有个巧妙的想法：
- 将 nums 的数都减去平均数得到新数组 A，问题就等价于将 A 分割为和相等的两部分。
- 注意平均数可能为浮点数，为了精确，可以将 nums 的数都先乘以一个合适的 mul 使得平均数为整数。
- 转换完成后递推子集和的集合找 0 即可。

注意不能选取整个 A，因此考虑只遍历 A[:-1]，假如没有得到 0，即非真。证明：
- 假如 A[:-1] 的子集和都不为 0，那么 A[:-1] 的任意真子集 A' 的和不等于 sum(A[:-1])（因为 A[:-1]-A' 的和不为 0）
- 那么 A[-1] 和 A[:-1] 的任意真子集 A' 的总和不等于 sum(A)=0
- 因此 A 的任意真子集的和不为 0



```python
def splitArraySameAverage(self, nums: List[int]) -> bool:
    n, s = len(nums), sum(nums)
    mul = n//gcd(n, s)
    A = [num*mul-mul*s//n for num in nums]
    res = set()
    for x in A[:-1]:
        res |= {sub+x for sub in res|{0}}
        if 0 in res:
            return True
    return False
```
592 ms

### #2

还可以类似 {{< lc "0416" >}} 的状压优化方法，将集合状态压缩为一个数 state，优化递推时间。

这里有个问题是集合中有负数，不能压缩到 state 中。一个巧妙的想法是：
- 先遍历正数，再遍历负数
- 那么遇到某个子集和为负数时，必然已经遍历到负数，那么后面不可能变为 0 了，无需保存
- 所以只维护非负数的集合即可，可以压缩为 state

## 解答

```python
def splitArraySameAverage(self, nums: List[int]) -> bool:
    n, s = len(nums), sum(nums)
    mul = n//gcd(n, s)
    A = [num*mul-mul*s//n for num in nums]
    st = 0
    for x in sorted(A[:-1], reverse=True):
        st |= (st|1)<<x if x>=0 else st>>(-x)
        if st & 1:
            return True
    return False
```
36 ms


## *附加

本题还有个经典的优化方法，折半搜索：
- 先遍历 A 的前半部分 B=A[:n//2]，得到所有子集和的集合 S
- 如果 S 中没有 0，再遍历 A 的后半部分 C=A[n//2:]，得到所有子集和的集合 S2
- 如果 S2 中也没有 0，那遍历 S2 中 的 x，判断 -x 是否在 S 中即可。

注意不能选取整个 A，所以不考虑 x=sum(C) 的情况。证明：
- C 的子集和都不为 0，那么 C 的任意真子集的和不等于 sum(C)
- 因此 x=sum(C) 必然对应整个 C
- B 的子集和都不为 0，那么 B 的任意真子集的和不等于 sum(B)
- 因此 -x=sum(B) 必然对应整个 B

```python
def splitArraySameAverage(self, nums: List[int]) -> bool:
    n, s = len(nums), sum(nums)
    mul = n//gcd(n, s)
    A = [num*mul-mul*s//n for num in nums]
    S = set()
    for x in A[:n//2]:
        S |= {sub+x for sub in S|{0}}
        if 0 in S:
            return True
    S2, rs = set(), sum(A[n//2:])
    for x in A[n//2:]:
        for sub in S2|{0}:
            y = sub+x
            if y != rs and (y==0 or -y in S):
                return True
            S2.add(y)
    return False
```
64 ms
