# 1954：收集足够苹果的最小花园周长（★）


> <u>**[力扣第 252 场周赛第 3 题](https://leetcode.cn/problems/minimum-garden-perimeter-to-collect-enough-apples/)**</u>

## 题目

<p>给你一个用无限二维网格表示的花园，<strong>每一个</strong> 整数坐标处都有一棵苹果树。整数坐标 <code>(i, j)</code> 处的苹果树有 <code>|i| + |j|</code> 个苹果。</p>

<p>你将会买下正中心坐标是 <code>(0, 0)</code> 的一块 <strong>正方形土地</strong> ，且每条边都与两条坐标轴之一平行。</p>

<p>给你一个整数 <code>neededApples</code> ，请你返回土地的 <strong>最小周长</strong> ，使得 <strong>至少</strong> 有<strong> </strong><code>neededApples</code> 个苹果在土地 <strong>里面或者边缘上</strong>。</p>

<p><code>|x|</code> 的值定义为：</p>

<ul>
<li>如果 <code>x &gt;= 0</code> ，那么值为 <code>x</code></li>
<li>如果 <code>x &lt; 0</code> ，那么值为 <code>-x</code></li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://pic.leetcode-cn.com/1627790803-qcBKFw-image.png" style="width: 442px; height: 449px;" />
<pre>
<b>输入：</b>neededApples = 1
<b>输出：</b>8
<b>解释：</b>边长长度为 1 的正方形不包含任何苹果。
但是边长为 2 的正方形包含 12 个苹果（如上图所示）。
周长为 2 * 4 = 8 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>neededApples = 13
<b>输出：</b>16
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>neededApples = 1000000000
<b>输出：</b>5040
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= neededApples &lt;= 10<sup>15</sup></code></li>
</ul>


## 分析

假设右上角坐标为 (n,n)，可以分别计算横纵坐标之和：
- 每一行的横坐标都是从 -n 到 n，和为 n(n+1)
- 共 2n+1 行，故所有横坐标之和为 n(n+1)(2n+1)
- 纵坐标同理

然后求最小的 n 使得 $2n(n+1)(2n+1)<=neededApples$，即是典型的二分查找。

最后 8n 即是最小周长。

## 解答


```python
def minimumPerimeter(self, neededApples: int) -> int:
	self.__class__.__getitem__ = lambda self,x:2*x*(x+1)*(2*x+1)>=neededApples
	return 8*bisect_left(self, True, 0, neededApples)
```
52 ms
