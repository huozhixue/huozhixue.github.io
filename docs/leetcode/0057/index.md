# 0057：插入区间（★）


> <u>**[力扣第 57 题](https://leetcode.cn/problems/insert-interval/)**</u>

## 题目

<p>给你一个<strong> 无重叠的</strong><em> ，</em>按照区间起始端点排序的区间列表 <code>intervals</code>，其中 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> 表示第 <code>i</code> 个区间的开始和结束，并且 <code>intervals</code> 按照 <code>start<sub>i</sub></code> 升序排列。同样给定一个区间 <code>newInterval = [start, end]</code> 表示另一个区间的开始和结束。</p>

<p>在 <code>intervals</code> 中插入区间 <code>newInterval</code>，使得 <code>intervals</code> 依然按照 <code>start<sub>i</sub></code> 升序排列，且区间之间不重叠（如果有必要的话，可以合并区间）。</p>

<p>返回插入之后的 <code>intervals</code>。</p>

<p><strong>注意</strong> 你不需要原地修改 <code>intervals</code>。你可以创建一个新数组然后返回它。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,3],[6,9]], newInterval = [2,5]
<strong>输出：</strong>[[1,5],[6,9]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
<strong>输出：</strong>[[1,2],[3,10],[12,16]]
<strong>解释：</strong>这是因为新的区间 <code>[4,8]</code> 与 <code>[3,5],[6,7],[8,10]</code> 重叠。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>
<li><code>intervals[i].length == 2</code></li>
<li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
<li><code>intervals</code> 根据 <code>start<sub>i</sub></code> 按 <strong>升序</strong> 排列</li>
<li><code>newInterval.length == 2</code></li>
<li><code>0 &lt;= start &lt;= end &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0056：合并区间](/leetcode/0056)
- [0715：Range 模块](/leetcode/0715)
- [2276：统计区间中的整数数目（2222 分）](/leetcode/2276)


## 分析

二分查找与新区间重叠的下标范围，合并区间即可。

## 解答

```python
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        a,b = newInterval
        i = bisect_left(intervals, a, key=lambda x: x[1])
        j = bisect_right(intervals, b, key=lambda x: x[0])
        if i<j:
            a,b = min(a, intervals[i][0]), max(b, intervals[j-1][1])
        intervals[i:j] = [[a,b]]
        return intervals
```
35 ms
