# 0850：矩形面积 II（★★）


> <u>**[力扣第 88 场周赛第 4 题](https://leetcode.cn/problems/rectangle-area-ii/)**</u>

## 题目

<p>我们给出了一个（轴对齐的）二维矩形列表 <code>rectangles</code> 。 对于 <code>rectangle[i] = [x<sub>i1</sub>, y<sub>i1</sub>, x<sub>i2</sub>, y<sub>i2</sub>]</code>，表示第 <code>i</code> 个矩形的坐标，<meta charset="UTF-8" /> <code>(x<sub>i1</sub>, y<sub>i1</sub>)</code> 是该矩形 <strong>左下角</strong> 的坐标，<meta charset="UTF-8" /> <code>(x<sub>i2</sub>, y<sub>i2</sub>)</code> 是该矩形 <strong>右上角</strong> 的坐标。</p>

<p>计算平面中所有 <code>rectangles</code> 所覆盖的 <strong>总面积 </strong>。任何被两个或多个矩形覆盖的区域应只计算 <strong>一次</strong> 。</p>

<p>返回<em> <strong>总面积</strong> </em>。因为答案可能太大，返回<meta charset="UTF-8" /> <code>10<sup>9</sup> + 7</code> 的 <strong>模</strong> 。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/06/rectangle_area_ii_pic.png" style="height: 300px; width: 400px;" /></p>

<pre>
<strong>输入：</strong>rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
<strong>输出：</strong>6
<strong>解释：</strong>如图所示，三个矩形覆盖了总面积为6的区域。
从(1,1)到(2,2)，绿色矩形和红色矩形重叠。
从(1,0)到(2,3)，三个矩形都重叠。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>rectangles = [[0,0,1000000000,1000000000]]
<strong>输出：</strong>49
<strong>解释：</strong>答案是 10<sup>18</sup> 对 (10<sup>9</sup> + 7) 取模的结果， 即 49 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= rectangles.length &lt;= 200</code></li>
<li><code>rectanges[i].length = 4</code><meta charset="UTF-8" /></li>
<li><code>0 &lt;= x<sub>i1</sub>, y<sub>i1</sub>, x<sub>i2</sub>, y<sub>i2</sub> &lt;= 10<sup>9</sup></code></li>
<li>矩形叠加覆盖后的总面积不会超越 <code>2^63 - 1</code> ，这意味着可以用一个 64 位有符号整数来保存面积结果。</li>
</ul>


## 分析

有点类似 {{< lc "0218" >}}，不过遍历坐标 x 时，要维护的不是高度集合，而是区间集合。

每一轮根据当前横坐标 cur_x 、上一轮横坐标 prev_x，上一轮区间集合覆盖的长度 prev_h，
即可计算出 cur_x 和 prev_x 之间覆盖的面积。然后更新 prev_x 和 prev_h 即可。

## 解答

```python
def rectangleArea(self, rectangles: List[List[int]]) -> int:
    def cal(A):
        res, end = 0, 0
        for s, e in A:
            res += max(end, e) - max(s, end)
            end = max(end, e)
        return res

    from sortedcontainers import SortedList
    d = defaultdict(list)
    for x1, y1, x2, y2 in rectangles:
        d[x1].append((y1, y2, 1))
        d[x2].append((y1, y2, 0))
    res, mod = 0, 10**9+7
    H, prev_x, prev_h = SortedList(), 0, 0
    for x in sorted(d):
        res = (res+(x-prev_x)*prev_h)%mod
        for y1, y2, flag in d[x]:
            if flag:
                H.add((y1, y2))
            else:
                H.remove((y1, y2))
        prev_x, prev_h = x, cal(H)
    return res
```
时间复杂度 O(N^2)，52 ms

