# 0480：滑动窗口中位数（★★）


> <u>**[力扣第 480 题](https://leetcode.cn/problems/sliding-window-median/)**</u>

## 题目

<p>中位数是有序序列最中间的那个数。如果序列的长度是偶数，则没有最中间的数；此时中位数是最中间的两个数的平均数。</p>

<p>例如：</p>

<ul>
<li><code>[2,3,4]</code>，中位数是 <code>3</code></li>
<li><code>[2,3]</code>，中位数是 <code>(2 + 3) / 2 = 2.5</code></li>
</ul>

<p>给你一个数组 <em>nums</em>，有一个长度为 <em>k</em> 的窗口从最左端滑动到最右端。窗口中有 <em>k</em> 个数，每次窗口向右移动 <em>1</em> 位。你的任务是找出每次窗口移动后得到的新窗口中元素的中位数，并输出由它们组成的数组。</p>



<p><strong>示例：</strong></p>

<p>给出 <em>nums</em> = <code>[1,3,-1,-3,5,3,6,7]</code>，以及 <em>k</em> = 3。</p>

<pre>
窗口位置                      中位数
---------------               -----
[1  3  -1] -3  5  3  6  7       1
1 [3  -1  -3] 5  3  6  7      -1
1  3 [-1  -3  5] 3  6  7      -1
1  3  -1 [-3  5  3] 6  7       3
1  3  -1  -3 [5  3  6] 7       5
1  3  -1  -3  5 [3  6  7]      6
</pre>

<p> 因此，返回该滑动窗口的中位数数组 <code>[1,-1,-1,3,5,6]</code>。</p>



<p><strong>提示：</strong></p>

<ul>
<li>你可以假设 <code>k</code> 始终有效，即：<code>k</code> 始终小于等于输入的非空数组的元素个数。</li>
<li>与真实值误差在 <code>10 ^ -5</code> 以内的答案将被视作正确答案。</li>
</ul>


## 分析

维护窗口对应的有序集合即可。

## 解答


```python
class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        from sortedcontainers import SortedList
        res, sl = [], SortedList()
        for j,x in enumerate(nums):
            sl.add(x)
            if j>=k:
                sl.remove(nums[j-k])
            if j>=k-1:
                mid = (sl[(k-1)//2]+sl[k//2])/2
                res.append(mid)
        return res
```
319 ms
