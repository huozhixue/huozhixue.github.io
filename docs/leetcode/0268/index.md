# 0268：丢失的数字


> <u>**[力扣第 268 题](https://leetcode.cn/problems/missing-number/)**</u>

## 题目

<p>给定一个包含 <code>[0, n]</code> 中 <code>n</code> 个数的数组 <code>nums</code> ，找出 <code>[0, n]</code> 这个范围内没有出现在数组中的那个数。</p>

<ul>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,0,1]
<strong>输出：</strong>2
<b>解释：</b>n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1]
<strong>输出：</strong>2
<b>解释：</b>n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [9,6,4,2,3,5,7,0,1]
<strong>输出：</strong>8
<b>解释：</b>n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>nums = [0]
<strong>输出：</strong>1
<b>解释：</b>n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= n</code></li>
<li><code>nums</code> 中的所有数字都 <strong>独一无二</strong></li>
</ul>



<p><strong>进阶：</strong>你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题?</p>


## 分析

直接算比原本的总和 sum(range(n+1)) 少了多少即可。

## 解答

```python
def missingNumber(self, nums: List[int]) -> int:
	return sum(range(len(nums)+1)) - sum(nums)
```
32 ms

