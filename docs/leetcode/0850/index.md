# 0850：矩形面积 II（2235 分）


> <u>**[力扣第 88 场周赛第 4 题](https://leetcode.cn/problems/rectangle-area-ii/)**</u>

## 题目

<p>给你一个轴对齐的二维数组 <code>rectangles</code> 。 对于 <code>rectangle[i] = [x1, y1, x2, y2]</code>，其中（x1，y1）是矩形 <code>i</code> 左下角的坐标，<meta charset="UTF-8" /> <code>(x<sub>i1</sub>, y<sub>i1</sub>)</code> 是该矩形 <strong>左下角</strong> 的坐标，<meta charset="UTF-8" /> <code>(x<sub>i2</sub>, y<sub>i2</sub>)</code> 是该矩形 <strong>右上角</strong> 的坐标。</p>

<p>计算平面中所有 <code>rectangles</code> 所覆盖的 <strong>总面积 </strong>。任何被两个或多个矩形覆盖的区域应只计算 <strong>一次</strong> 。</p>

<p>返回<em> <strong>总面积</strong> </em>。因为答案可能太大，返回<meta charset="UTF-8" /> <code>10<sup>9</sup> + 7</code> 的 <strong>模</strong> 。</p>



<p><strong class="example">示例 1：</strong></p>

<p><img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/06/rectangle_area_ii_pic.png" style="height: 360px; width: 480px;" /></p>

<pre>
<strong>输入：</strong>rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
<strong>输出：</strong>6
<strong>解释：</strong>如图所示，三个矩形覆盖了总面积为 6 的区域。
从(1,1)到(2,2)，绿色矩形和红色矩形重叠。
从(1,0)到(2,3)，三个矩形都重叠。
</pre>

<p><strong class="example">示例 2：</strong></p>

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
</ul>




## 分析

### #1

- 类似 {{< lc "0218" >}}，不过遍历坐标 x 时，要维护的不是高度集合，而是区间集合
- 每一轮根据当前横坐标 x 、上一轮横坐标 pre，上一轮区间集合覆盖的长度 h，即可计算出 pre 到 x 的面积

```python
class Solution:
    def rectangleArea(self, rectangles: List[List[int]]) -> int:
        mod = 10**9+7
        d = defaultdict(list)
        for x1,y1,x2,y2 in rectangles:
            d[x1].append((1,y1,y2))
            d[x2].append((0,y1,y2))
        def cal(ct):
            res, r = 0, -inf
            for a,b in sorted(ct):
                res += max(0,b-max(a,r))
                r = max(r,b)
            return res
        res = 0
        ct, pre = defaultdict(int),0
        for x in sorted(d):
            res += (x-pre)*cal(ct)
            res %= mod
            for flag,y1,y2 in d[x]:
                if flag:
                    ct[(y1,y2)] += 1
                else:
                    ct[(y1,y2)] -= 1
                    if not ct[(y1,y2)]:
                        del ct[(y1,y2)]
            pre = x
        return res
```
时间复杂度 O(N^2)，15 ms


### #2

- 区间集合的情况可以用线段树维护
## 解答
