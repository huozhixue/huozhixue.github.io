# 0414：第三大的数


> <u>**[力扣第 414 题](https://leetcode.cn/problems/third-maximum-number/)**</u>

## 题目

<p>给你一个非空数组，返回此数组中 <strong>第三大的数</strong> 。如果不存在，则返回数组中最大的数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>[3, 2, 1]
<strong>输出：</strong>1
<strong>解释：</strong>第三大的数是 1 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>[1, 2]
<strong>输出：</strong>2
<strong>解释：</strong>第三大的数不存在, 所以返回最大的数 2 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>[2, 2, 3, 1]
<strong>输出：</strong>1
<strong>解释：</strong>注意，要求返回第三大的数，是指在所有不同数字中排第三大的数。
此例中存在两个值为 2 的数，它们都排第二。在所有不同数字中排第三大的数为 1 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>4</sup></code></li>
<li><code>-2<sup>31</sup> <= nums[i] <= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong>你能设计一个时间复杂度 <code>O(n)</code> 的解决方案吗？</p>


**相似问题：**
- [0215：数组中的第K个最大元素](/leetcode/0215)
- [2733：既不是最小值也不是最大值（1147 分）](/leetcode/2733)


## 分析

要求 O(N)，用堆维护前三大的数值即可。

## 解答


```python
class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        A = nlargest(3,set(nums))
        return A[-1] if len(A)==3 else A[0]
```
35 ms
