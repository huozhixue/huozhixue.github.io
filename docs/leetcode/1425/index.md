# 1425：带限制的子序列和（★★）


> <u>**[力扣第 186 场周赛第 4 题](https://leetcode.cn/problems/constrained-subsequence-sum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，请你返回 <strong>非空</strong> 子序列元素和的最大值，子序列需要满足：子序列中每两个 <strong>相邻</strong> 的整数 <code>nums[i]</code> 和 <code>nums[j]</code> ，它们在原数组中的下标 <code>i</code> 和 <code>j</code> 满足 <code>i &lt; j</code> 且 <code>j - i &lt;= k</code> 。</p>

<p>数组的子序列定义为：将数组中的若干个数字删除（可以删除 0 个数字），剩下的数字按照原本的顺序排布。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [10,2,-10,5,20], k = 2
<strong>输出：</strong>37
<strong>解释：</strong>子序列为 [10, 2, 5, 20] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [-1,-2,-3], k = 1
<strong>输出：</strong>-1
<strong>解释：</strong>子序列必须是非空的，所以我们选择最大的数字。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>nums = [10,-2,-10,-5,20], k = 2
<strong>输出：</strong>23
<strong>解释：</strong>子序列为 [10, -2, -5, 20] 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= nums.length &lt;= 10^5</code></li>
<li><code>-10^4 &lt;= nums[i] &lt;= 10^4</code></li>
</ul>


## 分析

### #1

令 dp[j] 代表以 nums[j] 结尾的满足要求的最大子序列和，那么显然可以递推：

    dp[j] = nums[j]+max(dp[j-k:j]+[0])
    
但是这样时间复杂度为 O(N*K)，会超时。

注意到递推式中本质是在求滑动窗口的最大值，因此类似 {{< lc "0239" >}}，可以用有序集合解决。

>本题滑动窗口的区别在于，数组并不是一开始就给定的，而是边递推边滑动的。

```python
def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
    from sortedcontainers import SortedList
    sl, dp = SortedList(), nums[:]
    for j, num in enumerate(nums):
        if j:
            dp[j] = num + max(0, sl[-1])
        sl.add(dp[j])
        if j>=k:
            sl.remove(dp[j-k])
    return max(dp)
```
时间复杂度 O(N*logN)，3032 ms

### #2

也可以采用 {{< lc "0239" >}} 的单调队列方法。


## 解答

```python
def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
    queue, dp = deque(), nums[:]
    for j, num in enumerate(nums):
        dp[j] = num + max(0, queue[0][0] if queue else 0)
        while queue and queue[-1][0]<=dp[j]:
            queue.pop()
        queue.append((dp[j], j))
        if queue[0][1] == j-k:
            queue.popleft()
    return max(dp)
```
时间复杂度 O(N)，652 ms


