# 1995：统计特殊四元组（★）


> <u>**[力扣第 257 场周赛第 1 题](https://leetcode.cn/problems/count-special-quadruplets/)**</u>

## 题目

<p>给你一个 <strong>下标从 0 开始</strong> 的整数数组 <code>nums</code> ，返回满足下述条件的 <strong>不同</strong> 四元组 <code>(a, b, c, d)</code> 的 <strong>数目</strong> ：</p>

<ul>
<li><code>nums[a] + nums[b] + nums[c] == nums[d]</code> ，且</li>
<li><code>a &lt; b &lt; c &lt; d</code></li>
</ul>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [1,2,3,6]
<strong>输出：</strong>1
<strong>解释：</strong>满足要求的唯一一个四元组是 (0, 1, 2, 3) 因为 1 + 2 + 3 == 6 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [3,3,6,4,5]
<strong>输出：</strong>0
<strong>解释：</strong>[3,3,6,4,5] 中不存在满足要求的四元组。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>nums = [1,1,1,3,5]
<strong>输出：</strong>4
<strong>解释：</strong>满足要求的 4 个四元组如下：
- (0, 1, 2, 3): 1 + 1 + 1 == 3
- (0, 1, 3, 4): 1 + 1 + 3 == 5
- (0, 2, 3, 4): 1 + 1 + 3 == 5
- (1, 2, 3, 4): 1 + 1 + 3 == 5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>4 &lt;= nums.length &lt;= 50</code></li>
<li><code>1 &lt;= nums[i] &lt;= 100</code></li>
</ul>


## 分析

### #1

最简单的就是固定 c 和 d，在 [0, c) 中求和等于 nums[d]-nums[c] 的二元组个数，可以用哈希表。

```python
def countQuadruplets(self, nums: List[int]) -> int:
    res, n = 0, len(nums)
    for d in range(n):
        for c in range(d):
            ct = Counter()
            for b in range(c):
                res += ct[nums[d]-nums[c]-nums[b]]
                ct[nums[b]] += 1
    return res
```
时间复杂度 O(N^3)，628 ms

### #2

注意到数据范围很小，所以考虑直接统计 nums[:d] 中的 {三元组的和: 三元组的个数} 哈希表。

nums[:i+1] 的三元组计数显然可以由 nums[i] 和 nums[:i] 中 {二元组的和: 二元组的个数} 哈希表得到。
同理，nums[:i+1] 的二元组计数可以由 nums[i] 和 Counter(nums[:i]) 得到。

令 dp3[i]、dp2[i]、dp1[i] 分别代表 nums[:i+1] 的三元组计数、二元组计数、哈希表计数。那么：

    dp1[i], dp2[i], dp3[i] = dp1[i-1].copy(), dp2[i-1].copy(), dp3[i-1].copy()
    dp1[i][nums[i]] += 1
    for x in dp1[i-1]:
        dp2[i][x+nums[i]] += dp1[i-1][x]
    for x in dp2[i-1]:
        dp3[i][x+nums[i]] += dp2[i-1][x]

> 具体实现时，可以用将 dp1、dp2、dp3 分别优化为 1 个哈希表 ct1、ct2、ct3，
>注意要按 ct3、ct2、ct1 的顺序更新，防止相互影响。

## 解答

```python
def countQuadruplets(self, nums: List[int]) -> int:
    res, ct1, ct2, ct3 = 0, Counter(), Counter(), Counter()
    for num in nums:
        res += ct3[num]
        for x in ct2:
            ct3[x+num] += ct2[x]
        for x in ct1:
            ct2[x+num] += ct1[x]
        ct1[num] += 1
    return res
```
时间复杂度 O(N*S)，116 ms

