# 0075：颜色分类（★）


> <u>**[力扣第 75 题](https://leetcode.cn/problems/sort-colors/)**</u>

## 题目

<p>给定一个包含红色、白色和蓝色、共 <code>n</code><em> </em>个元素的数组<meta charset="UTF-8" /> <code>nums</code> ，<strong><a href="https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95" target="_blank">原地</a></strong>对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。</p>

<p>我们使用整数 <code>0</code>、 <code>1</code> 和 <code>2</code> 分别表示红色、白色和蓝色。</p>

<ul>
</ul>

<p>必须在不使用库内置的 sort 函数的情况下解决这个问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,0,2,1,1,0]
<strong>输出：</strong>[0,0,1,1,2,2]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,0,1]
<strong>输出：</strong>[0,1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 300</code></li>
<li><code>nums[i]</code> 为 <code>0</code>、<code>1</code> 或 <code>2</code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>你能想出一个仅使用常数空间的一趟扫描算法吗？</li>
</ul>


## 分析


题目要求 O(1) 空间，只能考虑交换或赋值了。
- 有个巧妙的想法是将所有 0 放到头部，所有 2 放到尾部，剩下部分即为 1
- 本题不能直接赋值，可能会覆盖掉有用信息，所以考虑交换
- 特别注意，如果交换过来还是 0 或 2，应该循环操作

## 解答
```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        l,r = 0,n-1
        for j in range(n):
            while True:
                if nums[j]==0 and j>=l:
                    nums[j],nums[l] = nums[l],nums[j]
                    l += 1
                elif nums[j]==2 and j<=r:
                    nums[j],nums[r] = nums[r],nums[j]
                    r -= 1
                else:
                    break
```
36 ms
