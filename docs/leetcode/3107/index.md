# 3107：使数组中位数等于 K 的最少操作数（1604 分）


> <u>**[力扣第 392 场周赛第 3 题](https://leetcode.cn/problems/minimum-operations-to-make-median-of-array-equal-to-k/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个 <strong>非负</strong> 整数 <code>k</code> 。一次操作中，你可以选择任一元素 加 <code>1</code> 或者减 <code>1</code> 。</p>

<p>请你返回将 <code>nums</code> <strong>中位数</strong> 变为 <code>k</code> 所需要的 <strong>最少</strong> 操作次数。</p>

<p>一个数组的中位数指的是数组按非递减顺序排序后最中间的元素。如果数组长度为偶数，我们选择中间两个数的较大值为中位数。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [2,5,6,8,5], k = 4</span></p>

<p><span class="example-io"><b>输出：</b>2</span></p>

<p><b>解释：</b>我们将 <code>nums[1]</code> 和 <code>nums[4]</code> 减 <code>1</code> 得到 <code>[2, 4, 6, 8, 4]</code> 。现在数组的中位数等于 <code>k</code> 。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [2,5,6,8,5], k = 7</span></p>

<p><span class="example-io"><b>输出：</b>3</span></p>

<p><b>解释：</b>我们将 <code>nums[1]</code> 增加 1 两次，并且将 <code>nums[2]</code> 增加 1 一次，得到 <code>[2, 7, 7, 8, 5]</code> 。</p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [1,2,3,4,5,6], k = 4</span></p>

<p><span class="example-io"><b>输出：</b>0</span></p>

<p><b>解释：</b>数组中位数已经等于 <code>k</code> 了。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0295：数据流的中位数](/leetcode/0295)
- [0480：滑动窗口中位数](/leetcode/0480)


## 分析

排序后，定位中位数下标 m，将前面的数变为<=k，后面的数变为>=k即可。

## 解答

```python
class Solution:
    def minOperationsToMakeMedianK(self, nums: List[int], k: int) -> int:
        A = sorted(nums)
        m = len(A)//2
        return sum(max(0,a-k) for a in A[:m+1])+sum(max(0,k-a) for a in A[m:])
```
193 ms

