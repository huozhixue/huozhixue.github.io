# 0253：会议室 II（★★）


## 题目

给你一个会议时间安排的数组 intervals ，每个会议时间都会包括开始和结束的时间 
intervals[i] = [starti, endi] ，返回 所需会议室的最小数量 。

 

示例 1：

	输入：intervals = [[0,30],[5,10],[15,20]]
	输出：2

示例 2：

	输入：intervals = [[7,10],[2,4]]
	输出：1
	 

提示：
- 1 <= intervals.length <= 10^4
- 0 <= starti < endi <= 10^6

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
