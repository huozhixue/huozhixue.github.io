# 0416：分割等和子集（★）


> <u>**[力扣第 416 题](https://leetcode.cn/problems/partition-equal-subset-sum/)**</u>

## 题目

<p>给你一个 <strong>只包含正整数 </strong>的 <strong>非空 </strong>数组 <code>nums</code> 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,5,11,5]
<strong>输出：</strong>true
<strong>解释：</strong>数组可以分割成 [1, 5, 5] 和 [11] 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,5]
<strong>输出：</strong>false
<strong>解释：</strong>数组不能分割成两个元素和相等的子集。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 200</code></li>
<li><code>1 <= nums[i] <= 100</code></li>
</ul>


**相似问题：**
- [0698：划分为k个相等的子集](/leetcode/0698)
- [1981：最小化目标值与所选元素的差（2009 分）](/leetcode/1981)
- [2025：分割数组的最多方案数（2217 分）](/leetcode/2025)
- [2035：将数组分成两个数组并最小化数组和的差（2489 分）](/leetcode/2035)
- [2395：和相等的子数组（1249 分）](/leetcode/2395)
- [2518：好分区的数目（2414 分）](/leetcode/2518)
- [2578：最小和分割（1350 分）](/leetcode/2578)


## 分析

### #1

- 令 s 为数组的和，问题相当于找子集满足和等于 s/2
- 这可以看作背包问题，递推即可

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        s = sum(nums)
        if s%2:
            return False
        s //= 2
        f = [1]+[0]*s
        for x in nums:
            for i in range(s,x-1,-1):
                f[i] |= f[i-x]
        return bool(f[-1])
```
785 ms

### #2

- 由于递推时只关心 f 值为 1 的元素，所以可以直接用 set 维护

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        s = sum(nums)
        if s%2:
            return False
        s //= 2
        vis = set()
        for x in nums:
            vis |= {y+x for y in vis|{0} if y+x<=s}
        return s in vis
```
534 ms

### #2

- 由于 vis 集合的递推只涉及到加法，所以可以用二进制优化
- 用二进制状态 st 表示 vis 集合，集合内所有数加上 x 即是 st << x


## 解答

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        s = sum(nums)
        if s%2:
            return False
        s //= 2
        st = 0
        for x in nums:
            st |= (st|1)<<x
        return bool(st&1<<s)
```
37 ms

