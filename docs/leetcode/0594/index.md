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

先统计得到每个数的个数 ct。
然后遍历数组存在的数 x 作为最小值，如果 x+1 也存在数组中，那么对应的最长和谐子序列长度即为 ct[x] + ct[x+1]。
	

## 解答

```python
def findLHS(self, nums: List[int]) -> int:
	ct = Counter(nums)
	return max(ct[x]+ct[x+1] if ct[x+1] else 0 for x in ct)
```
88 ms

