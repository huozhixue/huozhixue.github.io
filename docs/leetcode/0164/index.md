# 0164：最大间距（★★）


> <u>**[力扣第 164 题](https://leetcode.cn/problems/maximum-gap/)**</u>

## 题目

<p>给定一个无序的数组 <code>nums</code>，返回 <em>数组在排序之后，相邻元素之间最大的差值</em> 。如果数组元素个数小于 2，则返回 <code>0</code> 。</p>

<p>您必须编写一个在「线性时间」内运行并使用「线性额外空间」的算法。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [3,6,9,1]
<strong>输出:</strong> 3
<strong>解释:</strong> 排序后的数组是 [1,3,6,9]<strong><em>, </em></strong>其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [10]
<strong>输出:</strong> 0
<strong>解释:</strong> 数组元素个数小于 2，因此返回 0。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

### #1

最简单的是排序后遍历间距即可。

```python
def maximumGap(self, nums: List[int]) -> int:
    return max([b-a for a,b in pairwise(sorted(nums))], default=0)
```
180 ms

### #2

要求线性时间排序，数据范围又较大，考虑用桶排序。
- 根据抽屉原理，最大间距必定 >= (max(nums)-min(nums)) // (N-1)
- 取该下界作为桶长 size，桶内元素的间距小于最大间距，无需再比较
- 比较相邻桶的间距即可，而最多 N 个桶，故满足 O(N) 时间
- 特别注意 size 不能取 0
 
## 解答

```python
def maximumGap(self, nums: List[int]) -> int:
    n, Min, Max = len(nums), min(nums), max(nums)
    if n < 2:
        return 0
    B, size = defaultdict(list), max(1, (Max-Min)//(n-1))
    for x in nums:
        B[x//size].append(x)
    res, pre = 0, float('inf')
    for key in range(Min//size, Max//size+1):
        if key in B:
            res = max(res, min(B[key])-pre)
            pre = max(B[key])
    return res
```
492 ms



