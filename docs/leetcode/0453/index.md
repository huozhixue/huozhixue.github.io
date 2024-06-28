# 0453：最小操作次数使数组元素相等（★）


> <u>**[力扣第 453 题](https://leetcode.cn/problems/minimum-moves-to-equal-array-elements/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 的整数数组，每次操作将会使 <code>n - 1</code> 个元素增加 <code>1</code> 。返回让数组所有元素相等的最小操作次数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>3
<strong>解释：</strong>
只需要3次操作（注意每次操作会增加两个元素的值）：
[1,2,3]  =&gt;  [2,3,3]  =&gt;  [3,4,3]  =&gt;  [4,4,4]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li>答案保证符合 <strong>32-bit</strong> 整数</li>
</ul>


## 分析

等价于让一个数减 1，因此计算所有数变成最小数的次数即可。

## 解答


```python
class Solution:
    def minMoves(self, nums: List[int]) -> int:
        return sum(nums)-min(nums)*len(nums)
```
32 ms
