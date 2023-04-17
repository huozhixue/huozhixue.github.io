# 0485：最大连续 1 的个数


> <u>**[力扣第 485 题](https://leetcode.cn/problems/max-consecutive-ones/)**</u>

## 题目

<p>给定一个二进制数组 <code>nums</code> ， 计算其中最大连续 <code>1</code> 的个数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,0,1,1,1]
<strong>输出：</strong>3
<strong>解释：</strong>开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>nums = [1,0,1,1,0,1]
<b>输出：</b>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>nums[i]</code> 不是 <code>0</code> 就是 <code>1</code>.</li>
</ul>


## 分析

遍历即可。

## 解答

```python
def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
	return max(len(list(g)) if x==1 else 0 for x,g in groupby(nums))
```
64 ms
