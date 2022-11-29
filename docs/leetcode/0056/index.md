# 0056：合并区间（★）


## 题目

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

示例 1：

    输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
    输出：[[1,6],[8,10],[15,18]]
    解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

示例 2：
    
    输入：intervals = [[1,4],[4,5]]
    输出：[[1,5]]
    解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
	
提示：
- 1 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= starti <= endi <= 10^4

	
## 分析

显然能合并的区间范围必然相近，因此考虑先按起点排序，再遍历。

遍历过程中，如果当前区间的起点小于等于上一区间的终点，那么就可以合并；否则，就添加新区间。


## 解答

```python
def merge(self, intervals: List[List[int]]) -> List[List[int]]:
    res = []
    for s, e in sorted(intervals):
        if res and s <= res[-1][1]:
            res[-1][1] = max(res[-1][1], e)
        else:
            res.append([s, e])
    return res
```
56 ms
