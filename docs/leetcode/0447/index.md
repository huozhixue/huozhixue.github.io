# 0447：回旋镖的数量（★）


> <u>**[力扣第 447 题](https://leetcode.cn/problems/number-of-boomerangs/)**</u>

## 题目

<p>给定平面上<em> </em><code>n</code><em> </em>对 <strong>互不相同</strong> 的点 <code>points</code> ，其中 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 。<strong>回旋镖</strong> 是由点 <code>(i, j, k)</code> 表示的元组 ，其中 <code>i</code> 和 <code>j</code> 之间的欧式距离和 <code>i</code> 和 <code>k</code> 之间的欧式距离相等（<strong>需要考虑元组的顺序</strong>）。</p>

<p>返回平面上所有回旋镖的数量。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>points = [[0,0],[1,0],[2,0]]
<strong>输出：</strong>2
<strong>解释：</strong>两个回旋镖为 <strong>[[1,0],[0,0],[2,0]]</strong> 和 <strong>[[1,0],[2,0],[0,0]]</strong>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>points = [[1,1],[2,2],[3,3]]
<strong>输出：</strong>2
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>points = [[1,1]]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == points.length</code></li>
<li><code>1 &lt;= n &lt;= 500</code></li>
<li><code>points[i].length == 2</code></li>
<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
<li>所有点都 <strong>互不相同</strong></li>
</ul>


## 分析

- n 个点各不相同，因此遍历每个点作为中心，进行计数
- 统计其它点的距离，任选两个距离相同的即满足要求
## 解答

```python
class Solution:
    def numberOfBoomerangs(self, points: List[List[int]]) -> int:
        res = 0
        for x in points:
            ct = Counter(dist(x,y) for y in points)
            res += sum(v*(v-1) for v in ct.values())
        return res
```
408 ms


