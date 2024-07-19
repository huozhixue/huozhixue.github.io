# 1851：包含每个查询的最小区间（2286 分）


> <u>**[力扣第 239 场周赛第 4 题](https://leetcode.cn/problems/minimum-interval-to-include-each-query/)**</u>

## 题目

<p>给你一个二维整数数组 <code>intervals</code> ，其中 <code>intervals[i] = [left<sub>i</sub>, right<sub>i</sub>]</code> 表示第 <code>i</code> 个区间开始于 <code>left<sub>i</sub></code> 、结束于 <code>right<sub>i</sub></code>（包含两侧取值，<strong>闭区间</strong>）。区间的 <strong>长度</strong> 定义为区间中包含的整数数目，更正式地表达是 <code>right<sub>i</sub> - left<sub>i</sub> + 1</code> 。</p>

<p>再给你一个整数数组 <code>queries</code> 。第 <code>j</code> 个查询的答案是满足 <code>left<sub>i</sub> &lt;= queries[j] &lt;= right<sub>i</sub></code> 的 <strong>长度最小区间 <code>i</code> 的长度</strong> 。如果不存在这样的区间，那么答案是 <code>-1</code> 。</p>

<p>以数组形式返回对应查询的所有答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
<strong>输出：</strong>[3,3,1,4]
<strong>解释：</strong>查询处理如下：
- Query = 2 ：区间 [2,4] 是包含 2 的最小区间，答案为 4 - 2 + 1 = 3 。
- Query = 3 ：区间 [2,4] 是包含 3 的最小区间，答案为 4 - 2 + 1 = 3 。
- Query = 4 ：区间 [4,4] 是包含 4 的最小区间，答案为 4 - 4 + 1 = 1 。
- Query = 5 ：区间 [3,6] 是包含 5 的最小区间，答案为 6 - 3 + 1 = 4 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
<strong>输出：</strong>[2,-1,4,6]
<strong>解释：</strong>查询处理如下：
- Query = 2 ：区间 [2,3] 是包含 2 的最小区间，答案为 3 - 2 + 1 = 2 。
- Query = 19：不存在包含 19 的区间，答案为 -1 。
- Query = 5 ：区间 [2,5] 是包含 5 的最小区间，答案为 5 - 2 + 1 = 4 。
- Query = 22：区间 [20,25] 是包含 22 的最小区间，答案为 25 - 20 + 1 = 6 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= intervals.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
<li><code>intervals[i].length == 2</code></li>
<li><code>1 &lt;= left<sub>i</sub> &lt;= right<sub>i</sub> &lt;= 10<sup>7</sup></code></li>
<li><code>1 &lt;= queries[j] &lt;= 10<sup>7</sup></code></li>
</ul>


**相似问题：**
- [2251：花期内花的数目（2022 分）](/leetcode/2251)


## 分析

有点类似 {{< lc "0218" >}}，不过查询的不一定是边界，可能在区间中间。

考虑将查询也添加到边缘坐标中，然后遍历所有边缘坐标，维护区间长度集合 H，min(H) 即为查询答案。

> 注意到查询是满足闭区间即可，因此遍历到边缘坐标 x 时，要先将以 x 开始的区间添加到 H 中，
>然后完成查询操作，最后将以 x 结束的区间移出 H。可以通过标记排序来实现。

## 解答

```python
def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
    from sortedcontainers import SortedList
    d = defaultdict(list)
    for a, b in intervals:
        h = b-a+1
        d[a].append((0, h))
        d[b].append((2, h))
    for idx, q in enumerate(queries):
        d[q].append((1, idx))
    res, H = [-1] * len(queries), SortedList()
    for x in sorted(d):
        for flag, val in sorted(d[x]):
            if flag==1:
                res[val] = H[0] if H else -1
            elif flag==0:
                H.add(val)
            else:
                H.remove(val)
    return res
```
1440 ms

