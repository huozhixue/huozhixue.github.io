# 0974：和可被 K 整除的子数组（★）


> <u>**[力扣第 119 场周赛第 3 题](https://leetcode.cn/problems/subarray-sums-divisible-by-k/)**</u>

## 题目

<p>给定一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，返回其中元素之和可被 <code>k</code> 整除的（连续、非空） <strong>子数组</strong> 的数目。</p>

<p><strong>子数组</strong> 是数组的 <strong>连续</strong> 部分。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,5,0,-2,-3,1], k = 5
<strong>输出：</strong>7
<strong>解释：
</strong>有 7 个子数组满足其元素之和可被 k = 5 整除：
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [5], k = 9
<strong>输出:</strong> 0
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
<li><code>2 &lt;= k &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

类似 0523 和 0560 ，用哈希表保存前缀和的个数即可。


## 解答

```python
def subarraysDivByK(self, A: List[int], K: int) -> int:
	res, s, d = 0, 0, defaultdict(int)
	for num in A:
		d[s] += 1
		s = (s+num) % K if K else s+num
		res += d[s]
	return res
```

324 ms