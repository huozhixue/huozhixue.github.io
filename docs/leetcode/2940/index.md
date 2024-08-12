# 2940：找到 Alice 和 Bob 可以相遇的建筑（2327 分）


> <u>**[力扣第 372 场周赛第 4 题](https://leetcode.cn/problems/find-building-where-alice-and-bob-can-meet/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的正整数数组 <code>heights</code> ，其中 <code>heights[i]</code> 表示第 <code>i</code> 栋建筑的高度。</p>

<p>如果一个人在建筑 <code>i</code> ，且存在 <code>i &lt; j</code> 的建筑 <code>j</code> 满足 <code>heights[i] &lt; heights[j]</code> ，那么这个人可以移动到建筑 <code>j</code> 。</p>

<p>给你另外一个数组 <code>queries</code> ，其中 <code>queries[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> 。第 <code>i</code> 个查询中，Alice 在建筑 <code>a<sub>i</sub></code> ，Bob 在建筑 <code>b<sub>i</sub></code><sub> </sub>。</p>

<p>请你能返回一个数组 <code>ans</code> ，其中 <code>ans[i]</code> 是第 <code>i</code> 个查询中，Alice 和 Bob 可以相遇的 <strong>最左边的建筑</strong> 。如果对于查询 <code>i</code> ，Alice<em> </em>和<em> </em>Bob 不能相遇，令 <code>ans[i]</code> 为 <code>-1</code> 。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
<b>输出：</b>[2,5,-1,5,2]
<b>解释：</b>第一个查询中，Alice 和 Bob 可以移动到建筑 2 ，因为 heights[0] &lt; heights[2] 且 heights[1] &lt; heights[2] 。
第二个查询中，Alice 和 Bob 可以移动到建筑 5 ，因为 heights[0] &lt; heights[5] 且 heights[3] &lt; heights[5] 。
第三个查询中，Alice 无法与 Bob 相遇，因为 Alice 不能移动到任何其他建筑。
第四个查询中，Alice 和 Bob 可以移动到建筑 5 ，因为 heights[3] &lt; heights[5] 且 heights[4] &lt; heights[5] 。
第五个查询中，Alice 和 Bob 已经在同一栋建筑中。
对于 ans[i] != -1 ，ans[i] 是 Alice 和 Bob 可以相遇的建筑中最左边建筑的下标。
对于 ans[i] == -1 ，不存在 Alice 和 Bob 可以相遇的建筑。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<b>输入：</b>heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
<b>输出：</b>[7,6,-1,4,6]
<strong>解释：</strong>第一个查询中，Alice 可以直接移动到 Bob 的建筑，因为 heights[0] &lt; heights[7] 。
第二个查询中，Alice 和 Bob 可以移动到建筑 6 ，因为 heights[3] &lt; heights[6] 且 heights[5] &lt; heights[6] 。
第三个查询中，Alice 无法与 Bob 相遇，因为 Bob 不能移动到任何其他建筑。
第四个查询中，Alice 和 Bob 可以移动到建筑 4 ，因为 heights[3] &lt; heights[4] 且 heights[0] &lt; heights[4] 。
第五个查询中，Alice 可以直接移动到 Bob 的建筑，因为 heights[1] &lt; heights[6] 。
对于 ans[i] != -1 ，ans[i] 是 Alice 和 Bob 可以相遇的建筑中最左边建筑的下标。
对于 ans[i] == -1 ，不存在 Alice 和 Bob 可以相遇的建筑。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= heights.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= heights[i] &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= queries.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>queries[i] = [a<sub>i</sub>, b<sub>i</sub>]</code></li>
<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= heights.length - 1</code></li>
</ul>


**相似问题：**
- [1944：队列中可以看到的人数（2104 分）](/leetcode/1944)
- [1642：可以到达的最远建筑（1962 分）](/leetcode/1642)


## 分析

- 对于查询 [a,b]，假如 a=b，返回 a/b 即可
- 否则，不妨设 a<b，假如 heights[a]<heights[b]，返回 b 即可
- 否则，要在 heights[b+1:] 中找第一个大于 heights[a] 的数
	- 可以将所有查询按 b 排序，遍历 heights 并回答已加入的查询
	- 显然已加入的查询应该按 heights[a] 排序，先回答最小的
	- 用最小堆维护即可

## 解答


```python
class Solution:
    def leftmostBuildingQueries(self, heights: List[int], queries: List[List[int]]) -> List[int]:
        res = [-1]*len(queries)
        d = defaultdict(list)
        for i,(a,b) in enumerate(queries):
            a,b = sorted([a,b])
            if a==b or heights[a]<heights[b]:
                res[i] = b
            else:
                d[b].append((heights[a],i))
        pq = []
        for j,x in enumerate(heights):
            while pq and pq[0][0]<x:
                res[heappop(pq)[1]] = j
            for h,i in d[j]:
                heappush(pq,(h,i))
        return res
```
432 ms
