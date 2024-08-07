# 1696：跳跃游戏 VI（1954 分）


> <u>**[力扣第 220 场周赛第 3 题](https://leetcode.cn/problems/jump-game-vi/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> 和一个整数 <code>k</code> 。</p>

<p>一开始你在下标 <code>0</code> 处。每一步，你最多可以往前跳 <code>k</code> 步，但你不能跳出数组的边界。也就是说，你可以从下标 <code>i</code> 跳到 <code>[i + 1， min(n - 1, i + k)]</code> <strong>包含</strong> 两个端点的任意位置。</p>

<p>你的目标是到达数组最后一个位置（下标为 <code>n - 1</code> ），你的 <strong>得分</strong> 为经过的所有数字之和。</p>

<p>请你返回你能得到的 <strong>最大得分</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [<strong>1</strong>,<strong>-1</strong>,-2,<strong>4</strong>,-7,<strong>3</strong>], k = 2
<b>输出：</b>7
<b>解释：</b>你可以选择子序列 [1,-1,4,3] （上面加粗的数字），和为 7 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [<strong>10</strong>,-5,-2,<strong>4</strong>,0,<strong>3</strong>], k = 3
<b>输出：</b>17
<b>解释：</b>你可以选择子序列 [10,4,3] （上面加粗数字），和为 17 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>nums = [1,-5,-20,4,-1,3,-6,-3], k = 2
<b>输出：</b>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li> <code>1 <= nums.length, k <= 10<sup>5</sup></code></li>
<li><code>-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0239：滑动窗口最大值](/leetcode/0239)
- [1871：跳跃游戏 VII（1896 分）](/leetcode/1871)
- [2297：跳跃游戏 VIII](/leetcode/2297)
- [2836：在传球游戏中最大化函数值（2768 分）](/leetcode/2836)


## 分析

### #1

类似 {{< lc "1425" >}}，令 dp[j] 代表到达位置 j 的最大得分，那么可以递推：

	dp[j] = nums[j]+max(dp[j-k:j])

然后边递推边滑动 dp 数组，转为滑动窗口最大值问题。

```python
def maxResult(self, nums: List[int], k: int) -> int:
    from sortedcontainers import SortedList
    sl, dp = SortedList(), nums[:]
    for j, num in enumerate(nums):
        if j:
            dp[j] = num + sl[-1]
        sl.add(dp[j])
        if j>=k:
            sl.remove(dp[j-k])
    return dp[-1]
```
1376 ms

### #2

也可以用单调队列的方法。

## 解答

```python
def maxResult(self, nums: List[int], k: int) -> int:
    queue, dp = deque(), nums[:]
    for j, num in enumerate(nums):
        if j:
            dp[j] = num + queue[0][0]
        while queue and queue[-1][0]<=dp[j]:
            queue.pop()
        queue.append((dp[j], j))
        if queue[0][1] == j-k:
            queue.popleft()
    return dp[-1]
```
340 ms



