# 0057：插入区间（★★）


## 题目

给你一个 无重叠的 ，按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。


示例 1：

    输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
    输出：[[1,5],[6,9]]

示例 2：

    输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
    输出：[[1,2],[3,10],[12,16]]
    解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。

示例 3：

    输入：intervals = [], newInterval = [5,7]
    输出：[[5,7]]

示例 4：

    输入：intervals = [[1,5]], newInterval = [2,3]
    输出：[[1,5]]

示例 5：

    输入：intervals = [[1,5]], newInterval = [2,7]
    输出：[[1,7]]
 
提示：
- 0 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= intervals[i][0] <= intervals[i][1] <= 10^5
- intervals 根据 intervals[i][0] 按 升序 排列
- newInterval.length == 2
- 0 <= newInterval[0] <= newInterval[1] <= 10^5
	
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
