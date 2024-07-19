# 0334：递增的三元子序列（★）


> <u>**[力扣第 334 题](https://leetcode.cn/problems/increasing-triplet-subsequence/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，判断这个数组中是否存在长度为 <code>3</code> 的递增子序列。</p>

<p>如果存在这样的三元组下标 <code>(i, j, k)</code> 且满足 <code>i &lt; j &lt; k</code> ，使得 <code>nums[i] &lt; nums[j] &lt; nums[k]</code> ，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4,5]
<strong>输出：</strong>true
<strong>解释：</strong>任何 i &lt; j &lt; k 的三元组都满足题意
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [5,4,3,2,1]
<strong>输出：</strong>false
<strong>解释：</strong>不存在满足题意的三元组</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,1,5,0,4,6]
<strong>输出：</strong>true
<strong>解释：</strong>三元组 (3, 4, 5) 满足题意，因为 nums[3] == 0 &lt; nums[4] == 4 &lt; nums[5] == 6
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>5</sup></code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong>你能实现时间复杂度为 <code>O(n)</code> ，空间复杂度为 <code>O(1)</code> 的解决方案吗？</p>


**相似问题：**
- [0300：最长递增子序列](/leetcode/0300)
- [1995：统计特殊四元组（1352 分）](/leetcode/1995)
- [2179：统计数组中好三元组数目（2272 分）](/leetcode/2179)
- [2552：统计上升四元组（2432 分）](/leetcode/2552)


## 分析

- 遍历 nums，令 a 代表最小值，b 代表长度 2 的递增序列的最小尾数，即可递推
- 这其实就是 {{< lc "0300" >}} 简化版，思想是相同的

## 解答

```python
class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        a,b = inf,inf
        for x in nums:
            if b<x:
                return True
            if a<x<b:
                b = x
            if x<a:
                a = x
        return False
```
84 ms


