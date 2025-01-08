# 0630：课程表 III（★★）


> <u>**[力扣第 630 题](https://leetcode.cn/problems/course-schedule-iii/)**</u>

## 题目

<p>这里有 <code>n</code> 门不同的在线课程，按从 <code>1</code> 到 <code>n</code> 编号。给你一个数组 <code>courses</code> ，其中 <code>courses[i] = [duration<sub>i</sub>, lastDay<sub>i</sub>]</code> 表示第 <code>i</code> 门课将会 <strong>持续</strong> 上 <code>duration<sub>i</sub></code> 天课，并且必须在不晚于 <code>lastDay<sub>i</sub></code> 的时候完成。</p>

<p>你的学期从第 <code>1</code> 天开始。且不能同时修读两门及两门以上的课程。</p>

<p>返回你最多可以修读的课程数目。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>courses = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]
<strong>输出：</strong>3
<strong>解释：</strong>
这里一共有 4 门课程，但是你最多可以修 3 门：
首先，修第 1 门课，耗费 100 天，在第 100 天完成，在第 101 天开始下门课。
第二，修第 3 门课，耗费 1000 天，在第 1100 天完成，在第 1101 天开始下门课程。
第三，修第 2 门课，耗时 200 天，在第 1300 天完成。
第 4 门课现在不能修，因为将会在第 3300 天完成它，这已经超出了关闭日期。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>courses = [[1,2]]
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>courses = [[3,2],[4,3]]
<strong>输出：</strong>0
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= courses.length &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= duration<sub>i</sub>, lastDay<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0207：课程表](/leetcode/0207)
- [0210：课程表 II](/leetcode/0210)
- [2050：并行课程 III（2084 分）](/leetcode/2050)


## 分析

- 经典的反悔贪心问题，反悔贪心本质上是递推了某种元素的有序集合，如堆
- 将课程按 lastDay 排序，令 f[i] 代表前 i 个课程的最优集合
	- 这里的最优定义为：数量最多，数量相同时总时间最小
- 遍历到课程 i 时
	- 假如 f[i-1] 的总时间+课程 i 的时间<=lastDay[i]，显然将课程 i 加入到 f[i-1] 中即得 f[i]
	- 否则，最优集合的数量不变，考虑让总时间最小，只要 duration[i] 小于 f[i-1] 集合中最大的课程时间， 将其替换为课程 i，即得到最优集合 f[i]
- 这个递推过程中，维护最优集合需要进行添加值、查询和删除最大值的操作，用堆即可

## 解答


```python
class Solution:
    def scheduleCourse(self, courses: List[List[int]]) -> int:
        pq, t = [], 0
        for w,e in sorted(courses,key=lambda p:p[1]):
            if t+w<=e:
                t += w
                heappush(pq,-w)
            elif pq and w<-pq[0]:
                t += heappop(pq)+w
                heappush(pq,-w)
        return len(pq)
```
39 ms
