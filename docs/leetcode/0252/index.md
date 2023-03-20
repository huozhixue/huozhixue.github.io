# 0252：会议室（★）


## 题目

给定一个会议时间安排的数组 intervals ，每个会议时间都会包括开始和结束的时间
 intervals[i] = [starti, endi] ，请你判断一个人是否能够参加这里面的全部会议。

 

示例 1：

	输入：intervals = [[0,30],[5,10],[15,20]]
	输出：false

示例 2：

	输入：intervals = [[7,10],[2,4]]
	输出：true

提示：
- 0 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= starti < endi <= 10^6


## 分析

等价于所有区间都不重叠，排序后比较相邻区间即可。

## 解答

```python
def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
    return all(a[1]<=b[0] for a,b in pairwise(sorted(intervals)))
```
36 ms
