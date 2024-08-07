# 1465：切割后面积最大的蛋糕（1444 分）


> <u>**[力扣第 191 场周赛第 2 题](https://leetcode.cn/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/)**</u>

## 题目

<p>矩形蛋糕的高度为 <code>h</code> 且宽度为 <code>w</code>，给你两个整数数组 <code>horizontalCuts</code> 和 <code>verticalCuts</code>，其中：</p>

<ul>
<li> <code>horizontalCuts[i]</code> 是从矩形蛋糕顶部到第  <code>i</code> 个水平切口的距离</li>
<li><code>verticalCuts[j]</code> 是从矩形蛋糕的左侧到第 <code>j</code> 个竖直切口的距离</li>
</ul>

<p>请你按数组 <em><code>horizontalCuts</code> </em>和<em> <code>verticalCuts</code> </em>中提供的水平和竖直位置切割后，请你找出 <strong>面积最大</strong> 的那份蛋糕，并返回其 <strong>面积</strong> 。由于答案可能是一个很大的数字，因此需要将结果 <strong>对</strong> <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 后返回。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/30/leetcode_max_area_2.png" /></p>

<pre>
<strong>输入：</strong>h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
<strong>输出：</strong>4
<strong>解释：</strong>上图所示的矩阵蛋糕中，红色线表示水平和竖直方向上的切口。切割蛋糕后，绿色的那份蛋糕面积最大。
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/30/leetcode_max_area_3.png" /></strong></p>

<pre>
<strong>输入：</strong>h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
<strong>输出：</strong>6
<strong>解释：</strong>上图所示的矩阵蛋糕中，红色线表示水平和竖直方向上的切口。切割蛋糕后，绿色和黄色的两份蛋糕面积最大。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
<strong>输出：</strong>9
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= h, w &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= horizontalCuts.length &lt;= min(h - 1, 10<sup>5</sup>)</code></li>
<li><code>1 &lt;= verticalCuts.length &lt;= min(w - 1, 10<sup>5</sup>)</code></li>
<li><code>1 &lt;= horizontalCuts[i] &lt; h</code></li>
<li><code>1 &lt;= verticalCuts[i] &lt; w</code></li>
<li>题目数据保证 <code>horizontalCuts</code> 中的所有元素各不相同</li>
<li>题目数据保证 <code>verticalCuts</code> 中的所有元素各不相同</li>
</ul>




## 分析

分别找水平和竖直上的最长区间即可。


## 解答


```python
def maxArea(self, h: int, w: int, horizontalCuts: List[int], verticalCuts: List[int]) -> int:
	def cal(A):
		return max(b-a for a,b in pairwise(sorted(A)))
	
	return cal([0]+horizontalCuts+[h])*cal([0]+verticalCuts+[w])%(10**9+7)
```
88 ms
