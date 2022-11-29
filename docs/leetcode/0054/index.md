# 0054：螺旋矩阵（★★）


## 题目

给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg)


	输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
	输出：[1,2,3,6,9,8,7,4,5]
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg)


	输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
	输出：[1,2,3,4,8,12,11,10,9,5,6,7]
	 
提示：
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 10
- -100 <= matrix[i][j] <= 100


## 分析 

考虑模拟过程:
- 初始位置 <x=0,y=0>，初始方向 <dx=0,dy=1> 
- 到达边界位置则改变方向为 <dy,-dx>
- 为了方便，可以将走过的地方置 0 ，当 matrix[(x+dx)%m][(y+dy)%n]==0 即代表到达边界

## 解答

```python
def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
    res, m, n = [], len(matrix), len(matrix[0])
    x, y, dx, dy = 0, 0, 0, 1
    for _ in range(m*n):
        res.append(matrix[x][y])
        matrix[x][y] = 0
        if matrix[(x+dx)%m][(y+dy)%n] == 0:
            dx, dy = dy, -dx
        x, y = x+dx, y+dy
    return res
```
28 ms

