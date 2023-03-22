# 0059：螺旋矩阵 II（★）


> <u>**[力扣第 59 题](https://leetcode.cn/problems/spiral-matrix-ii/)**</u>

## 题目

<p>给你一个正整数 <code>n</code> ，生成一个包含 <code>1</code> 到 <code>n<sup>2</sup></code> 所有元素，且元素按顺时针顺序螺旋排列的 <code>n x n</code> 正方形矩阵 <code>matrix</code> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/spiraln.jpg" style="width: 242px; height: 242px;" />
<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>[[1,2,3],[8,9,4],[7,6,5]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>[[1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 20</code></li>
</ul>


## 分析 

与 {{< lc "0054" >}} 类似，模拟过程：
- 初始位置 <x=0,y=0>，初始方向 <dx=0,dy=1> 
- 到达边界位置则改变方向为 <dy,-dx>
- 为了方便，初始 matrix 的值都为 0 ，当 matrix[(x+dx)%m][(y+dy)%n]!=0 即代表到达边界

## 解答

```python
def generateMatrix(self, n: int) -> List[List[int]]:
    res = [[0]*n for _ in range(n)]
    x, y, dx, dy = 0, 0, 0, 1
    for i in range(n*n):
        res[x][y] = i+1
        if res[(x+dx)%n][(y+dy)%n]:
            dx, dy = dy, -dx
        x, y = x+dx, y+dy
    return res
```
28 ms

