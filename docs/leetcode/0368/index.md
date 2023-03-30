# 0368：最大整除子集（★）


> <u>**[力扣第 368 题](https://leetcode.cn/problems/largest-divisible-subset/)**</u>

## 题目

给你一个由 <strong>无重复</strong> 正整数组成的集合 <code>nums</code> ，请你找出并返回其中最大的整除子集 <code>answer</code> ，子集中每一元素对 <code>(answer[i], answer[j])</code> 都应当满足：
<ul>
<li><code>answer[i] % answer[j] == 0</code> ，或</li>
<li><code>answer[j] % answer[i] == 0</code></li>
</ul>

<p>如果存在多个有效解子集，返回其中任何一个均可。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>[1,2]
<strong>解释：</strong>[1,3] 也会被视为正确答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,4,8]
<strong>输出：</strong>[1,2,4,8]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 1000</code></li>
<li><code>1 <= nums[i] <= 2 * 10<sup>9</sup></code></li>
<li><code>nums</code> 中的所有整数 <strong>互不相同</strong></li>
</ul>


## 分析

典型的子序列 dp。先将 nums 排序后得到数组 A。

令 dp[i] 代表以 A[i] 结尾的最大整除子集的长度，按A[i]前元素位置即可递推。

本题要求给出一个最大整除子集，考虑从递推的路径反推：
- 先找到一个终点 i，满足 dp[i]==max(dp)
- 往前找点 j ，满足 A[i]%A[j]==0 且 dp[j]==dp[i]-1
- 依此类推即可

## 解答

```python
def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
    A, n = sorted(nums), len(nums)
    dp = [1]*n
    for i in range(n):
        dp[i] = 1+max([dp[j] for j in range(i) if A[i]%A[j]==0], default=0)
    i = dp.index(max(dp))
    res = [A[i]]
    while dp[i] != 1:
        for j in range(i):
            if dp[j]==dp[i]-1 and A[i]%A[j]==0:
                i = j
                break
        res.append(A[i])
    return res[::-1]
```
时间复杂度 O(N^2)，308 ms

