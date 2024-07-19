# 0918：环形子数组的最大和（1777 分）


> <u>**[力扣第 105 场周赛第 2 题](https://leetcode.cn/problems/maximum-sum-circular-subarray/)**</u>

## 题目

<p>给定一个长度为 <code>n</code> 的<strong>环形整数数组</strong> <code>nums</code> ，返回<em> <code>nums</code> 的非空 <strong>子数组</strong> 的最大可能和 </em>。</p>

<p><strong>环形数组</strong><em> </em>意味着数组的末端将会与开头相连呈环状。形式上， <code>nums[i]</code> 的下一个元素是 <code>nums[(i + 1) % n]</code> ， <code>nums[i]</code> 的前一个元素是 <code>nums[(i - 1 + n) % n]</code> 。</p>

<p><strong>子数组</strong> 最多只能包含固定缓冲区 <code>nums</code> 中的每个元素一次。形式上，对于子数组 <code>nums[i], nums[i + 1], ..., nums[j]</code> ，不存在 <code>i &lt;= k1, k2 &lt;= j</code> 其中 <code>k1 % n == k2 % n</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,-2,3,-2]
<strong>输出：</strong>3
<strong>解释：</strong>从子数组 [3] 得到最大和 3
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [5,-3,5]
<strong>输出：</strong>10
<strong>解释：</strong>从子数组 [5,5] 得到最大和 5 + 5 = 10
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,-2,2,-3]
<strong>输出：</strong>3
<strong>解释：</strong>从子数组 [3] 和 [3,-2,2] 都可以得到最大和 3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>-3 * 10<sup>4</sup> &lt;= nums[i] &lt;= 3 * 10<sup>4</sup></code>​​​​​​​</li>
</ul>




## 分析

### #1

涉及到子数组的和，首先想到前缀和。因为是环形数组，所以考虑求 nums*2 的前缀和。

得到前缀和数组 pre 后，问题转为：求最大的 pre[j]-pre[i] 满足 j-i<=len(nums)。

那么遍历 j，维护 pre[j-n:j] 的最小值即可。这类似于 {{< lc "0239" >}}，可以用有序集合解决。

```python
def maxSubarraySumCircular(self, nums: List[int]) -> int:
    from sortedcontainers import SortedList
    pre = list(accumulate([0]+nums*2))
    sl, n = SortedList(), len(nums)
    res = float('-inf')
    for j, x in enumerate(pre):
        if j:
            res = max(res, x-sl[0])
        sl.add(x)
        if j>=n:
            sl.remove(pre[j-n])
    return res
```
时间复杂度 O(N*logN)，1472 ms

### #2

也可以采用 {{< lc "0239" >}} 的单调队列方法。


## 解答

```python
def maxSubarraySumCircular(self, nums: List[int]) -> int:
    pre = list(accumulate([0]+nums*2))
    queue, n = deque(), len(nums)
    res = float('-inf')
    for j, x in enumerate(pre):
        if j:
            res = max(res, x-queue[0][0])
        while queue and queue[-1][0]>=x:
            queue.pop()
        queue.append((x, j))
        if queue[0][1]==j-n:
            queue.popleft()
    return res
```
时间复杂度 O(N)，340 ms

