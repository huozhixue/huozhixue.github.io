# 0057：插入区间（★）


> <u>**[力扣第 57 题](https://leetcode.cn/problems/insert-interval/)**</u>

## 题目

<p>给你一个<strong> 无重叠的</strong><em> ，</em>按照区间起始端点排序的区间列表。</p>

<p>在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,3],[6,9]], newInterval = [2,5]
<strong>输出：</strong>[[1,5],[6,9]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
<strong>输出：</strong>[[1,2],[3,10],[12,16]]
<strong>解释：</strong>这是因为新的区间 <code>[4,8]</code> 与 <code>[3,5],[6,7],[8,10]</code> 重叠。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>intervals = [], newInterval = [5,7]
<strong>输出：</strong>[[5,7]]
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,5]], newInterval = [2,3]
<strong>输出：</strong>[[1,5]]
</pre>

<p><strong>示例 5：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,5]], newInterval = [2,7]
<strong>输出：</strong>[[1,7]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 <= intervals.length <= 10<sup>4</sup></code></li>
<li><code>intervals[i].length == 2</code></li>
<li><code>0 <= intervals[i][0] <= intervals[i][1] <= 10<sup>5</sup></code></li>
<li><code>intervals</code> 根据 <code>intervals[i][0]</code> 按 <strong>升序</strong> 排列</li>
<li><code>newInterval.length == 2</code></li>
<li><code>0 <= newInterval[0] <= newInterval[1] <= 10<sup>5</sup></code></li>
</ul>


## 分析

### #1

区间列表有序，因此与新区间重叠的必然是连续的。

因此遍历找到第一个重叠的，开始合并，直到不重叠为止。所有重叠的一段合并为一个区间，而前后其它区间不变。

```python
def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
    i, (s, e) = 0, newInterval
    while i < len(intervals) and intervals[i][1] < s:
        i += 1
    j = i
    while j < len(intervals) and intervals[j][0] <= e:
        s, e = min(s, intervals[j][0]), max(e, intervals[j][1])
        j += 1
    return intervals[:i] + [[s, e]] + intervals[j:]
```
40 ms

### #2

也可以直接二分查找与新区间重叠的下标范围，替换为合并后的区间。

## 解答

```python
def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
    L, R = newInterval
    i = bisect_left(intervals, L, key=lambda x: x[1])
    j = bisect_right(intervals, R, key=lambda x: x[0])
    if i<j:
        L, R = min(L, intervals[i][0]), max(R, intervals[j-1][1])
    intervals[i:j] = [[L, R]]
    return intervals
```
36 ms
