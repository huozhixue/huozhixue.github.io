# 3231：要删除的递增子序列的最小数量（★★）


> <u>**[力扣第 3231 题](https://leetcode.cn/problems/minimum-number-of-increasing-subsequence-to-be-removed/)**</u>

## 题目

<p>给定一个整数数组 <code>nums</code>，你可以执行任意次下面的操作：</p>

<ul>
<li>从数组删除一个 <strong>严格递增</strong> 的 <span data-keyword="subsequence-array">子序列</span>。</li>
</ul>

<p>您的任务是找到使数组为 <strong>空</strong> 所需的 <strong>最小</strong> 操作数。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [5,3,1,4,2]</span></p>

<p><span class="example-io"><b>输出：</b>3</span></p>

<p><strong>解释：</strong></p>

<p>我们删除子序列 <code>[1, 2]</code>，<code>[3, 4]</code>，<code>[5]</code>。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b></span><span class="example-io">nums = [1,2,3,4,5]</span></p>

<p><span class="example-io"><b>输出：</b></span><span class="example-io">1</span></p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b></span><span class="example-io">nums = [5,4,3,2,1]</span></p>

<p><span class="example-io"><b>输出：</b></span><span class="example-io">5</span></p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>




## 分析

- 由 [Dilworth 定理](https://oi.wiki/math/order-theory/#dilworth-%E5%AE%9A%E7%90%86%E4%B8%8E-mirsky-%E5%AE%9A%E7%90%86)，等价于求最长不减的子序列
- 即是经典的 dp 问题

## 解答


```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        A = nums[::-1]
        B = []
        for a in A:
            i = bisect_right(B,a)
            B[i:i+1] = [a]
        return len(B)
```
200 ms
