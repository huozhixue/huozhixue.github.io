# 0149：直线上最多的点数（★★）


> <u>**[力扣第 149 题](https://leetcode.cn/problems/max-points-on-a-line/)**</u>

## 题目

<p>给你一个数组 <code>points</code> ，其中 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 表示 <strong>X-Y</strong> 平面上的一个点。求最多有多少个点在同一条直线上。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg" style="width: 300px; height: 294px;" />
<pre>
<strong>输入：</strong>points = [[1,1],[2,2],[3,3]]
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg" style="width: 300px; height: 294px;" />
<pre>
<strong>输入：</strong>points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
<strong>输出：</strong>4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= points.length <= 300</code></li>
<li><code>points[i].length == 2</code></li>
<li><code>-10<sup>4</sup> <= x<sub>i</sub>, y<sub>i</sub> <= 10<sup>4</sup></code></li>
<li><code>points</code> 中的所有点 <strong>互不相同</strong></li>
</ul>


## 分析

本题可能有重复点，因此不能按直线遍历，考虑按点来遍历：
- 对于点 i，首先统计重复个数 same
- 然后将其它点可以按斜率分组
- 最大的组大小加上 same 即可

考虑到精度问题，可以用最简分数来表示斜率，注意下不存在斜率的特殊情况即可。

## 解答

```python
def maxPoints(self, points: List[List[int]]) -> int:
    from fractions import Fraction
    res = 0
    for p in points:
        d, same = defaultdict(int), 0
        for q in points:
            if p==q:
                same += 1
            else:
                key = str(Fraction(q[1]-p[1], q[0]-p[0])) if q[0]!=p[0] else '1/0'
                d[key] += 1
        res = max(res, same+max(d.values(), default=0))
    return res
```
212 ms

