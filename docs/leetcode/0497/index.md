# 0497：非重叠矩形中的随机点（★）


> <u>**[力扣第 497 题](https://leetcode.cn/problems/random-point-in-non-overlapping-rectangles/)**</u>

## 题目

<p>给定一个由非重叠的轴对齐矩形的数组 <code>rects</code> ，其中 <code>rects[i] = [ai, bi, xi, yi]</code> 表示 <code>(ai, bi)</code> 是第 <code>i</code> 个矩形的左下角点，<code>(xi, yi)</code> 是第 <code>i</code> 个矩形的右上角点。设计一个算法来随机挑选一个被某一矩形覆盖的整数点。矩形周长上的点也算做是被矩形覆盖。所有满足要求的点必须等概率被返回。</p>

<p>在给定的矩形覆盖的空间内的任何整数点都有可能被返回。</p>

<p><strong>请注意 </strong>，整数点是具有整数坐标的点。</p>

<p>实现 <code>Solution</code> 类:</p>

<ul>
<li><code>Solution(int[][] rects)</code> 用给定的矩形数组 <code>rects</code> 初始化对象。</li>
<li><code>int[] pick()</code> 返回一个随机的整数点 <code>[u, v]</code> 在给定的矩形所覆盖的空间内。</li>
</ul>

<ol>
</ol>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/24/lc-pickrandomrec.jpg" style="height: 539px; width: 419px;" /></p>

<pre>
<strong>输入:
</strong>["Solution", "pick", "pick", "pick", "pick", "pick"]
[[[[-2, -2, 1, 1], [2, 2, 4, 6]]], [], [], [], [], []]
<strong>输出:
</strong>[null, [1, -2], [1, -1], [-1, -2], [-2, -2], [0, 0]]

<strong>解释：</strong>
Solution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);
solution.pick(); // 返回 [1, -2]
solution.pick(); // 返回 [1, -1]
solution.pick(); // 返回 [-1, -2]
solution.pick(); // 返回 [-2, -2]
solution.pick(); // 返回 [0, 0]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= rects.length &lt;= 100</code></li>
<li><code>rects[i].length == 4</code></li>
<li><code>-10<sup>9</sup> &lt;= a<sub>i</sub> &lt; x<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= b<sub>i</sub> &lt; y<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
<li><code>x<sub>i</sub> - a<sub>i</sub> &lt;= 2000</code></li>
<li><code>y<sub>i</sub> - b<sub>i</sub> &lt;= 2000</code></li>
<li>所有的矩形不重叠。</li>
<li><code>pick</code> 最多被调用 <code>10<sup>4</sup></code> 次。</li>
</ul>


## 分析
  
类似 {{< lc "0528" >}} ，不过变成了二维。矩阵内点的个数即是矩阵权重。

随机取到一个点后，先找出属于哪一个矩形，还可以得到在该矩形中排第几位，再按预定映射得到该矩形中的某一点。

## 解答

```python
class Solution:

    def __init__(self, rects: List[List[int]]):
        self.rects = rects
        self.pre = [0]+list(accumulate((x2-x1+1)*(y2-y1+1) for x1,y1,x2,y2 in rects))

    def pick(self) -> List[int]:
        k = randrange(self.pre[-1])
        pos = bisect_right(self.pre, k)-1
        x1, y1, x2, y2 = self.rects[pos]
        dx, dy = divmod(k-self.pre[pos],y2-y1+1)
        return [x1+dx, y1+dy]
```
92 ms
