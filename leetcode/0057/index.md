# 0057：插入区间（★★）


## 题目

给出一个无重叠的 ，按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

示例 1：

	输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
	输出：[[1,5],[6,9]]
	
示例 2：

	输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
	输出：[[1,2],[3,10],[12,16]]
	解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。


	
## 分析

### #1

类似 0056 ，因此最简单的方法就是直接将新区间加入列表，就可以调用 0056 的代码了。

```python
def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
	res = []
	for interval in sorted(intervals+[newInterval], key=lambda x: x[0]):
		if res and interval[0] <= res[-1][1]:
			res[-1][1] = max(res[-1][1], interval[1])
		else:
			res.append(interval)
	return res
```

时间复杂度 O(N*logN)，40 ms

### #2

显示上面的方法有很多不必要的遍历。既然列表已经排序，那么与新区间不重叠的保持原样即可，而重叠的全部合成一个区间即可。

合并时，动态更新重叠区间的起点和终点，直到下一个区间不重叠为止。

## 解答

```python
def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
	res, i, n = [], 0, len(intervals)
	while i < n and intervals[i][1] < newInterval[0]:
		res.append(intervals[i])
		i += 1
	while i < n and intervals[i][0] <= newInterval[1]:
		newInterval[0] = min(newInterval[0], intervals[i][0])
		newInterval[1] = max(newInterval[1], intervals[i][1])
		i += 1
	res.append(newInterval)
	res.extend(intervals[i:])
	return res
```

时间复杂度 O(N)，44 ms
