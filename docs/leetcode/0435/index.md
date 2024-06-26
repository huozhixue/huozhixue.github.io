# 0435：无重叠区间（★）


> <u>**[力扣第 435 题](https://leetcode.cn/problems/non-overlapping-intervals/)**</u>

## 题目

<p>给定一个区间的集合 <code>intervals</code> ，其中 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> 。返回 <em>需要移除区间的最小数量，使剩余区间互不重叠 </em>。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> intervals = [[1,2],[2,3],[3,4],[1,3]]
<strong>输出:</strong> 1
<strong>解释:</strong> 移除 [1,3] 后，剩下的区间没有重叠。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> intervals = [ [1,2], [1,2], [1,2] ]
<strong>输出:</strong> 2
<strong>解释:</strong> 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> intervals = [ [1,2], [2,3] ]
<strong>输出:</strong> 0
<strong>解释:</strong> 你不需要移除任何区间，因为它们已经是无重叠的了。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= intervals.length &lt;= 10<sup>5</sup></code></li>
<li><code>intervals[i].length == 2</code></li>
<li><code>-5 * 10<sup>4</sup> &lt;= start<sub>i</sub> &lt; end<sub>i</sub> &lt;= 5 * 10<sup>4</sup></code></li>
</ul>


## 分析


### #1

- 等价于求最多的不重叠区间
- 假如选了区间 [a,b]，那么所有在它左边的区间 [c,d] 必然要满足 d<=a
- 因此考虑将区间按右端点排序，并遍历递推
	- 令 f[i] 代表 intervals[:i+1] 最多的不重叠区间
	- 假如不选第 i 个区间，转为 f[i-1]
	- 假如选第 i 个区间 [a,b]，二分查找到最后一个 j 满足 intervals[j][1]<=a，转为 1+f[j]

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        A = sorted(intervals,key=lambda p:p[1])
        n = len(A)
        f = [0]*n
        for i in range(n):
            j = bisect_left(range(i),True,key=lambda j:A[j][1]>A[i][0])-1
            f[i] = max(f[i-1],1+f[j])
        return n-f[-1]
```
1048 ms
### #2

还可以用贪心
- 假如最优解的第一个区间是 <a, b>，将它替换为右端最小的区间，依然不重叠
- 因此将区间按右端点排序，尽量选右端点小的区间即可


## 解答

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        A = sorted(intervals,key=lambda p:p[1])
        res,r = len(A),-inf
        for a,b in A:
            if a>=r:
                r = b
                res -= 1
        return res
```
167 ms
