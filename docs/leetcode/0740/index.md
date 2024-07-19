# 0740：删除并获得点数（★）


> <u>**[力扣第 740 题](https://leetcode.cn/problems/delete-and-earn/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，你可以对它进行一些操作。</p>

<p>每次操作中，选择任意一个 <code>nums[i]</code> ，删除它并获得 <code>nums[i]</code> 的点数。之后，你必须删除 <strong>所有 </strong>等于 <code>nums[i] - 1</code> 和 <code>nums[i] + 1</code> 的元素。</p>

<p>开始你拥有 <code>0</code> 个点数。返回你能通过这些操作获得的最大点数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,4,2]
<strong>输出：</strong>6
<strong>解释：</strong>
删除 4 获得 4 个点数，因此 3 也被删除。
之后，删除 2 获得 2 个点数。总共获得 6 个点数。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,3,3,3,4]
<strong>输出：</strong>9
<strong>解释：</strong>
删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
总共获得 9 个点数。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 2 * 10<sup>4</sup></code></li>
<li><code>1 <= nums[i] <= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0198：打家劫舍](/leetcode/0198)


## 分析

### #1 

- 不能拿相邻的数，这个限制类似 {{< lc "0198" >}} 打家劫舍
- 可以用计数器统计每个数的个数，然后按值域范围递推即可
```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        ct = Counter(nums)
        a,b = 0,0
        for x in range(min(nums),max(nums)+1):
            a,b = b,max(a+x*ct[x],b)
        return b
```
48 ms

### #2

也可以排序后按元素递推，相邻元素之差不为 1 即可同时选。

## 解答

```python
class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        A = sorted(Counter(nums).items())
        a,b = 0,0
        for i,(x,w) in enumerate(A):
            a,b = b,max(a+x*w,b) if i and A[i-1][0]==x-1 else b+x*w
        return b
```
46 ms

