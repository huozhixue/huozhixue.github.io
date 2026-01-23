# 3453：分割正方形 I（1735 分）


> <u>**[力扣第 150 场双周赛第 2 题](https://leetcode.cn/problems/separate-squares-i/)**</u>

## 题目

<p>给你一个二维整数数组 <code>squares</code> ，其中 <code>squares[i] = [x<sub>i</sub>, y<sub>i</sub>, l<sub>i</sub>]</code> 表示一个与 x 轴平行的正方形的左下角坐标和正方形的边长。</p>

<p>找到一个<strong>最小的</strong> y 坐标，它对应一条水平线，该线需要满足它以上正方形的总面积 <strong>等于</strong> 该线以下正方形的总面积。</p>

<p>答案如果与实际答案的误差在 <code>10<sup>-5</sup></code> 以内，将视为正确答案。</p>

<p><strong>注意</strong>：正方形 <strong>可能会 </strong>重叠。重叠区域应该被 <strong>多次计数 </strong>。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong> <span class="example-io">squares = [[0,0,1],[2,2,1]]</span></p>

<p><strong>输出：</strong> <span class="example-io">1.00000</span></p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://pic.leetcode.cn/1739609465-UaFzhk-4062example1drawio.png" style="width: 378px; height: 352px;" /></p>

<p>任何在 <code>y = 1</code> 和 <code>y = 2</code> 之间的水平线都会有 1 平方单位的面积在其上方，1 平方单位的面积在其下方。最小的 y 坐标是 1。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong> <span class="example-io">squares = [[0,0,2],[1,1,1]]</span></p>

<p><strong>输出：</strong> <span class="example-io">1.16667</span></p>

<p><strong>解释：</strong></p>

<p><img alt="" src="https://pic.leetcode.cn/1739609527-TWqefZ-4062example2drawio.png" style="width: 378px; height: 352px;" /></p>

<p>面积如下：</p>

<ul>
<li>线下的面积：<code>7/6 * 2 (红色) + 1/6 (蓝色) = 15/6 = 2.5</code>。</li>
<li>线上的面积：<code>5/6 * 2 (红色) + 5/6 (蓝色) = 15/6 = 2.5</code>。</li>
</ul>

<p>由于线以上和线以下的面积相等，输出为 <code>7/6 = 1.16667</code>。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= squares.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>squares[i] = [x<sub>i</sub>, y<sub>i</sub>, l<sub>i</sub>]</code></li>
<li><code>squares[i].length == 3</code></li>
<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= l<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
<li>所有正方形的总面积不超过 <code>10<sup>12</sup></code>。</li>
</ul>




## 分析

- 扫描线累加面积，假如累加了 y1 到 y2 的面积后 t>=总面积 s/2，说明答案在 y1 和 y2 之间
- 设 y1 到 y2 间的单位增量为 w，所求的 y=y2-(t-s/2)/w

## 解答


```python []
class Solution:
    def separateSquares(self, squares: List[List[int]]) -> float:
        d = defaultdict(int)
        s = 0
        for _,y,l in squares:
            d[y] += l
            d[y+l] -= l
            s += l*l
        t = 0
        l = 0
        for y1,y2 in pairwise(sorted(d)):
            l += d[y1]
            t += l*(y2-y1)
            if t*2>=s:
                return y2-(t*2-s)/l/2
```
257 ms
