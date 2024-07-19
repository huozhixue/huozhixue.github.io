# 0189：轮转数组（★）


> <u>**[力扣第 189 题](https://leetcode.cn/problems/rotate-array/)**</u>

## 题目

<p>给定一个整数数组 <code>nums</code>，将数组中的元素向右轮转 <code>k</code><em> </em>个位置，其中 <code>k</code><em> </em>是非负数。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,3,4,5,6,7], k = 3
<strong>输出:</strong> <code>[5,6,7,1,2,3,4]</code>
<strong>解释:</strong>
向右轮转 1 步: <code>[7,1,2,3,4,5,6]</code>
向右轮转 2 步: <code>[6,7,1,2,3,4,5]
</code>向右轮转 3 步: <code>[5,6,7,1,2,3,4]</code>
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong>nums = [-1,-100,3,99], k = 2
<strong>输出：</strong>[3,99,-1,-100]
<strong>解释:</strong>
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>尽可能想出更多的解决方案，至少有 <strong>三种</strong> 不同的方法可以解决这个问题。</li>
<li>你可以使用空间复杂度为 <code>O(1)</code> 的 <strong>原地 </strong>算法解决这个问题吗？</li>
</ul>


**相似问题：**
- [0061：旋转链表](/leetcode/0061)
- [0186：反转字符串中的单词 II](/leetcode/0186)
- [2607：使子数组元素和相等（2071 分）](/leetcode/2607)


## 分析

### #1

最简单的就是切片。
				
```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        k%=len(nums)
        nums[:] = nums[-k:]+nums[:-k]
```
42 ms

### #2

- 要求空间复杂度 O(1)，考虑原地反转
- 先将 nums 反转
- 再将 nums[:k] 和 nums[k:] 反转即可
 
## 解答

```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        def rev(i, j):
            while i < j:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
                j -= 1

        n = len(nums)
        k %= n
        rev(0, n-1)
        rev(0, k-1)
        rev(k, n-1)
```
43 ms



