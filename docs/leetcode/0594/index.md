# 0594：最长和谐子序列


> <u>**[力扣第 594 题](https://leetcode.cn/problems/longest-harmonious-subsequence/)**</u>

## 题目

<p>和谐数组是指一个数组里元素的最大值和最小值之间的差别 <strong>正好是 <code>1</code></strong> 。</p>

<p>现在，给你一个整数数组 <code>nums</code> ，请你在所有可能的子序列中找到最长的和谐子序列的长度。</p>

<p>数组的子序列是一个由数组派生出来的序列，它可以通过删除一些元素或不删除元素、且不改变其余元素的顺序而得到。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,3,2,2,5,2,3,7]
<strong>输出：</strong>5
<strong>解释：</strong>最长的和谐子序列是 [3,2,2,2,3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4]
<strong>输出：</strong>2
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1,1]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 2 * 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>
</ul>




## 分析

- 只需要考虑遍历 x，计算 x 和 x+1 的总个数即可
- 注意要求最大最小差别正好是 1，所以必须 x 和 x+1 都存在

## 解答

```python
class Solution:
    def findLHS(self, nums: List[int]) -> int:
        ct = Counter(nums)
        return max(ct[x]+ct[x+1] if x+1 in ct else 0 for x in ct)
```
258 ms

