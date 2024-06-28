# 0452：用最少数量的箭引爆气球（★）


> <u>**[力扣第 452 题](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)**</u>

## 题目

<p>有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 <code>points</code> ，其中<code>points[i] = [x<sub>start</sub>, x<sub>end</sub>]</code> 表示水平直径在 <code>x<sub>start</sub></code> 和 <code>x<sub>end</sub></code>之间的气球。你不知道气球的确切 y 坐标。</p>

<p>一支弓箭可以沿着 x 轴从不同点 <strong>完全垂直</strong> 地射出。在坐标 <code>x</code> 处射出一支箭，若有一个气球的直径的开始和结束坐标为 <code>x</code><sub><code>start</code>，</sub><code>x</code><sub><code>end</code>，</sub> 且满足  <code>x<sub>start</sub> ≤ x ≤ x</code><sub><code>end</code>，</sub>则该气球会被 <strong>引爆</strong> <sub>。</sub>可以射出的弓箭的数量 <strong>没有限制</strong> 。 弓箭一旦被射出之后，可以无限地前进。</p>

<p>给你一个数组 <code>points</code> ，<em>返回引爆所有气球所必须射出的 <strong>最小</strong> 弓箭数 </em>。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>points = [[10,16],[2,8],[1,6],[7,12]]
<strong>输出：</strong>2
<strong>解释：</strong>气球可以用2支箭来爆破:
-在x = 6处射出箭，击破气球[2,8]和[1,6]。
-在x = 11处发射箭，击破气球[10,16]和[7,12]。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>points = [[1,2],[3,4],[5,6],[7,8]]
<strong>输出：</strong>4
<strong>解释：</strong>每个气球需要射出一支箭，总共需要4支箭。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>points = [[1,2],[2,3],[3,4],[4,5]]
<strong>输出：</strong>2
解释：气球可以用2支箭来爆破:
- 在x = 2处发射箭，击破气球[1,2]和[2,3]。
- 在x = 4处射出箭，击破气球[3,4]和[4,5]。</pre>



<p><meta charset="UTF-8" /></p>

<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= points.length &lt;= 10<sup>5</sup></code></li>
<li><code>points[i].length == 2</code></li>
<li><code>-2<sup>31</sup> &lt;= x<sub>start</sub> &lt; x<sub>end</sub> &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

- 假设某支箭穿过的气球集合是 A，那么将箭移动到 A 中最小的右端点，依然能穿过这些气球
- 因此，必然存在一种最优选择是某些气球右端点的集合，接下来找到这种选择
	- 将气球按右端点排序，第一个气球的右端点必然要选
	- 接着跳过重合的气球，选剩下的第一个气球的右端点，依此类推即可
- 当然，也必然存在一种最优选择是某些气球左端点的集合，所以也可以按左端点排序再选择

## 解答


```python
class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        res,r = 0,-inf
        for a,b in sorted(points,key=lambda p:p[1]):
            if a>r:
                r = b
                res += 1
        return res
```
165 ms


