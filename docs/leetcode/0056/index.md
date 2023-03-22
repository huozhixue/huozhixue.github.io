# 0056：合并区间（★）


> <u>**[力扣第 56 题](https://leetcode.cn/problems/merge-intervals/)**</u>

## 题目

<p>以数组 <code>intervals</code> 表示若干个区间的集合，其中单个区间为 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> 。请你合并所有重叠的区间，并返回 <em>一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,3],[2,6],[8,10],[15,18]]
<strong>输出：</strong>[[1,6],[8,10],[15,18]]
<strong>解释：</strong>区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,4],[4,5]]
<strong>输出：</strong>[[1,5]]
<strong>解释：</strong>区间 [1,4] 和 [4,5] 可被视为重叠区间。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>
<li><code>intervals[i].length == 2</code></li>
<li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
</ul>


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
