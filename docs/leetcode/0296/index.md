# 0296：最佳的碰头地点（★★）


> <u>**[力扣第 296 题](https://leetcode.cn/problems/best-meeting-point/)**</u>

## 题目

<p>给你一个 <code>m x n</code>  的二进制网格 <code>grid</code> ，其中 <code>1</code> 表示某个朋友的家所处的位置。返回 <em>最小的 <strong>总行走距离</strong></em> 。</p>

<p><strong>总行走距离</strong> 是朋友们家到碰头地点的距离之和。</p>

<p>我们将使用 <a href="https://baike.baidu.com/item/%E6%9B%BC%E5%93%88%E9%A1%BF%E8%B7%9D%E7%A6%BB" target="_blank">曼哈顿距离</a> 来计算，其中 <code>distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/14/meetingpoint-grid.jpg" /></p>

<pre>
<strong>输入:</strong> grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]]
<strong>输出: </strong>6 <strong>
解释: </strong>给定的三个人分别住在<code>(0,0)，</code><code>(0,4) </code>和 <code>(2,2)</code>:
<code>(0,2)</code> 是一个最佳的碰面点，其总行走距离为 2 + 2 + 2 = 6，最小，因此返回 6。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> grid = [[1,1]]
<strong>输出:</strong> 1</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>grid[i][j] ==</code> <code>0</code> or <code>1</code>.</li>
<li><code>grid</code> 中 <strong>至少</strong> 有两个朋友</li>
</ul>


## 分析

用 A 保存所有位置的 x 坐标，A 的中位数即是最佳位置的 x 坐标。y 坐标同理。

## 解答

```python
def minTotalDistance(self, grid: List[List[int]]) -> int:
    def cal(grid):
        A = [i for i, row in enumerate(grid) for val in row if val==1]
        half = len(A) // 2
        return sum(A[-half:])-sum(A[:half])
    return cal(grid)+cal(zip(*grid))
```
40 ms
