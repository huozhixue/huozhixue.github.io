# 0436：寻找右区间（★）


> <u>**[力扣第 436 题](https://leetcode.cn/problems/find-right-interval/)**</u>

## 题目

<p>给你一个区间数组 <code>intervals</code> ，其中 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> ，且每个 <code>start<sub>i</sub></code> 都 <strong>不同</strong> 。</p>

<p>区间 <code>i</code> 的 <strong>右侧区间</strong> 可以记作区间 <code>j</code> ，并满足 <code>start<sub>j</sub></code><code> &gt;= end<sub>i</sub></code> ，且 <code>start<sub>j</sub></code> <strong>最小化 </strong>。注意 <code>i</code> 可能等于 <code>j</code> 。</p>

<p>返回一个由每个区间 <code>i</code> 的 <strong>右侧区间</strong> 在 <code>intervals</code> 中对应下标组成的数组。如果某个区间 <code>i</code> 不存在对应的 <strong>右侧区间</strong> ，则下标 <code>i</code> 处的值设为 <code>-1</code> 。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,2]]
<strong>输出：</strong>[-1]
<strong>解释：</strong>集合中只有一个区间，所以输出-1。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[3,4],[2,3],[1,2]]
<strong>输出：</strong>[-1,0,1]
<strong>解释：</strong>对于 [3,4] ，没有满足条件的“右侧”区间。
对于 [2,3] ，区间[3,4]具有最小的“右”起点;
对于 [1,2] ，区间[2,3]具有最小的“右”起点。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,4],[2,3],[3,4]]
<strong>输出：</strong>[-1,2,-1]
<strong>解释：</strong>对于区间 [1,4] 和 [3,4] ，没有满足条件的“右侧”区间。
对于 [2,3] ，区间 [3,4] 有最小的“右”起点。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= intervals.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>intervals[i].length == 2</code></li>
<li><code>-10<sup>6</sup> &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>6</sup></code></li>
<li>每个间隔的起点都 <strong>不相同</strong></li>
</ul>


**相似问题：**
- [0352：将数据流变为多个不相交区间](/leetcode/0352)


## 分析

排序+二分查找即可。

## 解答

```python
class Solution:
    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:
        A = sorted((s,i) for i,(s,e) in enumerate(intervals))
        res = []
        for _,e in intervals:
            pos = bisect_left(A,(e,))
            res.append(A[pos][1] if pos<len(A) else -1)
        return res
```
60 ms

