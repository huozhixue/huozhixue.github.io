# 1288：删除被覆盖区间（1375 分）


> <u>**[力扣第 15 场双周赛第 2 题](https://leetcode.cn/problems/remove-covered-intervals/)**</u>

## 题目

<p>给你一个区间列表，请你删除列表中被其他区间所覆盖的区间。</p>

<p>只有当 <code>c &lt;= a</code> 且 <code>b &lt;= d</code> 时，我们才认为区间 <code>[a,b)</code> 被区间 <code>[c,d)</code> 覆盖。</p>

<p>在完成所有删除操作后，请你返回列表中剩余区间的数目。</p>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,4],[3,6],[2,8]]
<strong>输出：</strong>2
<strong>解释：</strong>区间 [3,6] 被区间 [2,8] 覆盖，所以它被删除了。
</pre>



<p><strong>提示：</strong>​​​​​​</p>

<ul>
<li><code>1 &lt;= intervals.length &lt;= 1000</code></li>
<li><code>0 &lt;= intervals[i][0] &lt; intervals[i][1] &lt;= 10^5</code></li>
<li>对于所有的 <code>i != j</code>：<code>intervals[i] != intervals[j]</code></li>
</ul>


## 分析

将区间按 <左端点从小到大，右端点从大到小> 排序，遍历每个区间，判断右端点是否<=上一个区间的右端点即可。

## 解答


```python
def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
	res, pre = 0, -1
	for a, b in sorted(intervals, key=lambda x: (x[0], -x[1])):
		if b>pre:
			pre = b
			res += 1
	return res
```
36 ms
