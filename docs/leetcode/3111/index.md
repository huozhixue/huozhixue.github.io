# 3111：覆盖所有点的最少矩形数目（1401 分）


> <u>**[力扣第 128 场双周赛第 2 题](https://leetcode.cn/problems/minimum-rectangles-to-cover-points/)**</u>

## 题目

<p>给你一个二维整数数组 <code>point</code> ，其中 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 表示二维平面内的一个点。同时给你一个整数 <code>w</code> 。你需要用矩形 <strong>覆盖所有</strong> 点。</p>

<p>每个矩形的左下角在某个点 <code>(x<sub>1</sub>, 0)</code> 处，且右上角在某个点 <code>(x<sub>2</sub>, y<sub>2</sub>)</code> 处，其中 <code>x<sub>1</sub> &lt;= x<sub>2</sub></code> 且 <code>y<sub>2</sub> &gt;= 0</code> ，同时对于每个矩形都 <strong>必须</strong> 满足 <code>x<sub>2</sub> - x<sub>1</sub> &lt;= w</code> 。</p>

<p>如果一个点在矩形内或者在边上，我们说这个点被矩形覆盖了。</p>

<p>请你在确保每个点都 <strong>至少</strong> 被一个矩形覆盖的前提下，<strong>最少</strong> 需要多少个矩形。</p>

<p><strong>注意：</strong>一个点可以被多个矩形覆盖。</p>



<p><strong class="example">示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/03/04/screenshot-from-2024-03-04-20-33-05.png" style="width: 205px; height: 300px;" /></p>

<div class="example-block" style="border-color: var(--border-tertiary); border-left-width: 2px; color: var(--text-secondary); margin-bottom: 1rem; margin-top: 1rem; overflow: visible; padding-left: 1rem;">
<p style=""><span class="example-io" style="font-size: 8.75px;"><b>输入：</b></span><span class="example-io" style="font-size: 0.85rem; font-family: Menlo, sans-serif;">points = [[2,1],[1,0],[1,4],[1,8],[3,5],[4,6]], w = 1</span></p>

<p style=""><span class="example-io" style="font-size: 8.75px;"><b>输出：</b></span><span class="example-io" style="font-size: 0.85rem; font-family: Menlo, sans-serif;">2</span></p>

<p style="font-size: 0.875rem;"><strong>解释：</strong></p>

<p style="font-size: 0.875rem;">上图展示了一种可行的矩形放置方案：</p>

<ul style="font-size: 0.875rem;">
<li>一个矩形的左下角在 <code>(1, 0)</code> ，右上角在 <code>(2, 8)</code> 。</li>
<li>一个矩形的左下角在 <code>(3, 0)</code> ，右上角在 <code>(4, 8)</code> 。</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/03/04/screenshot-from-2024-03-04-18-59-12.png" style="width: 260px; height: 250px;" /></p>

<div class="example-block" style="border-color: var(--border-tertiary); border-left-width: 2px; color: var(--text-secondary); margin-bottom: 1rem; margin-top: 1rem; overflow: visible; padding-left: 1rem;">
<p style=""><span class="example-io" style="font-size: 8.75px;"><b>输入：</b></span><span class="example-io" style="font-size: 0.85rem; font-family: Menlo, sans-serif;">points = [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]], w = 2</span></p>

<p style=""><span class="example-io" style="font-size: 8.75px;"><b>输出：</b></span><span class="example-io" style="font-size: 0.85rem; font-family: Menlo, sans-serif;">3</span></p>

<p style="font-size: 0.875rem;"><b>解释：</b></p>

<p style="font-size: 0.875rem;">上图展示了一种可行的矩形放置方案：</p>

<ul style="font-size: 0.875rem;">
<li>一个矩形的左下角在 <code>(0, 0)</code> ，右上角在 <code>(2, 2)</code> 。</li>
<li>一个矩形的左下角在 <code>(3, 0)</code> ，右上角在 <code>(5, 5)</code> 。</li>
<li>一个矩形的左下角在 <code>(6, 0)</code> ，右上角在 <code>(6, 6)</code> 。</li>
</ul>
</div>

<p><strong class="example">示例 3：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/03/04/screenshot-from-2024-03-04-20-24-03.png" style="height: 150px; width: 127px;" /></p>

<div class="example-block" style="border-color: var(--border-tertiary); border-left-width: 2px; color: var(--text-secondary); margin-bottom: 1rem; margin-top: 1rem; overflow: visible; padding-left: 1rem;">
<p style=""><span class="example-io" style="font-size: 8.75px;"><b>输入：</b></span><span class="example-io" style="font-size: 0.85rem; font-family: Menlo, sans-serif;">points = [[2,3],[1,2]], w = 0</span></p>

<p style=""><span class="example-io" style="font-size: 8.75px;"><b>输出：</b></span><span class="example-io" style="font-size: 0.85rem; font-family: Menlo, sans-serif;">2</span></p>

<p style="font-size: 0.875rem;"><strong>解释：</strong></p>

<p style="font-size: 0.875rem;">上图展示了一种可行的矩形放置方案：</p>

<ul style="font-size: 0.875rem;">
<li>一个矩形的左下角在 <code>(1, 0)</code> ，右上角在 <code>(1, 2)</code> 。</li>
<li>一个矩形的左下角在 <code>(2, 0)</code> ，右上角在 <code>(2, 3)</code> 。</li>
</ul>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= points.length &lt;= 10<sup>5</sup></code></li>
<li><code>points[i].length == 2</code></li>
<li><code>0 &lt;= x<sub>i</sub> == points[i][0] &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= y<sub>i</sub> == points[i][1] &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= w &lt;= 10<sup>9</sup></code></li>
<li>所有点坐标 <code>(x<sub>i</sub>, y<sub>i</sub>)</code> 互不相同。</li>
</ul>


**相似问题：**
- [0939：最小面积矩形（1752 分）](/leetcode/0939)
- [0973：最接近原点的 K 个点（1213 分）](/leetcode/0973)


## 分析

- 矩形高度没有限制，因此只需要考虑 x 坐标
- 贪心遍历即可

## 解答


```python
class Solution:
    def minRectanglesToCoverPoints(self, points: List[List[int]], w: int) -> int:
        res,x = 0,-inf
        for y,_ in sorted(points):
            if y>x+w:
                res += 1
                x = y
        return res
```
111 ms
