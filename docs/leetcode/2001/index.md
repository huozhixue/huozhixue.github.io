# 2001：可互换矩形的组数（1435 分）


> <u>**[力扣第 258 场周赛第 2 题](https://leetcode.cn/problems/number-of-pairs-of-interchangeable-rectangles/)**</u>

## 题目

<p>用一个下标从 <strong>0</strong> 开始的二维整数数组 <code>rectangles</code> 来表示 <code>n</code> 个矩形，其中 <code>rectangles[i] = [width<sub>i</sub>, height<sub>i</sub>]</code> 表示第 <code>i</code> 个矩形的宽度和高度。</p>

<p>如果两个矩形 <code>i</code> 和 <code>j</code>（<code>i &lt; j</code>）的宽高比相同，则认为这两个矩形 <strong>可互换</strong> 。更规范的说法是，两个矩形满足 <code>width<sub>i</sub>/height<sub>i</sub> == width<sub>j</sub>/height<sub>j</sub></code>（使用实数除法而非整数除法），则认为这两个矩形 <strong>可互换</strong> 。</p>

<p>计算并返回 <code>rectangles</code> 中有多少对 <strong>可互换 </strong>矩形。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>rectangles = [[4,8],[3,6],[10,20],[15,30]]
<strong>输出：</strong>6
<strong>解释：</strong>下面按下标（从 0 开始）列出可互换矩形的配对情况：
- 矩形 0 和矩形 1 ：4/8 == 3/6
- 矩形 0 和矩形 2 ：4/8 == 10/20
- 矩形 0 和矩形 3 ：4/8 == 15/30
- 矩形 1 和矩形 2 ：3/6 == 10/20
- 矩形 1 和矩形 3 ：3/6 == 15/30
- 矩形 2 和矩形 3 ：10/20 == 15/30
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>rectangles = [[4,5],[7,8]]
<strong>输出：</strong>0
<strong>解释：</strong>不存在成对的可互换矩形。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == rectangles.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>rectangles[i].length == 2</code></li>
<li><code>1 &lt;= width<sub>i</sub>, height<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [1512：好数对的数目（1160 分）](/leetcode/1512)
- [1814：统计一个数组中好对子的数目（1737 分）](/leetcode/1814)
- [2197：替换数组中的非互质数（2057 分）](/leetcode/2197)


## 分析

统计每个宽高比对应的矩形个数 x，其中任意两个矩形可互换，即有 x*(x-1)//2 对。

> 为了避免精度问题，可以用最简分数的形式来代表宽高比。可以用除以最大公约数的方法，
>也可以直接调用 fractions.Fraction

## 解答

```python
def interchangeableRectangles(self, rectangles: List[List[int]]) -> int:
    ct = Counter()
    for w, h in rectangles:
        g = gcd(w, h)
        ct[(w//g, h//g)]+=1
    return sum(v*(v-1)//2 for v in ct.values())
```
460 ms

