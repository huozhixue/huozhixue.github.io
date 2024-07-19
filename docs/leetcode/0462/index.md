# 0462：最小操作次数使数组元素相等 II（★）


> <u>**[力扣第 462 题](https://leetcode.cn/problems/minimum-moves-to-equal-array-elements-ii/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 的整数数组 <code>nums</code> ，返回使所有数组元素相等需要的最小操作数。</p>

<p>在一次操作中，你可以使数组中的一个元素加 <code>1</code> 或者减 <code>1</code> 。</p>

<p>测试用例经过设计以使答案在 <strong>32 位</strong> 整数范围内。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>2
<strong>解释：</strong>
只需要两次操作（每次操作指南使一个元素加 1 或减 1）：
[<u>1</u>,2,3]  =&gt;  [2,2,<u>3</u>]  =&gt;  [2,2,2]
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,10,2,9]
<strong>输出：</strong>16
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0296：最佳的碰头地点](/leetcode/0296)
- [0453：最小操作次数使数组元素相等](/leetcode/0453)
- [2033：获取单值网格的最小操作数（1671 分）](/leetcode/2033)
- [2171：拿出最少数目的魔法豆（1748 分）](/leetcode/2171)
- [2448：使数组相等的最小开销（2005 分）](/leetcode/2448)
- [2602：使数组元素全部相等的最少操作次数（1903 分）](/leetcode/2602)
- [2967：使数组成为等数数组的最小代价（2116 分）](/leetcode/2967)


## 分析

经典的数学问题，到中位数的总距离最短。

## 解答


```python
class Solution:
    def minMoves2(self, nums: List[int]) -> int:
        nums.sort()
        mid = nums[len(nums)//2]
        return sum(abs(x-mid) for x in nums)
```
36 ms
