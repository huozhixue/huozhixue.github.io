# 0033：搜索旋转排序数组（★）


> <u>**[力扣第 33 题](https://leetcode.cn/problems/search-in-rotated-sorted-array/)**</u>

## 题目

<p>整数数组 <code>nums</code> 按升序排列，数组中的值 <strong>互不相同</strong> 。</p>

<p>在传递给函数之前，<code>nums</code> 在预先未知的某个下标 <code>k</code>（<code>0 &lt;= k &lt; nums.length</code>）上进行了 <strong>旋转</strong>，使数组变为 <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code>（下标 <strong>从 0 开始</strong> 计数）。例如， <code>[0,1,2,4,5,6,7]</code> 在下标 <code>3</code> 处经旋转后可能变为 <code>[4,5,6,7,0,1,2]</code> 。</p>

<p>给你 <strong>旋转后</strong> 的数组 <code>nums</code> 和一个整数 <code>target</code> ，如果 <code>nums</code> 中存在这个目标值 <code>target</code> ，则返回它的下标，否则返回 <code>-1</code> 。</p>

<p>你必须设计一个时间复杂度为 <code>O(log n)</code> 的算法解决此问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [<code>4,5,6,7,0,1,2]</code>, target = 0
<strong>输出：</strong>4
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [<code>4,5,6,7,0,1,2]</code>, target = 3
<strong>输出：</strong>-1</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1], target = 0
<strong>输出：</strong>-1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 5000</code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
<li><code>nums</code> 中的每个值都 <strong>独一无二</strong></li>
<li>题目数据保证 <code>nums</code> 在预先未知的某个下标上进行了旋转</li>
<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0081：搜索旋转排序数组 II](/leetcode/0081)
- [0153：寻找旋转排序数组中的最小值](/leetcode/0153)
- [2137：通过倒水操作让所有的水桶所含水量相等](/leetcode/2137)


## 分析 

-  {{< lc "0153" >}} 进阶
- 先找到最小值位置 i
- 然后在 nums[:i]，nums[i:] 中分别二分查找

## 解答

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        n = len(nums)
        i = bisect_left(range(n),True,key=lambda i:nums[i]<nums[0])
        j = bisect_left(nums,target,0,i-1)
        k = bisect_left(nums,target,i,n-1) if i<n else 0
        return j if nums[j]==target else k if nums[k]==target else -1
```
28 ms
