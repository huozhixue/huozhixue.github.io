# 0217：存在重复元素


> <u>**[力扣第 217 题](https://leetcode.cn/problems/contains-duplicate/)**</u>

## 题目

给你一个整数数组 <code>nums</code> 。如果任一值在数组中出现 <strong>至少两次</strong> ，返回 <code>true</code> ；如果数组中每个元素互不相同，返回 <code>false</code> 。


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,1]
<strong>输出：</strong>true</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4]
<strong>输出：</strong>false</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1,3,3,4,3,2,4,2]
<strong>输出：</strong>true</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0219：存在重复元素 II](/leetcode/0219)
- [0220：存在重复元素 III](/leetcode/0220)
- [2357：使数组中所有元素都等于零（1225 分）](/leetcode/2357)


## 分析

判断去重后长度是否减小即可。

## 解答

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(set(nums))<len(nums)
```
69 ms



