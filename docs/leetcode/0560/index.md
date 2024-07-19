# 0560：和为 K 的子数组（★）


> <u>**[力扣第 560 题](https://leetcode.cn/problems/subarray-sum-equals-k/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，请你统计并返回 <em>该数组中和为 <code>k</code><strong> </strong>的子数组的个数 </em>。</p>

<p>子数组是数组中元素的连续非空序列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1], k = 2
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3], k = 3
<strong>输出：</strong>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
<li><code>-10<sup>7</sup> &lt;= k &lt;= 10<sup>7</sup></code></li>
</ul>


**相似问题：**
- [0001：两数之和](/leetcode/0001)
- [0523：连续的子数组和](/leetcode/0523)
- [0713：乘积小于 K 的子数组](/leetcode/0713)
- [0724：寻找数组的中心下标](/leetcode/0724)
- [0974：和可被 K 整除的子数组（1675 分）](/leetcode/0974)
- [1658：将 x 减到 0 的最小操作数（1817 分）](/leetcode/1658)
- [2090：半径为 k 的子数组平均值（1358 分）](/leetcode/2090)
- [2219：数组的最大总分](/leetcode/2219)


## 分析

### #1

求任意子数组的和，容易想到前缀和。
得到前缀和数组 pre 后，就是找 i < j 使得 pre[j]-pre[i]==k。

查找定值容易想到哈希表，遍历时边存边查即可。

```python
def subarraySum(self, nums: List[int], k: int) -> int:
	pre = list(accumulate([0]+nums))
	res, ct = 0, Counter()
	for val in pre:
		res += ct[val-k]
		ct[val] += 1
	return res
```

116 ms

### #2

也可以合并为一趟解决。


## 解答

```python
def subarraySum(self, nums: List[int], k: int) -> int:
	res, pre, ct = 0, 0, Counter([0])
	for val in nums:
		pre += val
		res += ct[pre-k]
		ct[pre] += 1
	return res
```

116 ms

