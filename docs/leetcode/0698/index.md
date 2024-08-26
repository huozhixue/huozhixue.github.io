# 0698：划分为k个相等的子集（★）


> <u>**[力扣第 698 题](https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/)**</u>

## 题目

<p>给定一个整数数组  <code>nums</code> 和一个正整数 <code>k</code>，找出是否有可能把这个数组分成 <code>k</code> 个非空子集，其总和都相等。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong> nums = [4, 3, 2, 3, 5, 2, 1], k = 4
<strong>输出：</strong> True
<strong>说明：</strong> 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,3,4], k = 3
<strong>输出:</strong> false</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= len(nums) &lt;= 16</code></li>
<li><code>0 &lt; nums[i] &lt; 10000</code></li>
<li>每个元素的频率在 <code>[1,4]</code> 范围内</li>
</ul>


**相似问题：**
- [0416：分割等和子集](/leetcode/0416)
- [2305：公平分发饼干（1886 分）](/leetcode/2305)
- [2025：分割数组的最多方案数（2217 分）](/leetcode/2025)
- [2397：被列覆盖的最多行数（1718 分）](/leetcode/2397)


## 分析

{{< lc "0473" >}} 升级版，将 4 改为 k 即可。

## 解答

```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        s = sum(nums)
        if s % k:
            return False
        s //= k
        n = len(nums)
        f = [-1]*(1<<n)
        f[0] = 0
        for st in range(1<<n):
            if f[st]>=0:
                for i,x in enumerate(nums):
                    if not st&(1<<i) and f[st]+x<=s:
                        f[st|(1<<i)] = (f[st]+x)%s
        return f[-1] == 0
```
1281 ms

