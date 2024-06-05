# 1438：绝对差不超过限制的最长连续子数组（1672 分）


> <u>**[力扣第 187 场周赛第 3 题](https://leetcode.cn/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，和一个表示限制的整数 <code>limit</code>，请你返回最长连续子数组的长度，该子数组中的任意两个元素之间的绝对差必须小于或者等于 <code>limit</code><em> 。</em></p>

<p>如果不存在满足条件的子数组，则返回 <code>0</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [8,2,4,7], limit = 4
<strong>输出：</strong>2
<strong>解释：</strong>所有子数组如下：
[8] 最大绝对差 |8-8| = 0 &lt;= 4.
[8,2] 最大绝对差 |8-2| = 6 &gt; 4.
[8,2,4] 最大绝对差 |8-2| = 6 &gt; 4.
[8,2,4,7] 最大绝对差 |8-2| = 6 &gt; 4.
[2] 最大绝对差 |2-2| = 0 &lt;= 4.
[2,4] 最大绝对差 |2-4| = 2 &lt;= 4.
[2,4,7] 最大绝对差 |2-7| = 5 &gt; 4.
[4] 最大绝对差 |4-4| = 0 &lt;= 4.
[4,7] 最大绝对差 |4-7| = 3 &lt;= 4.
[7] 最大绝对差 |7-7| = 0 &lt;= 4.
因此，满足题意的最长子数组的长度为 2 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [10,1,2,4,7,2], limit = 5
<strong>输出：</strong>4
<strong>解释：</strong>满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 &lt;= 5 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>nums = [4,2,2,2,4,4,2,2], limit = 0
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10^5</code></li>
<li><code>1 &lt;= nums[i] &lt;= 10^9</code></li>
<li><code>0 &lt;= limit &lt;= 10^9</code></li>
</ul>


## 分析

### #1

显然可以遍历结尾下标 j，找最小的 i 使得 max(nums[i:j+1])-min(nums[i:j+1])<=limit。

注意到随着 j 递增，i 必然不递减，因此是一个滑动窗口问题。

要维护 nums[i:j+1] 的最大值和最小值，考虑用有序集合。

```python
def longestSubarray(self, nums: List[int], limit: int) -> int:
    from sortedcontainers import SortedList
    sl = SortedList()
    res, i = 0, 0
    for j, num in enumerate(nums):
        sl.add(num)
        while sl[-1]-sl[0]>limit:
            sl.remove(nums[i])
            i += 1
        res = max(res, j-i+1)
    return res
```
1164 ms

### #2

也可以用两个单调队列分别维护窗口的最大/小值。

## 解答

```python
def longestSubarray(self, nums: List[int], limit: int) -> int:
    que1, que2 = deque(), deque()
    res, i = 0, 0
    for j, num in enumerate(nums):
        while que1 and que1[-1][0]<=num:
            que1.pop()
        while que2 and que2[-1][0]>=num:
            que2.pop()
        que1.append((num, j))
        que2.append((num, j))
        while que1[0][0]-que2[0][0]>limit:
            if que1[0][1] == i:
                que1.popleft()
            if que2[0][1] == i:
                que2.popleft()
            i += 1
        res = max(res, j-i+1)
    return res
```
328 ms


