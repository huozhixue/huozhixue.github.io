# 1121：将数组分成几个递增序列（★）


> <u>**[力扣第 4 场双周赛第 4 题](https://leetcode.cn/problems/divide-array-into-increasing-sequences/)**</u>

## 题目

<p>给你一个 <strong>非递减</strong> 的正整数数组 <code>nums</code> 和整数 <code>K</code>，判断该数组是否可以被分成一个或几个 <strong>长度至少 为 </strong><code>K</code><strong> 的 不相交的递增子序列</strong>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [1,2,2,3,3,4,4], K = 3
<strong>输出：</strong>true
<strong>解释：</strong>
该数组可以分成两个子序列 [1,2,3,4] 和 [2,3,4]，每个子序列的长度都至少是 3。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [5,6,6,7,8], K = 3
<strong>输出：</strong>false
<strong>解释：</strong>
没有办法根据条件来划分数组。
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= nums.length &lt;= 10^5</code></li>
<li><code>1 &lt;= K &lt;= nums.length</code></li>
<li><code>1 &lt;= nums[i] &lt;= 10^5</code></li>
</ol>


## 分析

- 相同元素只能分到不同序列中
- 那么最多的元素 w，表明至少 w 个序列
- 判断 w*k<=n 即可

## 解答

```python
class Solution:
    def canDivideIntoSubsequences(self, nums: List[int], k: int) -> bool:
        return len(nums)>=max(Counter(nums).values())*k
```

35 ms
