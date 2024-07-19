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


**相似问题：**
- [0057：插入区间](/leetcode/0057)
- [0252：会议室](/leetcode/0252)
- [0253：会议室 II](/leetcode/0253)
- [0495：提莫攻击](/leetcode/0495)
- [0616：给字符串添加加粗标签](/leetcode/0616)
- [0715：Range 模块](/leetcode/0715)
- [0759：员工空闲时间（1710 分）](/leetcode/0759)
- [0763：划分字母区间（1443 分）](/leetcode/0763)
- [0986：区间列表的交集（1541 分）](/leetcode/0986)
- [2158：每天绘制新区域的数量](/leetcode/2158)
- [2213：由单个字符重复的最长子字符串（2628 分）](/leetcode/2213)
- [2276：统计区间中的整数数目（2222 分）](/leetcode/2276)
- [2406：将区间分为最少组数（1713 分）](/leetcode/2406)
- [2446：判断两个事件是否存在冲突（1322 分）](/leetcode/2446)
- [2580：统计将重叠区间合并成组的方案数（1631 分）](/leetcode/2580)
- [2848：与车相交的点（1229 分）](/leetcode/2848)
- [3169：无需开会的工作日（1483 分）](/leetcode/3169)


## 分析

排序后边遍历边维护即可。


## 解答

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        res = []
        for a,b in sorted(intervals):
            if not res or a>res[-1][1]:
                res.append([a,b])
            else:
                res[-1][1] = max(res[-1][1],b)
        return res
```
56 ms
