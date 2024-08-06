# 3143：正方形中的最多点数（1696 分）


> <u>**[力扣第 130 场双周赛第 2 题](https://leetcode.cn/problems/maximum-points-inside-the-square/)**</u>

## 题目

<p>给你一个二维数组 <code>points</code> 和一个字符串 <code>s</code> ，其中 <code>points[i]</code> 表示第 <code>i</code> 个点的坐标，<code>s[i]</code> 表示第 <code>i</code> 个点的 <strong>标签</strong> 。</p>

<p>如果一个正方形的中心在 <code>(0, 0)</code> ，所有边都平行于坐标轴，且正方形内 <strong>不</strong> 存在标签相同的两个点，那么我们称这个正方形是 <strong>合法</strong> 的。</p>

<p>请你返回 <strong>合法</strong> 正方形中可以包含的 <strong>最多</strong> 点数。</p>

<p><strong>注意：</strong></p>

<ul>
<li>如果一个点位于正方形的边上或者在边以内，则认为该点位于正方形内。</li>
<li>正方形的边长可以为零。</li>
</ul>



<p><strong class="example">示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/03/29/3708-tc1.png" style="width: 303px; height: 303px;" /></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>points = [[2,2],[-1,-2],[-4,4],[-3,1],[3,-3]], s = "abdca"</span></p>

<p><span class="example-io"><b>输出：</b>2</span></p>

<p><strong>解释：</strong></p>

<p>边长为 4 的正方形包含两个点 <code>points[0]</code> 和 <code>points[1]</code> 。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/03/29/3708-tc2.png" style="width: 302px; height: 302px;" /></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>points = [[1,1],[-2,-2],[-2,2]], s = "abb"</span></p>

<p><span class="example-io"><b>输出：</b>1</span></p>

<p><strong>解释：</strong></p>

<p>边长为 2 的正方形包含 1 个点 <code>points[0]</code> 。</p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>points = [[1,1],[-1,-1],[2,-2]], s = "ccd"</span></p>

<p><span class="example-io"><b>输出：</b>0</span></p>

<p><strong>解释：</strong></p>

<p>任何正方形都无法只包含 <code>points[0]</code> 和 <code>points[1]</code> 中的一个点，所以合法正方形中都不包含任何点。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length, points.length &lt;= 10<sup>5</sup></code></li>
<li><code>points[i].length == 2</code></li>
<li><code>-10<sup>9</sup> &lt;= points[i][0], points[i][1] &lt;= 10<sup>9</sup></code></li>
<li><code>s.length == points.length</code></li>
<li><code>points</code> 中的点坐标互不相同。</li>
<li><code>s</code> 只包含小写英文字母。</li>
</ul>




## 分析
 
### #1

- 可以将点按所处的圈排序
- 从小到大遍历边长，出现重复标签返回即可

```python
class Solution:
    def maxPointsInsideSquare(self, points: List[List[int]], s: str) -> int:
        d = defaultdict(list)
        for (x,y),c in zip(points,s):
            d[max(abs(x),abs(y))].append(c)
        vis = set()
        res = 0
        for x in sorted(d):
            for c in d[x]:
                if c in vis:
                    return res
                vis.add(c)
            res += len(d[x])
        return res
```
159 ms
### #2

- 还可以维护每个标签的最小边长和次小边长
- 取 mi 为所有次小边长的最小值，统计有多少个最小边长小于 mi 即可

## 解答


```python
class Solution:
    def maxPointsInsideSquare(self, points: List[List[int]], s: str) -> int:
        d = defaultdict(lambda: inf)
        mi = inf
        for (x, y), c in zip(points, s):
            a = max(abs(x), abs(y))
            mi = min(mi,max(a,d[c]))
            d[c] = min(d[c],a)
        return sum(a<mi for a in d.values())
```
174 ms
