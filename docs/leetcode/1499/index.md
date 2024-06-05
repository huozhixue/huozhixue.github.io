# 1499：满足不等式的最大值（2456 分）


> <u>**[力扣第 195 场周赛第 4 题](https://leetcode.cn/problems/max-value-of-equation/)**</u>

## 题目

<p>给你一个数组 <code>points</code> 和一个整数 <code>k</code> 。数组中每个元素都表示二维平面上的点的坐标，并按照横坐标 x 的值从小到大排序。也就是说 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> ，并且在 <code>1 &lt;= i &lt; j &lt;= points.length</code> 的前提下， <code>x<sub>i</sub> &lt; x<sub>j</sub></code> 总成立。</p>

<p>请你找出<em> </em><code>y<sub>i</sub> + y<sub>j</sub> + |x<sub>i</sub> - x<sub>j</sub>|</code> 的 <strong>最大值</strong>，其中 <code>|x<sub>i</sub> - x<sub>j</sub>| &lt;= k</code> 且 <code>1 &lt;= i &lt; j &lt;= points.length</code>。</p>

<p>题目测试数据保证至少存在一对能够满足 <code>|x<sub>i</sub> - x<sub>j</sub>| &lt;= k</code> 的点。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>points = [[1,3],[2,0],[5,10],[6,-10]], k = 1
<strong>输出：</strong>4
<strong>解释：</strong>前两个点满足 |x<sub>i</sub> - x<sub>j</sub>| &lt;= 1 ，代入方程计算，则得到值 3 + 0 + |1 - 2| = 4 。第三个和第四个点也满足条件，得到值 10 + -10 + |5 - 6| = 1 。
没有其他满足条件的点，所以返回 4 和 1 中最大的那个。</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>points = [[0,0],[3,0],[9,2]], k = 3
<strong>输出：</strong>3
<strong>解释：</strong>只有前两个点满足 |x<sub>i</sub> - x<sub>j</sub>| &lt;= 3 ，代入方程后得到值 0 + 0 + |0 - 3| = 3 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= points.length &lt;= 10^5</code></li>
<li><code>points[i].length == 2</code></li>
<li><code>-10^8 &lt;= points[i][0], points[i][1] &lt;= 10^8</code></li>
<li><code>0 &lt;= k &lt;= 2 * 10^8</code></li>
<li>对于所有的<code>1 &lt;= i &lt; j &lt;= points.length</code> ，<code>points[i][0] &lt; points[j][0]</code> 都成立。也就是说，<code>x<sub>i</sub></code> 是严格递增的。</li>
</ul>


## 分析

### #1

显然可以遍历 j，然后在满足 xj-k<=xi<xj 的 i 中，找最大的 yi-xi。

那么是典型的滑动窗口问题，而维护 yi-xi 的最大值则可以用有序集合。

```python
def findMaxValueOfEquation(self, points: List[List[int]], k: int) -> int:
    from sortedcontainers import SortedList
    sl = SortedList()
    res, i = float('-inf'), 0
    for j, (x, y) in enumerate(points):
        while points[i][0]<x-k:
            sl.remove(points[i][1]-points[i][0])
            i += 1
        if sl:
            res = max(res, sl[-1]+x+y)
        sl.add(y-x)
    return res
```
544 ms

### #2

还可以用单调队列维护窗口的最大值。

## 解答

```python
def findMaxValueOfEquation(self, points: List[List[int]], k: int) -> int:
    res, queue = float('-inf'), deque()
    for x, y in points:
        while queue and queue[0][0]<x-k:
            queue.popleft()
        if queue:
            res = max(res, queue[0][1]+x+y)
        while queue and queue[-1][1]<=y-x:
            queue.pop()
        queue.append((x, y-x))
    return res
```
236 ms

