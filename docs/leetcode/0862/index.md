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


- 子数组的和，首先想到前缀和，得到前缀和数组 P 后，问题转为：
	- 遍历位置 j ，求最大的 i<j 使得 P[i]<=P[j]-k
- 注意到如果 i2>i1 且 P[i2]<=i1，i2 比 i1 更优，后面的遍历都可以排除 i1
	- 因此维护一个单调栈，i 递增，P[i] 也递增
	- 要找的 i 即是最后一个满足 P[i]<=P[j]-k 的 i，可以二分查找
- 注意到对栈中的 i，遍历到第一个 j 使得 P[i]<=P[j]-k，那么 i 开头的所求最短即是 [i,j]，后面的遍历都可以排除 i
	- 所以维护了一个单调队列
	- 弹出 i 时即更新了最佳结果

## 解答

```python
class Solution:
    def shortestSubarray(self, nums: List[int], k: int) -> int:
        P = list(accumulate([0]+nums))
        res = inf
        Q = deque()
        for j,x in enumerate(P):
            while Q and Q[0][1]<=x-k:
                i,_ = Q.popleft()
                res = min(res,j-i)
            while Q and Q[-1][1]>=x:
                Q.pop()
            Q.append((j,x))
        return res if res<inf else -1
```
239 ms

