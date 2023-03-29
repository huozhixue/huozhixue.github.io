# 0327：区间和的个数（★★）


> <u>**[力扣第 327 题](https://leetcode.cn/problems/count-of-range-sum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 以及两个整数 <code>lower</code> 和 <code>upper</code> 。求数组中，值位于范围 <code>[lower, upper]</code> （包含 <code>lower</code> 和 <code>upper</code>）之内的 <strong>区间和的个数</strong> 。</p>

<p><strong>区间和</strong> <code>S(i, j)</code> 表示在 <code>nums</code> 中，位置从 <code>i</code> 到 <code>j</code> 的元素之和，包含 <code>i</code> 和 <code>j</code> (<code>i</code> ≤ <code>j</code>)。</p>


<strong>示例 1：</strong>

<pre>
<strong>输入：</strong>nums = [-2,5,-1], lower = -2, upper = 2
<strong>输出：</strong>3
<strong>解释：</strong>存在三个区间：[0,0]、[2,2] 和 [0,2] ，对应的区间和分别是：-2 、-1 、2 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0], lower = 0, upper = 0
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>-2<sup>31</sup> <= nums[i] <= 2<sup>31</sup> - 1</code></li>
<li><code>-10<sup>5</sup> <= lower <= upper <= 10<sup>5</sup></code></li>
<li>题目数据保证答案是一个 <strong>32 位</strong> 的整数</li>
</ul>


## 分析

区间和容易想到前缀和，于是先得到前缀和数组 pre，pre[i]=sum(nums[:i])。

遍历位置 j，求满足 i<j, lower<=pre[j]-pre[i]<=upper 的 i 个数即可。

于是考虑维护 pre[:j] 的有序集合，即可二分查找 i 的个数。

要进行插入、查找的操作，考虑用 SortedList，都能在 O(logN) 时间内完成。

## 解答

```python
def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
    from sortedcontainers import SortedList
    res, sl = 0, SortedList()
    for x in accumulate([0]+nums):
        res += sl.bisect_right(x-lower)-sl.bisect_left(x-upper)
        sl.add(x)
    return res
```
时间 $O(N*logN)$，1492 ms

