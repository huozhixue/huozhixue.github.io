# 0287：寻找重复数（★）


> <u>**[力扣第 287 题](https://leetcode.cn/problems/find-the-duplicate-number/)**</u>

## 题目

<p>给定一个包含 <code>n + 1</code> 个整数的数组 <code>nums</code> ，其数字都在 <code>[1, n]</code> 范围内（包括 <code>1</code> 和 <code>n</code>），可知至少存在一个重复的整数。</p>

<p>假设 <code>nums</code> 只有 <strong>一个重复的整数</strong> ，返回 <strong>这个重复的数</strong> 。</p>

<p>你设计的解决方案必须 <strong>不修改</strong> 数组 <code>nums</code> 且只用常量级 <code>O(1)</code> 的额外空间。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,3,4,2,2]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,1,3,4,2]
<strong>输出：</strong>3
</pre>

<p><strong>示例 3 :</strong></p>

<pre>
<strong>输入：</strong>nums = [3,3,3,3,3]
<strong>输出：</strong>3
</pre>





<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>nums.length == n + 1</code></li>
<li><code>1 &lt;= nums[i] &lt;= n</code></li>
<li><code>nums</code> 中 <strong>只有一个整数</strong> 出现 <strong>两次或多次</strong> ，其余整数均只出现 <strong>一次</strong></li>
</ul>



<p><b>进阶：</b></p>

<ul>
<li>如何证明 <code>nums</code> 中至少存在一个重复的数字?</li>
<li>你可以设计一个线性级时间复杂度 <code>O(n)</code> 的解决方案吗？</li>
</ul>


## 分析

### #1

- 如果可以修改数组，可以采用 {{< lc "0041" >}} 的方法
- 还可以采用标记负数的方法
	- 遍历到值 x 时，将位置 abs(x) 的值标记为负数
	- 若位置 abs(x) 的值已经被标记为负数，abs(x) 即为所求

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        for x in nums:
            if nums[abs(x)]<0:
                return abs(x)
            nums[abs(x)] *= -1
```
72 ms


### #2

要求不修改数组，有个非常巧妙的方法：
- 将 nums 看作是链表，nums[i] 表示节点 i 指向节点 nums[i]
- 那么从节点 0 出发的链表必然存在一个环，入环的节点即是所求
- 问题便等价于 {{< lc "0142" >}} 了

## 解答

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow=fast=0
        while True:
            slow,fast = nums[slow],nums[nums[fast]]
            if slow==fast:
                break
        p = 0
        while p!=slow:
            p,slow = nums[p],nums[slow]
        return p
```
64 ms

