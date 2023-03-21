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

子序列/子数组相关的问题容易想到遍历结尾位置 j，分别找最值。

令 dp[j] 代表结尾位置 j 的最长递增子序列长度。那么：

    dp[j] = 1 + max(dp[i] for i in range(j) if nums[i]<nums[j])

递推即可。
					
```python
def lengthOfLIS(self, nums: List[int]) -> int:
    n = len(nums)
    dp = [0] * n
    for j in range(n):
        dp[j] = 1 + max([dp[i] for i in range(j) if nums[i]<nums[j]], default=0)
    return max(dp)
```
时间复杂度 O(N^2)，1824 ms

### #2

本题还有个很经典的优化解法：
- 假如 dp[i1]==dp[i2] 且 nums[i1]<nums[i2]，那么在递推式中只需要考虑 i1 而不用考虑 i2
- 那么令 A[y] 代表使 dp[i]==y 的最小 nums[i]，问题转为求 max(y for y in range(j) if A[y]<nums[j])
- 注意到 A 必然是严格递增的，因此可以二分查找最大的 x
- 而得到 dp[j] 后，只需要更新 A[y+1] = nums[j] 即可维护 A
- 因此每轮递推只需 O(logN)，总的时间复杂度 O(N*logN)

> 额外的，令 A 初始为空数组并动态维护，那么最终 len(A) 即为所求，就可以去掉 dp 数组。

## 解答

```python
def lengthOfLIS(self, nums: List[int]) -> int:
    A = []
    for num in nums:
        j = bisect_left(A, num)
        A[j:j + 1] = [num]
    return len(A)
```
40 ms

