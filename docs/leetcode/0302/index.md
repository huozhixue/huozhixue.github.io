# 0302：包含全部黑色像素的最小矩形（★★）


## 题目

图片在计算机处理中往往是使用二维矩阵来表示的。

给你一个大小为 m x n 的二进制矩阵 image 表示一张黑白图片，0 代表白色像素，1 代表黑色像素。

黑色像素相互连接，也就是说，图片中只会有一片连在一块儿的黑色像素。像素点是水平或竖直方向连接的。

给你两个整数 x 和 y 表示某一个黑色像素的位置，请你找出包含全部黑色像素的最小矩形（与坐标轴对齐），
并返回该矩形的面积。

你必须设计并实现一个时间复杂度低于 O(mn) 的算法来解决此问题。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/14/pixel-grid.jpg)

	输入：image = [["0","0","1","0"],["0","1","1","0"],["0","1","0","0"]], x = 0, y = 2
	输出：6

示例 2：

	输入：image = [["1"]], x = 0, y = 0
	输出：1
	 

提示：
- m == image.length
- n == image[i].length
- 1 <= m, n <= 100
- image[i][j] 为 '0' 或 '1'
- 1 <= x < m
- 1 <= y < n
- image[x][y] == '1'
- image 中的黑色像素仅形成一个 组件


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

