# 0315：计算右侧小于当前元素的个数（★★）


> <u>**[力扣第 315 题](https://leetcode.cn/problems/count-of-smaller-numbers-after-self/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code><em> </em>，按要求返回一个新数组 <code>counts</code><em> </em>。数组 <code>counts</code> 有该性质： <code>counts[i]</code> 的值是  <code>nums[i]</code> 右侧小于 <code>nums[i]</code> 的元素的数量。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [5,2,6,1]
<strong>输出：</strong><code>[2,1,1,0]
<strong>解释：</strong></code>
5 的右侧有 <strong>2 </strong>个更小的元素 (2 和 1)
2 的右侧仅有 <strong>1 </strong>个更小的元素 (1)
6 的右侧有 <strong>1 </strong>个更小的元素 (1)
1 的右侧有 <strong>0 </strong>个更小的元素
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1]
<strong>输出：</strong>[0]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1,-1]
<strong>输出：</strong>[0,0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

考虑从右往左遍历，并维护一个有序集合。二分查找 nums[i] 的位置即可得到 counts[i]。

要进行插入、查找的操作，考虑用 SortedList 维护，都能在 O(logN) 时间内完成。 

## 解答

```python
def countSmaller(self, nums: List[int]) -> List[int]:
    from sortedcontainers import SortedList
    n = len(nums)
    res, sl = [0]*n, SortedList()
    for i in range(n-1, -1, -1):
        res[i] = sl.bisect_left(nums[i])
        sl.add(nums[i])
    return res
```
时间 $O(N*logN)$，1088 ms

