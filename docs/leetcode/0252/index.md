# 0252：会议室


> <u>**[力扣第 252 题](https://leetcode.cn/problems/meeting-rooms/)**</u>

## 题目

<p>给定一个会议时间安排的数组 <code>intervals</code> ，每个会议时间都会包括开始和结束的时间 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> ，请你判断一个人是否能够参加这里面的全部会议。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[0,30],[5,10],[15,20]]
<strong>输出</strong>：false
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[7,10],[2,4]]
<strong>输出</strong>：true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 <= intervals.length <= 10<sup>4</sup></code></li>
<li><code>intervals[i].length == 2</code></li>
<li><code>0 <= start<sub>i</sub> < end<sub>i</sub> <= 10<sup>6</sup></code></li>
</ul>


## 分析

等价于所有区间都不重叠，排序后比较相邻区间即可。

## 解答

```python
def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
    return all(a[1]<=b[0] for a,b in pairwise(sorted(intervals)))
```
36 ms
