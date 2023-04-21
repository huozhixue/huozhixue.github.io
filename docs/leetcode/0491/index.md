# 0491：递增子序列（★）


> <u>**[力扣第 491 题](https://leetcode.cn/problems/non-decreasing-subsequences/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，找出并返回所有该数组中不同的递增子序列，递增子序列中 <strong>至少有两个元素</strong> 。你可以按 <strong>任意顺序</strong> 返回答案。</p>

<p>数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,6,7,7]
<strong>输出：</strong>[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,4,3,2,1]
<strong>输出：</strong>[[4,4]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 15</code></li>
<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>
</ul>


## 分析

先遍历，递推得到所有递增子序列（包括单个元素），最后再去掉单元素序列即可。

## 解答


```python
def findSubsequences(self, nums: List[int]) -> List[List[int]]:
	res = {tuple()}
	for x in nums:
		res |= {sub+(x,) for sub in res if not sub or sub[-1]<=x}
	return [list(sub) for sub in res if len(sub)>=2]
```
60 ms
