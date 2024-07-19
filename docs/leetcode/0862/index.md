# 0862：和至少为 K 的最短子数组（2306 分）


> <u>**[力扣第 91 场周赛第 4 题](https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，找出 <code>nums</code> 中和至少为 <code>k</code> 的 <strong>最短非空子数组</strong> ，并返回该子数组的长度。如果不存在这样的 <strong>子数组</strong> ，返回 <code>-1</code> 。</p>

<p><strong>子数组</strong> 是数组中 <strong>连续</strong> 的一部分。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1], k = 1
<strong>输出：</strong>1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2], k = 4
<strong>输出：</strong>-1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,-1,2], k = 3
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [3097：或值至少为 K 的最短子数组 II（1891 分）](/leetcode/3097)
- [3095：或值至少 K 的最短子数组 I（1368 分）](/leetcode/3095)


## 分析

### #1

涉及到子数组的和，首先想到前缀和。得到前缀和数组 pre 后，问题转为：
求最小的 j-i 使得 pre[i]<=pre[j]-K。

暴力法就是遍历位置 j，在 pre[:j] 中找最大的满足要求的 i。

注意到如果 x < y 且 pre[x] >= pre[y]，那么 y 比 x 更优，在后面的遍历中都可以排除 x。

因此可以维护一个严格递增的栈 stack，保存有用的位置和值。
然后就可以二分查找最大的 i 了。
	
```python
def shortestSubarray(self, nums: List[int], k: int) -> int:
    pre = list(accumulate([0]+nums))
    res, stack = float('inf'), []
    for j,x in enumerate(pre):
        while stack and stack[-1][0]>=x:
            stack.pop()
        pos = bisect_right(stack, (x-k, float('inf')))-1
        if pos>=0:
            res = min(res, j-stack[pos][1])
        stack.append((x, j))
    return res if res<float('inf') else -1
```
时间复杂度 O(N*logN)，728 ms

### #2

还有个巧妙的想法。对于栈中的 i，当遍历到第一个 j 使得 pre[i]<=pre[j]-K，那么以 i 开头的最短子数组就是
pre[i:j+1]，可以弹出 i 并更新结果。

因此，可以维护一个单调队列。

## 解答

```python
def shortestSubarray(self, nums: List[int], k: int) -> int:
    pre = list(accumulate([0]+nums))
    res, queue = float('inf'), deque()
    for j,x in enumerate(pre):
        while queue and queue[-1][0]>=x:
            queue.pop()
        while queue and queue[0][0]<=x-k:
            res = min(res, j-queue.popleft()[1])
        queue.append((x, j))
    return res if res<float('inf') else -1
```
时间复杂度 O(N)，464 ms

