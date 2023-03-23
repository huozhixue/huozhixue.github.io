# 0253：会议室 II（★）


> <u>**[力扣第 253 题](https://leetcode.cn/problems/meeting-rooms-ii/)**</u>

## 题目

<p>给你一个会议时间安排的数组 <code>intervals</code> ，每个会议时间都会包括开始和结束的时间 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> ，返回 <em>所需会议室的最小数量</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[0,30],[5,10],[15,20]]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[7,10],[2,4]]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= start<sub>i</sub> &lt; end<sub>i</sub> &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

先将 intervals 排序，然后模拟：
- 初始没有会议室
- 来了一个会议时，假如没有空闲的会议室，就加一个，并记录下会议结束时间
- 如果已经有会议室结束了，可以任选一个安排新的会议，并更新会议结束时间

## 解答

```python
def minMeetingRooms(self, intervals: List[List[int]]) -> int:
    pq = []
    for a,b in sorted(intervals):
        if pq and a>=pq[0]:
            heappop(pq)
        heappush(pq, b)
    return len(pq)
```
36 ms
