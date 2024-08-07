# 0162：寻找峰值（★）


> <u>**[力扣第 162 题](https://leetcode.cn/problems/find-peak-element/)**</u>

## 题目

<p>峰值元素是指其值严格大于左右相邻值的元素。</p>

<p>给你一个整数数组 <code>nums</code>，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 <strong>任何一个峰值</strong> 所在位置即可。</p>

<p>你可以假设 <code>nums[-1] = nums[n] = -∞</code> 。</p>

<p>你必须实现时间复杂度为 <code>O(log n)</code><em> </em>的算法来解决此问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = <code>[1,2,3,1]</code>
<strong>输出：</strong>2
<strong>解释：</strong>3 是峰值元素，你的函数应该返回其索引 2。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = <code>[</code>1,2,1,3,5,6,4]
<strong>输出：</strong>1 或 5
<strong>解释：</strong>你的函数可以返回索引 1，其峰值元素为 2；
或者返回索引 5， 其峰值元素为 6。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
<li>对于所有有效的 <code>i</code> 都有 <code>nums[i] != nums[i + 1]</code></li>
</ul>


**相似问题：**
- [0852：山脉数组的峰顶索引（1181 分）](/leetcode/0852)
- [1901：寻找峰值 II](/leetcode/1901)
- [2137：通过倒水操作让所有的水桶所含水量相等](/leetcode/2137)
- [2210：统计数组中峰和谷的数量（1354 分）](/leetcode/2210)
- [2951：找出峰值（1189 分）](/leetcode/2951)


## 分析

- 要求时间复杂度 O(log N)，考虑二分查找
- nums[k] < nums[k+1]，[k+1, n-1] 范围内必然有一个峰值
- nums[k] < nums[k-1]，[0, k-1] 范围内必然有一个峰值
- 否则 k 即满足

 
## 解答

```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        n = len(nums)
        i,j = 0,n-1
        while i<=j:
            k = (i+j)//2
            if k and nums[k-1]>nums[k]:
                j = k-1
            elif k+1<n and nums[k+1]>nums[k]:
                i = k+1
            else:
                return k
```
39 ms



