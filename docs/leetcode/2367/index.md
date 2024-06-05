# 2367：算术三元组的数目（1203 分）


> <u>**[力扣第 305 场周赛第 1 题](https://leetcode.cn/problems/number-of-arithmetic-triplets/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始、<strong>严格递增</strong> 的整数数组 <code>nums</code> 和一个正整数 <code>diff</code> 。如果满足下述全部条件，则三元组 <code>(i, j, k)</code> 就是一个 <strong>算术三元组</strong> ：</p>

<ul>
<li><code>i &lt; j &lt; k</code> ，</li>
<li><code>nums[j] - nums[i] == diff</code> 且</li>
<li><code>nums[k] - nums[j] == diff</code></li>
</ul>

<p>返回不同 <strong>算术三元组</strong> 的数目<em>。</em></p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [0,1,4,6,7,10], diff = 3
<strong>输出：</strong>2
<strong>解释：</strong>
(1, 2, 4) 是算术三元组：7 - 4 == 3 且 4 - 1 == 3 。
(2, 4, 5) 是算术三元组：10 - 7 == 3 且 7 - 4 == 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [4,5,6,7,8,9], diff = 2
<strong>输出：</strong>2
<strong>解释：</strong>
(0, 2, 4) 是算术三元组：8 - 6 == 2 且 6 - 4 == 2 。
(1, 3, 5) 是算术三元组：9 - 7 == 2 且 7 - 5 == 2 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= nums.length &lt;= 200</code></li>
<li><code>0 &lt;= nums[i] &lt;= 200</code></li>
<li><code>1 &lt;= diff &lt;= 50</code></li>
<li><code>nums</code> <strong>严格</strong> 递增</li>
</ul>


## 分析

nums 严格递增且 diff 大于 0，所以遍历 nums 的元素 x，判断 x-diff，x-2*diff 是否出现过即可。

## 解答


```python
def arithmeticTriplets(self, nums: List[int], diff: int) -> int:
	res, vis = 0, set()
	for x in nums:
		res += x-diff in vis and x-2*diff in vis
		vis.add(x)
	return res
```
36 ms
