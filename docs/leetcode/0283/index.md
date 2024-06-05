# 0283：移动零


> <u>**[力扣第 283 题](https://leetcode.cn/problems/move-zeroes/)**</u>

## 题目

<p>给定一个数组 <code>nums</code>，编写一个函数将所有 <code>0</code> 移动到数组的末尾，同时保持非零元素的相对顺序。</p>

<p><strong>请注意</strong> ，必须在不复制数组的情况下原地对数组进行操作。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = <code>[0,1,0,3,12]</code>
<strong>输出:</strong> <code>[1,3,12,0,0]</code>
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = <code>[0]</code>
<strong>输出:</strong> <code>[0]</code></pre>



<p><strong>提示</strong>:</p>
<meta charset="UTF-8" />

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><b>进阶：</b>你能尽量减少完成的操作次数吗？</p>


## 分析

类似 {{< lc "0027" >}} ，将非零元素交换到前面即可。

## 解答

```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        i = 0
        for j,x in enumerate(nums):
            if x:
                nums[i],nums[j] = nums[j],nums[i]
                i += 1
```
41 ms
