# 0963：最小面积矩形 II（1990 分）


> <u>**[力扣第 116 场周赛第 3 题](https://leetcode.cn/problems/minimum-area-rectangle-ii/)**</u>

## 题目

<p>给你一个 <strong>X-Y </strong>平面上的点数组 <code>points</code>，其中 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>。</p>

<p>返回由这些点形成的任意矩形的最小面积，矩形的边 <strong>不一定 </strong>平行于 X 轴和 Y 轴。如果不存在这样的矩形，则返回 <code>0</code>。</p>

<p>答案只需在<code>10<sup>-5</sup></code> 的误差范围内即可被视作正确答案。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/21/1a.png" style="width: 398px; height: 400px;" />
<pre>
<strong>输入：</strong> points = [[1,2],[2,1],[1,0],[0,1]]
<strong>输出：</strong> 2.00000
<strong>解释：</strong> 最小面积矩形由 [1,2]、[2,1]、[1,0]、[0,1] 组成，其面积为 2。
</pre>

<p><strong class="example">示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/22/2.png" style="width: 400px; height: 251px;" />
<pre>
<strong>输入：</strong> points = [[0,1],[2,1],[1,1],[1,0],[2,0]]
<strong>输出：</strong> 1.00000
<strong>解释：</strong> 最小面积矩形由 [1,0]、[1,1]、[2,1]、[2,0] 组成，其面积为 1。
</pre>

<p><strong class="example">示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/22/3.png" style="width: 383px; height: 400px;" />
<pre>
<strong>输入：</strong> points = [[0,3],[1,2],[3,1],[1,3],[2,1]]
<strong>输出：</strong> 0
<strong>解释：</strong> 无法由这些点组成任何矩形。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= points.length &lt;= 50</code></li>
<li><code>points[i].length == 2</code></li>
<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 4 * 10<sup>4</sup></code></li>
<li>所有给定的点都是 <strong>唯一 </strong>的。</li>
</ul>




## 分析

### #1

- 最简单的就是遍历三个点，判断形成的两条边是否垂直，并判断对应的第四个点是否存在
- 判断垂直可以用内积，计算面积可以用外积

```python []
def dot(u,v):    # u·v，点乘（内积）
    return u[0]*v[0]+u[1]*v[1]

def cross(u,v):  # u X v，叉乘（外积），逆正顺负
    return u[0]*v[1]-u[1]*v[0]

class Solution:
    def minAreaFreeRect(self, points: List[List[int]]) -> float:
        vis = {(x,y) for x,y in points}
        res = inf
        for p1, p2, p3 in permutations(points, 3):
            p4 = p2[0] + p3[0] - p1[0], p2[1] + p3[1] - p1[1]
            if p4 in vis:
                v1 = (p2[0] - p1[0], p2[1] - p1[1])
                v2 = (p3[0] - p1[0], p3[1] - p1[1])
                if dot(v1,v2)==0:
                    area = abs(cross(v1,v2))
                    if area < res:
                        res = area
        return res if res < inf else 0
```
687 ms

### #2

- 还可以按对角线分组，矩形的两条对角线满足：
	- 中点相同、长度相等
- 同一组内，夹角更小的两条对角线组成的矩形面积更小
- 因此组内极角排序，计算相邻对角线的外积即可
## 解答


```python []
def cross(u,v):  # u X v，叉乘（外积），逆正顺负
    return u[0]*v[1]-u[1]*v[0]

class Solution:
    def minAreaFreeRect(self, points: List[List[int]]) -> float:
        n = len(points)
        d = defaultdict(list)
        for i in range(n):
            for j in range(i+1,n):
                u,v = sorted([points[i],points[j]])
                mid = (u[0]+v[0],u[1]+v[1])
                p = [v[0]-u[0],v[1]-u[1]]
                r = p[0]**2+p[1]**2
                d[(mid,r)].append(p)
        res = inf
        for A in d.values():
            A.sort(key=lambda u: atan2(u[1],u[0]))
            if len(A)>1:
                for u,v in zip(A,A[1:]+A[:1]):
                    res = min(res,abs(cross(u,v)))
        return res/2 if res<inf else 0
```
54 ms
