# 0525：连续数组（★）


> <u>**[力扣第 525 题](https://leetcode.cn/problems/contiguous-array/)**</u>

## 题目

<p>给定一个二进制数组 <code>nums</code> , 找到含有相同数量的 <code>0</code> 和 <code>1</code> 的最长连续子数组，并返回该子数组的长度。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [0,1]
<strong>输出:</strong> 2
<strong>说明:</strong> [0, 1] 是具有相同数量 0 和 1 的最长连续子数组。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [0,1,0]
<strong>输出:</strong> 2
<strong>说明:</strong> [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>nums[i]</code> 不是 <code>0</code> 就是 <code>1</code></li>
</ul>


## 分析

假如将 0 都替换为 -1，那么就是找和为 0 的子数组。

求任意子数组的和，容易想到前缀和。得到前缀和数组 pre 后，就是求距离最远的相同数，用哈希表即可。


## 解答

```python
def findMaxLength(self, nums: List[int]) -> int:
    d, pre = {}, accumulate([0]+nums, lambda x, y: x+(y if y==1 else -1))
    return max(i-d.setdefault(val, i) for i, val in enumerate(pre))
```

212 ms

