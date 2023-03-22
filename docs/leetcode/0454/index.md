# 0454：四数相加 II（★）


> <u>**[力扣第 454 题](https://leetcode.cn/problems/4sum-ii/)**</u>

## 题目

<p>给你四个整数数组 <code>nums1</code>、<code>nums2</code>、<code>nums3</code> 和 <code>nums4</code> ，数组长度都是 <code>n</code> ，请你计算有多少个元组 <code>(i, j, k, l)</code> 能满足：</p>

<ul>
<li><code>0 &lt;= i, j, k, l &lt; n</code></li>
<li><code>nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0</code></li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
<strong>输出：</strong>2
<strong>解释：</strong>
两个元组如下：
1. (0, 0, 0, 1) -&gt; nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -&gt; nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
<strong>输出：</strong>1
</pre>



<p>  <strong>提示：</strong></p>

<ul>
<li><code>n == nums1.length</code></li>
<li><code>n == nums2.length</code></li>
<li><code>n == nums3.length</code></li>
<li><code>n == nums4.length</code></li>
<li><code>1 &lt;= n &lt;= 200</code></li>
<li><code>-2<sup>28</sup> &lt;= nums1[i], nums2[i], nums3[i], nums4[i] &lt;= 2<sup>28</sup></code></li>
</ul>


## 分析

采用 {{< lc "0018" >}} 的方法会超时，注意到本题是计算四元组的个数，而不需要列举出来。

因此在遍历时，可以直接用哈希表保存后两个数的和以及对应的频次，一下去掉后两层循环。

## 解答

```python
def fourSumCount(self, nums1: List[int], nums2: List[int], nums3: List[int], nums4: List[int]) -> int:
	ct = Counter(c+d for c in nums3 for d in nums4)
	return sum(ct[-a-b] for a in nums1 for b in nums2)
```
时间复杂度 O(N^2)，576 ms


