# 0442：数组中重复的数据（★）


> <u>**[力扣第 442 题](https://leetcode.cn/problems/find-all-duplicates-in-an-array/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 的整数数组 <code>nums</code> ，其中 <code>nums</code> 的所有整数都在范围 <code>[1, n]</code> 内，且每个整数出现 <strong>一次</strong> 或 <strong>两次</strong> 。请你找出所有出现 <strong>两次</strong> 的整数，并以数组形式返回。</p>

<p>你必须设计并实现一个时间复杂度为 <code>O(n)</code> 且仅使用常量额外空间的算法解决此问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,3,2,7,8,2,3,1]
<strong>输出：</strong>[2,3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,2]
<strong>输出：</strong>[1]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= n</code></li>
<li><code>nums</code> 中的每个元素出现 <strong>一次</strong> 或 <strong>两次</strong></li>
</ul>


## 分析

## #1

可以类似 {{< lc "0041" >}}，将正数都放在对应的位置上，出现两次的没法全放，即可返回。

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        for i,x in enumerate(nums):
            while x!=nums[x-1]:
                nums[i], nums[x-1] = nums[x-1], nums[i]
                x = nums[i]
        return [x for i,x in enumerate(nums) if x!=i+1]
```
89 ms

## #2

还有个修改原数组的方法：
- 遍历到数 x 时，将位置 x-1 取为负数
- 如果位置 x-1 已经是负数，即说明 x 是第二次遇见了

## 解答


```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        res = []
        for x in nums:
            if nums[abs(x)-1] > 0:
                nums[abs(x)-1] *= -1
            else:
                res.append(abs(x))     
        return res
```
71 ms
