# 0469：凸多边形（★）


> <u>**[力扣第 469 题](https://leetcode.cn/problems/convex-polygon/)**</u>

## 题目

<p>给定 <strong>X-Y</strong> 平面上的一组点 <code>points</code> ，其中 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 。这些点按顺序连成一个多边形。</p>

<p>如果该多边形为 <strong>凸</strong> 多边形<a href="https://baike.baidu.com/item/凸多边形/">（凸多边形的定义）</a>则返回 <code>true</code> ，否则返回 <code>false</code> 。</p>

<p>你可以假设由给定点构成的多边形总是一个 简单的多边形<a href="https://baike.baidu.com/item/%E7%AE%80%E5%8D%95%E5%A4%9A%E8%BE%B9%E5%BD%A2">（简单多边形的定义）</a>。换句话说，我们要保证每个顶点处恰好是两条边的汇合点，并且这些边 <strong>互不相交 </strong>。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/09/covpoly1-plane.jpg" style="height: 294px; width: 300px;" /></p>

<pre>
<strong>输入:</strong> points = [[0,0],[0,5],[5,5],[5,0]]
<strong>输出:</strong> true</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/09/covpoly2-plane.jpg" style="height: 303px; width: 300px;" /></p>

<pre>
<strong>输入:</strong> points = [[0,0],[0,10],[10,10],[10,0],[5,5]]
<strong>输出:</strong> false</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>3 &lt;= points.length &lt;= 10<sup>4</sup></code></li>
<li><code>points[i].length == 2</code></li>
<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
<li>所有点都 <strong>不同</strong></li>
</ul>




## 分析

## 解答


```python
def isConvex(self, points: List[List[int]]) -> bool:
	def cal(a, b, c):
		return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])

	P, n = points, len(points)
	A = [cal(P[i], P[(i+1)%n], P[(i+2)%n]) for i in range(n)]
	return all(val<=0 for val in A) or all(val>=0 for val in A)
```

48 ms
