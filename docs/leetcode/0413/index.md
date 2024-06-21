# 0413：等差数列划分（★）


> <u>**[力扣第 413 题](https://leetcode.cn/problems/arithmetic-slices/)**</u>

## 题目

<p>如果一个数列 <strong>至少有三个元素</strong> ，并且任意两个相邻元素之差相同，则称该数列为等差数列。</p>

<ul>
<li>例如，<code>[1,3,5,7,9]</code>、<code>[7,7,7,7]</code> 和 <code>[3,-1,-5,-9]</code> 都是等差数列。</li>
</ul>

<div class="original__bRMd">
<div>
<p>给你一个整数数组 <code>nums</code> ，返回数组 <code>nums</code> 中所有为等差数组的 <strong>子数组</strong> 个数。</p>

<p><strong>子数组</strong> 是数组中的一个连续序列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4]
<strong>输出：</strong>3
<strong>解释：</strong>nums 中有三个子等差数组：[1, 2, 3]、[2, 3, 4] 和 [1,2,3,4] 自身。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 5000</code></li>
<li><code>-1000 <= nums[i] <= 1000</code></li>
</ul>
</div>
</div>


## 分析

递推以 i 结尾的子数组个数即可。


## 解答

```python
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        res = 0
        f,pre = 0,inf
        for a,b in pairwise(nums):
            f = f+1 if b-a==pre else 0
            res += f
            pre = b-a
        return res
```
40 ms

