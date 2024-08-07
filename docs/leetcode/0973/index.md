# 0973：最接近原点的 K 个点（1213 分）


> <u>**[力扣第 119 场周赛第 1 题](https://leetcode.cn/problems/k-closest-points-to-origin/)**</u>

## 题目

<p>给定一个数组 <code>points</code> ，其中 <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 表示 <strong>X-Y</strong> 平面上的一个点，并且是一个整数 <code>k</code> ，返回离原点 <code>(0,0)</code> 最近的 <code>k</code> 个点。</p>

<p>这里，平面上两点之间的距离是 <strong>欧几里德距离</strong>（ <code>√(x<sub>1</sub> - x<sub>2</sub>)<sup>2</sup> + (y<sub>1</sub> - y<sub>2</sub>)<sup>2</sup></code> ）。</p>

<p>你可以按 <strong>任何顺序</strong> 返回答案。除了点坐标的顺序之外，答案 <strong>确保</strong> 是 <strong>唯一</strong> 的。</p>



<p><strong class="example">示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/03/closestplane1.jpg" style="height: 400px; width: 400px;" /></p>

<pre>
<strong>输入：</strong>points = [[1,3],[-2,2]], k = 1
<strong>输出：</strong>[[-2,2]]
<strong>解释： </strong>
(1, 3) 和原点之间的距离为 sqrt(10)，
(-2, 2) 和原点之间的距离为 sqrt(8)，
由于 sqrt(8) &lt; sqrt(10)，(-2, 2) 离原点更近。
我们只需要距离原点最近的 K = 1 个点，所以答案就是 [[-2,2]]。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>points = [[3,3],[5,-1],[-2,4]], k = 2
<strong>输出：</strong>[[3,3],[-2,4]]
（答案 [[-2,4],[3,3]] 也会被接受。）
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= points.length &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>4</sup> &lt; x<sub>i</sub>, y<sub>i</sub> &lt; 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0215：数组中的第K个最大元素](/leetcode/0215)
- [0347：前 K 个高频元素](/leetcode/0347)
- [0692：前K个高频单词](/leetcode/0692)
- [1779：找到最近的有相同 X 或 Y 坐标的点（1259 分）](/leetcode/1779)
- [3111：覆盖所有点的最少矩形数目（1401 分）](/leetcode/3111)


## 分析

按距离排序或者用 heapq.nsmallest 即可。


## 解答

```python
def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
	return nsmallest(k, points, key=lambda x: x[0]*x[0]+x[1]*x[1])
```

172 ms
