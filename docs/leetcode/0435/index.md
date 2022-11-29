# 0435：无重叠区间（★★）


## 题目

给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。
返回 需要移除区间的最小数量，使剩余区间互不重叠 。

 

示例 1:

    输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
    输出: 1
    解释: 移除 [1,3] 后，剩下的区间没有重叠。
示例 2:
    
    输入: intervals = [ [1,2], [1,2], [1,2] ]
    输出: 2
    解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
示例 3:

    输入: intervals = [ [1,2], [2,3] ]
    输出: 0
    解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
 

提示:
- 1 <= intervals.length <= 10^5
- intervals[i].length == 2
- -5 * 10^4 <= starti < endi <= 5 * 10^4



## 分析

### #1

可以反过来找最大的不重叠区间子集，剩下的即是最小数量。

考虑先排序，然后问题等价于找一个最长的递增子序列（区间意义上的大小关系）。

于是可以用 {{< lc "0300" >}} 的方法解决，但要注意区间比较大小的特殊性：
- 令 A[k] 代表当前所有长度为 k+1 的递增子序列的最小尾数（这里是指最后一个区间的 end）
- 对于区间 <start, end>，二分查找最后一个 k 使得 A[k]<=start
- 更新 A[k+1] 为 min(A[k+1], end)

```python
def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
    intervals.sort()
    A = []
    for s, e in intervals:
        pos = bisect_right(A, s)
        x = e if pos==len(A) else min(e, A[pos])
        A[pos:pos+1] = [x]
    return len(intervals)-len(A)
```
396 ms

### #2

本题还有个巧妙的想法，必然存在一个最优解使得第一个区间是 end 最小的区间。

证明很简单，假如最优解的第一个区间是 <s, e>，那么将它替换为 end 最小的区间，依然是最优解。

那么去除掉与第一个区间重叠的区间后，剩下的就是子问题了，可以用同样的策略。

因此将区间按 end 最小到大排序，能放就放即可。

## 解答

```python
def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
    intervals.sort(key=lambda x: x[1])
    cnt, end = 0, float('-inf')
    for s, e in intervals:
        if s>=end:
            end = e
            cnt += 1
    return len(intervals)-cnt
```
188 ms

