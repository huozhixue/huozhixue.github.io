# 0302：包含全部黑色像素的最小矩形（★★）


> <u>**[力扣第 302 题](https://leetcode.cn/problems/smallest-rectangle-enclosing-black-pixels/)**</u>

## 题目

<p>图片在计算机处理中往往是使用二维矩阵来表示的。</p>

<p>给你一个大小为 <code>m x n</code> 的二进制矩阵 <code>image</code> 表示一张黑白图片，<code>0</code> 代表白色像素，<code>1</code> 代表黑色像素。</p>

<p>黑色像素相互连接，也就是说，图片中只会有一片连在一块儿的黑色像素。像素点是水平或竖直方向连接的。</p>

<p>给你两个整数 <code>x</code> 和 <code>y</code> 表示某一个黑色像素的位置，请你找出包含全部黑色像素的最小矩形（与坐标轴对齐），并返回该矩形的面积。</p>

<p>你必须设计并实现一个时间复杂度低于 <code>O(mn)</code> 的算法来解决此问题。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/pixel-grid.jpg" style="width: 333px; height: 253px;" />
<pre>
<strong>输入：</strong>image = [["0","0","1","0"],["0","1","1","0"],["0","1","0","0"]], x = 0, y = 2
<strong>输出：</strong>6
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>image = [["1"]], x = 0, y = 0
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == image.length</code></li>
<li><code>n == image[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 100</code></li>
<li><code>image[i][j]</code> 为 <code>'0'</code> 或 <code>'1'</code></li>
<li><code>1 &lt;= x &lt; m</code></li>
<li><code>1 &lt;= y &lt; n</code></li>
<li><code>image[x][y] == '1'</code></li>
<li><code>image</code> 中的黑色像素仅形成一个 <strong>组件</strong></li>
</ul>


## 分析

要求时间复杂度低于 O(mn)，也就是不能遍历完矩阵。于是考虑二分查找：
- 假设最左边的黑色像素的横坐标是 y1，那么
	- 对任意 0<=c<y1，第 c 列没有黑色像素
	- 对任意 y1<=c<=y，第 c 列有黑色像素
	- 所以可以二分查找出 y1
- 所求矩形的左边界即是 y1
- 同理可找出右/上/下边界，即得到面积


## 解答

```python
def minArea(self, image: List[List[str]], x: int, y: int) -> int:
    m, n, A = len(image), len(image[0]), image
    x1 = bisect_left(range(x), True, key=lambda i: '1' in A[i])
    x2 = bisect_left(range(m), True, x, m, key=lambda i: '1' not in A[i])
    y1 = bisect_left(range(y), True, key=lambda j: any(A[i][j]=='1' for i in range(m)))
    y2 = bisect_left(range(n), True, y, n, key=lambda j: all(A[i][j]!='1' for i in range(m)))
    return (x2-x1)*(y2-y1)
```
48 ms

