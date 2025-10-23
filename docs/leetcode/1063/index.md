# 1063：有效子数组的数目（★★）


> <u>**[力扣第 1063 题](https://leetcode.cn/problems/number-of-valid-subarrays/)**</u>

## 题目

<p>给定一个整数数组 <code>nums</code> ，返回满足下面条件的 <em>非空、连续</em><strong> 子数组</strong>的数目：</p>

<ul>
<li><strong>子数组 </strong>是数组的 <strong>连续</strong> 部分。</li>
<li><em>子数组最左边的元素不大于子数组中的其他元素</em> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,4,2,5,3]
<strong>输出：</strong>11
<strong>解释：</strong>有 11 个有效子数组，分别是：[1],[4],[2],[5],[3],[1,4],[2,5],[1,4,2],[2,5,3],[1,4,2,5],[1,4,2,5,3] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,2,1]
<strong>输出：</strong>3
<strong>解释：</strong>有 3 个有效子数组，分别是：[3],[2],[1] 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,2]
<strong>输出：</strong>6
<strong>解释：</strong>有 6 个有效子数组，分别为是：[2],[2],[2],[2,2],[2,2],[2,2,2] 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

- 为了方便，将 nums 反转得到 A
- 枚举 A[j] 为子数组末尾，找到上一个更小的元素 A[i]，那么 [i+1:j] 开头都可以
- 找上一个更小元素即是典型的单调栈
## 解答

```python
class Solution:
    def validSubarrays(self, nums: List[int]) -> int:
        A = nums[::-1]
        sk = []
        res = 0
        for j,a in enumerate(A):
            while sk and A[sk[-1]]>=a:
                sk.pop()
            i = sk[-1] if sk else -1
            res += j-i
            sk.append(j)
        return res
```
54 ms
