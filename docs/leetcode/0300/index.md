# 0300：最长递增子序列（★）


> <u>**[力扣第 300 题](https://leetcode.cn/problems/longest-increasing-subsequence/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，找到其中最长严格递增子序列的长度。</p>

<p><strong>子序列 </strong>是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，<code>[3,6,2,7]</code> 是数组 <code>[0,3,1,6,2,2,7]</code> 的子序列。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [10,9,2,5,3,7,101,18]
<strong>输出：</strong>4
<strong>解释：</strong>最长递增子序列是 [2,3,7,101]，因此长度为 4 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1,0,3,2,3]
<strong>输出：</strong>4
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [7,7,7,7,7,7,7]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2500</code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>



<p><b>进阶：</b></p>

<ul>
<li>你能将算法的时间复杂度降低到 <code>O(n log(n))</code> 吗?</li>
</ul>


## 分析

### #1

按前一元素选哪个即可递推。

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        f = [1]*n
        for i in range(1,n):
            f[i] = 1+max([f[j] for j in range(i) if nums[j]<nums[i]],default=0)
        return max(f)
```
1000 ms

### #2

- 观察递推式，这种限制一个维度 （nums[j]<nums[i]），求另一个维度（f[j]）最值的问题，一种常用的方法是维护一种单调性
- 假如 num[j1]<nums[j2] 且 f[j1]>f[j2]，显然 j2 对之后的递推式来说是无用的，可以去掉
- 那么维护有用的 j 的集合，按 nums[j] 排序，f[j] 必然也是递增的
- 因此只需在这个集合中二分查找最后一个满足 nums[j]<nums[i] 的 j 即可


## 解答

```python
def lengthOfLIS(self, nums: List[int]) -> int:
    A = []
    for num in nums:
        j = bisect_left(A, num)
        A[j:j + 1] = [num]
    return len(A)
```
时间 $O(N*logN)$，40 ms

