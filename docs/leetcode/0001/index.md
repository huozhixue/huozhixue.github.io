# 0001：两数之和


> <u>**[力扣第 1 题](https://leetcode.cn/problems/two-sum/)**</u>

## 题目

<p>给定一个整数数组 <code>nums</code> 和一个整数目标值 <code>target</code>，请你在该数组中找出 <strong>和为目标值 </strong><em><code>target</code></em>  的那 <strong>两个</strong> 整数，并返回它们的数组下标。</p>

<p>你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。</p>

<p>你可以按任意顺序返回答案。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,7,11,15], target = 9
<strong>输出：</strong>[0,1]
<strong>解释：</strong>因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,2,4], target = 6
<strong>输出：</strong>[1,2]
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,3], target = 6
<strong>输出：</strong>[0,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
<li><strong>只会存在一个有效答案</strong></li>
</ul>



<p><strong>进阶：</strong>你可以想出一个时间复杂度小于 <code>O(n<sup>2</sup>)</code> 的算法吗？</p>


## 分析

### #1

最直接的就是是两次遍历，找出答案。

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
	for i in range(len(nums)):
		for j in range(i+1, len(nums)):
			if nums[i] + nums[j] == target:
				return [i, j]
```

时间 O(N^2)，2860 ms

### #2

注意到第二层遍历等价于查询一个数，所以可以用哈希表节省时间。

边遍历边用哈希存储元素位置，每轮查询前面是否有对应的数即可。
 
## 解答

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    d = {}
    for j, num in enumerate(nums):
        if target-num in d:
            return [d[target-num], j]
        d[num] = j
```
时间 O(N)，28 ms
