# 0128：最长连续序列（★）


> <u>**[力扣第 128 题](https://leetcode.cn/problems/longest-consecutive-sequence/)**</u>

## 题目

<p>给定一个未排序的整数数组 <code>nums</code> ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。</p>

<p>请你设计并实现时间复杂度为 <code>O(n)</code><em> </em>的算法解决此问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [100,4,200,1,3,2]
<strong>输出：</strong>4
<strong>解释：</strong>最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,3,7,2,5,8,4,6,0,1]
<strong>输出：</strong>9
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0298：二叉树最长连续序列](/leetcode/0298)
- [2177：找到和为给定整数的三个连续整数（1257 分）](/leetcode/2177)
- [2274：不含特殊楼层的最大连续楼层数（1332 分）](/leetcode/2274)
- [2414：最长的字母序连续子字符串的长度（1221 分）](/leetcode/2414)
- [3020：子集中元素的最大数量（1741 分）](/leetcode/3020)


## 分析

最简单的就是去重排序，再遍历即可。要求时间复杂度 O(n)，有个巧妙的方法：
- 考虑找到每条序列的起点开始遍历
- 如果 x-1 不在 nums 中，x 就是起点

## 解答

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        vis = set(nums)
        res = 0
        for x in vis:
            if x-1 not in vis:
                w = 0
                while x in vis:
                    w += 1
                    x += 1
                res = max(res,w)
        return res
```
91 ms



