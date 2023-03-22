# 0391：完美矩形（★★）


> <u>**[力扣第 391 题](https://leetcode.cn/problems/perfect-rectangle/)**</u>

## 题目

<p>给你一个数组 <code>rectangles</code> ，其中 <code>rectangles[i] = [x<sub>i</sub>, y<sub>i</sub>, a<sub>i</sub>, b<sub>i</sub>]</code> 表示一个坐标轴平行的矩形。这个矩形的左下顶点是 <code>(x<sub>i</sub>, y<sub>i</sub>)</code> ，右上顶点是 <code>(a<sub>i</sub>, b<sub>i</sub>)</code> 。</p>

<p>如果所有矩形一起精确覆盖了某个矩形区域，则返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perectrec1-plane.jpg" style="height: 294px; width: 300px;" />
<pre>
<strong>输入：</strong>rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
<strong>输出：</strong>true
<strong>解释：</strong>5 个矩形一起可以精确地覆盖一个矩形区域。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perfectrec2-plane.jpg" style="height: 294px; width: 300px;" />
<pre>
<strong>输入：</strong>rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
<strong>输出：</strong>false
<strong>解释：</strong>两个矩形之间有间隔，无法覆盖成一个矩形。</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perfecrrec4-plane.jpg" style="height: 294px; width: 300px;" />
<pre>
<strong>输入：</strong>rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
<strong>输出：</strong>false
<strong>解释：</strong>因为中间有相交区域，虽然形成了矩形，但不是精确覆盖。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= rectangles.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>rectangles[i].length == 4</code></li>
<li><code>-10<sup>5</sup> &lt;= x<sub>i</sub>, y<sub>i</sub>, a<sub>i</sub>, b<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

精确覆盖即代表没有重叠、没有间隙。考虑根据轮廓线来判断，类似 {{< lc "0218" >}}

遍历所有边缘坐标 x，维护还没掠过的高度区间集合，如果该集合精确覆盖一个区间且一直不变，即说明是完美矩形。

> 在边缘 x 处（除了第一个和最后一个 x），只需要判断新增的区间集合和弹出的区间集合是否等价即可。
>不需要真的维护整个区间集合。

## 解答

```python
def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
    def merge(A):
        res = []
        for s, e in sorted(A):
            if not res or res[-1][1] < s:
                res.append([s, e])
            elif res[-1][1] == s:
                res[-1][1] = e
            else:
                return None
        return res

    d = defaultdict(list)
    for x1, y1, x2, y2 in rectangles:
        d[x1].append((y1, y2, 0))
        d[x2].append((y1, y2, 1))
    first, last = min(d), max(d)
    for x in d:
        A = merge((y1, y2) for y1, y2, flag in d[x] if flag == 0)
        B = merge((y1, y2) for y1, y2, flag in d[x] if flag == 1)
        if A is None or B is None:
            return False
        if x == first and len(A) != 1:
            return False
        if first < x < last and A != B:
            return False
    return True
```
时间复杂度 O(N*logN)，80 ms


