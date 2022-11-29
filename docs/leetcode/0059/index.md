# 0059：螺旋矩阵 II（★★）


## 题目

给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/13/spiraln.jpg)

	输入：n = 3
	输出：[[1,2,3],[8,9,4],[7,6,5]]
	
示例 2：

	输入：n = 1
	输出：[[1]]

提示： 1 <= n <= 20	 

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

