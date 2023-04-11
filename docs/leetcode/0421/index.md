# 0421：数组中两个数的最大异或值（★★）


> <u>**[力扣第 421 题](https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，返回<em> </em><code>nums[i] XOR nums[j]</code> 的最大运算结果，其中 <code>0 ≤ i ≤ j &lt; n</code> 。</p>



<div class="original__bRMd">
<div>
<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,10,5,25,2,8]
<strong>输出：</strong>28
<strong>解释：</strong>最大运算结果是 5 XOR 25 = 28.</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [14,70,53,83,49,91,36,80,92,51,66,70]
<strong>输出：</strong>127
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>
</div>
</div>


## 分析


经典的位运算问题：
- 为了使结果最大，应该尽可能让二进制的高位取 1
- 假如前 k-1 位能取到的最大值为 M，接下来要使前 k位尽量取到 M'=(M<<1)+1
- 假设有两个数的 k 位前缀 y、z，满足 y^z=M'，M' 即能取到
- 根据异或的重要性质：如果 y^z=M'，那么 M'^y=z
- 因此将 k 位前缀保存在哈希表 vis 中，遍历 vis 中的 y，如果 M'^y 在 vis 中，M' 即能取到 

根据题目中值的范围，二进制最多 31 位，遍历 k 从 1 到 31 即可。 

## 解答

```python
def findMaximumXOR(self, nums: List[int]) -> int:
	res = 0
	for i in range(30, -1, -1):
		res, vis = res<<1, {x>>i for x in nums}
		res += any((res+1)^y in vis for y in vis)
	return res
```

940 ms




