# 0724：寻找数组的中心下标


> <u>**[力扣第 724 题](https://leetcode.cn/problems/find-pivot-index/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，请计算数组的 <strong>中心下标 </strong>。</p>

<p>数组<strong> 中心下标</strong><strong> </strong>是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。</p>

<p>如果中心下标位于数组最左端，那么左侧数之和视为 <code>0</code> ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。</p>

<p>如果数组有多个中心下标，应该返回 <strong>最靠近左边</strong> 的那一个。如果数组不存在中心下标，返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1, 7, 3, 6, 5, 6]
<strong>输出：</strong>3
<strong>解释：</strong>
中心下标是 3 。
左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1, 2, 3]
<strong>输出：</strong>-1
<strong>解释：</strong>
数组中不存在满足此条件的中心下标。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [2, 1, -1]
<strong>输出：</strong>0
<strong>解释：</strong>
中心下标是 0 。
左侧数之和 sum = 0 ，（下标 0 左侧不存在元素），
右侧数之和 sum = nums[1] + nums[2] = 1 + -1 = 0 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
</ul>



<p><strong>注意：</strong>本题与主站 1991 题相同：<a href="https://leetcode-cn.com/problems/find-the-middle-index-in-array/" target="_blank">https://leetcode-cn.com/problems/find-the-middle-index-in-array/</a></p>


**相似问题：**
- [0560：和为 K 的子数组](/leetcode/0560)
- [1991：找到数组的中间位置（1302 分）](/leetcode/1991)
- [2270：分割数组的方案数（1334 分）](/leetcode/2270)
- [2219：数组的最大总分](/leetcode/2219)
- [2574：左右元素和的差值（1206 分）](/leetcode/2574)


## 分析

对于中心索引 i，sum(nums[:i])==sum(nums[i+1:])，等价于 
sum(nums[:i])*2+nums[i]==sum(nums)。所以遍历 i 判断是否符合即可。


## 解答

```python
def pivotIndex(self, nums: List[int]) -> int:
	s, pre = sum(nums), 0
	for i, num in enumerate(nums):
		if pre*2+num == s:
			return i
		pre += num
	return -1
```
60 ms

