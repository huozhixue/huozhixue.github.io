# 1043：分隔数组以得到最大和（1916 分）


> <u>**[力扣第 136 场周赛第 3 题](https://leetcode.cn/problems/partition-array-for-maximum-sum/)**</u>

## 题目

<p>给你一个整数数组 <code>arr</code>，请你将该数组分隔为长度 <strong>最多 </strong>为 k 的一些（连续）子数组。分隔完成后，每个子数组的中的所有值都会变为该子数组中的最大值。</p>

<p>返回将数组分隔变换后能够得到的元素最大和。本题所用到的测试用例会确保答案是一个 32 位整数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,15,7,9,2,5,10], k = 3
<strong>输出：</strong>84
<strong>解释：</strong>数组变为 [15,15,15,9,10,10,10]</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
<strong>输出：</strong>83
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>arr = [1], k = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr.length &lt;= 500</code></li>
<li><code>0 &lt;= arr[i] &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= k &lt;= arr.length</code></li>
</ul>


**相似问题：**
- [2098：长度为 K 的最大偶数和子序列](/leetcode/2098)
- [2767：将字符串分割为最少的美丽子字符串（1864 分）](/leetcode/2767)
- [3144：分割字符频率相等的最少子字符串（1917 分）](/leetcode/3144)


## 分析

按第一段分几个即可递推，注意该段的最大值也可递推。

## 解答


```python
def maxSumAfterPartitioning(self, arr: List[int], k: int) -> int:
	@cache
	def dfs(i):
		res, ma = 0, 0
		for j in range(i,min(i+k,n)):
			ma = max(ma,arr[j])
			res = max(res,ma*(j-i+1)+dfs(j+1))
		return res
	
	n = len(arr)
	return dfs(0)
```
352 ms
