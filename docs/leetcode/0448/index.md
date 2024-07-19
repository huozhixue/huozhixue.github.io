# 0448：找到所有数组中消失的数字


> <u>**[力扣第 448 题](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)**</u>

## 题目

<p>给你一个含 <code>n</code> 个整数的数组 <code>nums</code> ，其中 <code>nums[i]</code> 在区间 <code>[1, n]</code> 内。请你找出所有在 <code>[1, n]</code> 范围内但没有出现在 <code>nums</code> 中的数字，并以数组的形式返回结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,3,2,7,8,2,3,1]
<strong>输出：</strong>[5,6]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1]
<strong>输出：</strong>[2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 <= n <= 10<sup>5</sup></code></li>
<li><code>1 <= nums[i] <= n</code></li>
</ul>

<p><strong>进阶：</strong>你能在不使用额外空间且时间复杂度为<em> </em><code>O(n)</code><em> </em>的情况下解决这个问题吗? 你可以假定返回的数组不算在额外空间内。</p>


**相似问题：**
- [0041：缺失的第一个正数](/leetcode/0041)
- [0442：数组中重复的数据](/leetcode/0442)
- [1980：找出不同的二进制字符串（1361 分）](/leetcode/1980)
- [2195：向数组中追加 K 个整数（1658 分）](/leetcode/2195)
- [2295：替换数组中的元素（1445 分）](/leetcode/2295)
- [2554：从一个范围内选择最多整数 I（1333 分）](/leetcode/2554)
- [2557：从一个范围内选择最多整数 II](/leetcode/2557)


## 分析

类似 {{< lc "0442" >}}，两种方法均可。

## 解答

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        for i,x in enumerate(nums):
            while x!=nums[x-1]:
                nums[i],nums[x-1]=nums[x-1],nums[i]
                x = nums[i]
        return [i+1 for i,x in enumerate(nums) if x!=i+1]
```
89 ms


