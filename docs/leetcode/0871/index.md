# 0871：最低加油次数（2074 分）


> <u>**[力扣第 93 场周赛第 4 题](https://leetcode.cn/problems/minimum-number-of-refueling-stops/)**</u>

## 题目

<p>汽车从起点出发驶向目的地，该目的地位于出发位置东面 <code>target</code> 英里处。</p>

<p>沿途有加油站，用数组 <code>stations</code> 表示。其中 <code>stations[i] = [position<sub>i</sub>, fuel<sub>i</sub>]</code> 表示第 <code>i</code> 个加油站位于出发位置东面 <code>position<sub>i</sub></code> 英里处，并且有 <code>fuel<sub>i</sub></code> 升汽油。</p>

<p>假设汽车油箱的容量是无限的，其中最初有 <code>startFuel</code> 升燃料。它每行驶 1 英里就会用掉 1 升汽油。当汽车到达加油站时，它可能停下来加油，将所有汽油从加油站转移到汽车中。</p>

<p>为了到达目的地，汽车所必要的最低加油次数是多少？如果无法到达目的地，则返回 <code>-1</code> 。</p>

<p>注意：如果汽车到达加油站时剩余燃料为 <code>0</code>，它仍然可以在那里加油。如果汽车到达目的地时剩余燃料为 <code>0</code>，仍然认为它已经到达目的地。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>target = 1, startFuel = 1, stations = []
<strong>输出：</strong>0
<strong>解释：</strong>可以在不加油的情况下到达目的地。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>target = 100, startFuel = 1, stations = [[10,100]]
<strong>输出：</strong>-1
<strong>解释：</strong>无法抵达目的地，甚至无法到达第一个加油站。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
<strong>输出：</strong>2
<strong>解释：</strong>
出发时有 10 升燃料。
开车来到距起点 10 英里处的加油站，消耗 10 升燃料。将汽油从 0 升加到 60 升。
然后，从 10 英里处的加油站开到 60 英里处的加油站（消耗 50 升燃料），
并将汽油从 10 升加到 50 升。然后开车抵达目的地。
沿途在两个加油站停靠，所以返回 2 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= target, startFuel &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= stations.length &lt;= 500</code></li>
<li><code>1 &lt;= position<sub>i</sub> &lt; position<sub>i+1</sub> &lt; target</code></li>
<li><code>1 &lt;= fuel<sub>i</sub> &lt; 10<sup>9</sup></code></li>
</ul>




## 分析

- 典型的贪心
- 每轮在能用的加油站中选汽油最多的，更新能到达的位置即可

## 解答

```python
class Solution:
    def minRefuelStops(self, target: int, startFuel: int, stations: List[List[int]]) -> int:
        s = startFuel
        A,pq = stations[::-1],[]
        res = 0
        while s<target:
            while A and A[-1][0]<=s:
                heappush(pq,-A.pop()[1])
            if not pq:
                return -1
            s -= heappop(pq)
            res += 1
        return res
```
50 ms

