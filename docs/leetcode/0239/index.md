# 0239：滑动窗口最大值（★★）


> <u>**[力扣第 239 题](https://leetcode.cn/problems/sliding-window-maximum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code>，有一个大小为 <code>k</code><em> </em>的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 <code>k</code> 个数字。滑动窗口每次只向右移动一位。</p>

<p>返回 <em>滑动窗口中的最大值 </em>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [1,3,-1,-3,5,3,6,7], k = 3
<b>输出：</b>[3,3,5,5,6,7]
<b>解释：</b>
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       <strong>3</strong>
1 [3  -1  -3] 5  3  6  7       <strong>3</strong>
1  3 [-1  -3  5] 3  6  7      <strong> 5</strong>
1  3  -1 [-3  5  3] 6  7       <strong>5</strong>
1  3  -1  -3 [5  3  6] 7       <strong>6</strong>
1  3  -1  -3  5 [3  6  7]      <strong>7</strong>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>nums = [1], k = 1
<b>输出：</b>[1]
</pre>



<p><b>提示：</b></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= k &lt;= nums.length</code></li>
</ul>


## 分析

### #1

考虑维护一个长度 k 的有序窗口，每轮取最大值即可。

窗口要进行插入、删除、取最大值的操作，考虑用有序集合 SortedList，都能在 O(logN) 时间内完成。

```python
def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
    from sortedcontainers import SortedList
    res, sl = [], SortedList()
    for j, num in enumerate(nums):
        sl.add(num)
        if j >= k:
            sl.remove(nums[j-k])
        if j >= k-1:
            res.append(sl[-1])
    return res
```
时间复杂度 O(N*logN)，2628 ms

### #2

有个巧妙的单调队列方法。
- 当窗口内存在 i<j 且 nums[i]<=nums[j] 时，去掉 nums[i] 不影响结果
- 去掉所有这种情况的元素，剩下的即是一个严格单调递减队列
- 每轮维护这个队列，队首即是最大值
- 注意当队首不在窗口内时，要删掉，因此队列还需保存下标

## 解答

```python
def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
    res, Q = [], deque()
    for j, y in enumerate(nums):
        while Q and Q[-1][1] <= y:
            Q.pop()
        Q.append((j, y))
        if Q[0][0] == j-k:
            Q.popleft()
        if j >= k-1:
            res.append(Q[0][1])
    return res
```
时间复杂度 O(N)，396 ms
