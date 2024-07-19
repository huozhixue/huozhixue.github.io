# 0349：两个数组的交集


> <u>**[力扣第 349 题](https://leetcode.cn/problems/intersection-of-two-arrays/)**</u>

## 题目

<p>给定两个数组 <code>nums1</code> 和 <code>nums2</code> ，返回 <em>它们的 <span data-keyword="array-intersection">交集</span></em> 。输出结果中的每个元素一定是 <strong>唯一</strong> 的。我们可以 <strong>不考虑输出结果的顺序</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,2,2,1], nums2 = [2,2]
<strong>输出：</strong>[2]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [4,9,5], nums2 = [9,4,9,8,4]
<strong>输出：</strong>[9,4]
<strong>解释：</strong>[4,9] 也是可通过的
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums1.length, nums2.length &lt;= 1000</code></li>
<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0350：两个数组的交集 II](/leetcode/0350)
- [1213：三个有序数组的交集（1259 分）](/leetcode/1213)
- [2215：找出两数组的不同（1207 分）](/leetcode/2215)
- [2085：统计出现过一次的公共字符串（1307 分）](/leetcode/2085)
- [2143：在两个数组的区间中选取数字](/leetcode/2143)
- [2248：多个数组求交集（1264 分）](/leetcode/2248)
- [2540：最小公共值（1249 分）](/leetcode/2540)
- [3002：移除后集合的最多元素数（1917 分）](/leetcode/3002)


## 分析

直接调用 set 取交集即可。

## 解答

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        return list(set(nums1)&set(nums2))
```
46 ms

